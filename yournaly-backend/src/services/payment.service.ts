import type { CreateCheckoutSessionRequest, CreateCheckoutSessionResponse } from '@/lib/interfaces/payment.interface';

import { getStripe, STRIPE_CONFIG } from '@/configs/stripe.config';
import { prisma } from '@/database';

export const createCheckoutSessionService = async (
  data: CreateCheckoutSessionRequest
): Promise<CreateCheckoutSessionResponse> => {
  const { packageId, userId } = data;
  const stripe = getStripe();

  const inkPackage = await prisma.inksPackages.findUnique({
    where: { id: packageId },
  });

  if (!inkPackage) {
    throw new Error('Ink package not found');
  }

  if (!inkPackage.isActive) {
    throw new Error('Ink package is not available');
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: inkPackage.currency.toLowerCase(),
          product_data: {
            name: inkPackage.title,
            description: inkPackage.description,
          },
          unit_amount: Math.round(Number(inkPackage.price) * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: STRIPE_CONFIG.successUrl,
    cancel_url: STRIPE_CONFIG.cancelUrl,
    metadata: {
      packageId,
      userId,
    },
  });

  if (!session.url) {
    throw new Error('Stripe did not return a checkout URL');
  }

  return {
    sessionId: session.id,
    url: session.url,
  };
};

export const handlePaymentSuccessService = async (sessionId: string): Promise<void> => {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['payment_intent'],
  });

  if (!session) {
    throw new Error('Session not found');
  }

  if (session.status !== 'complete') {
    throw new Error('Payment not completed');
  }

  const { packageId, userId } = session.metadata || {};

  if (!packageId || !userId) {
    throw new Error('Missing package or user information');
  }

  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error(`User not found: ${userId}`);
  }

  const inkPackage = await prisma.inksPackages.findUnique({
    where: { id: packageId },
  });

  if (!inkPackage) {
    throw new Error(`Ink package not found: ${packageId}`);
  }

  await prisma.$transaction(async tx => {
    await tx.userWallets.upsert({
      where: { userId },
      update: {
        currentInks: { increment: inkPackage.inksToAdd },
        totalAcquiredInks: { increment: inkPackage.inksToAdd },
      },
      create: {
        userId,
        currentInks: inkPackage.inksToAdd,
        totalAcquiredInks: inkPackage.inksToAdd,
        totalSpentInks: 0,
      },
    });

    const paymentIntentId =
      typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id || 'unknown';

    await tx.userTransactions.create({
      data: {
        userId,
        stripePaymentId: paymentIntentId,
        amount: inkPackage.price,
        currency: inkPackage.currency,
        status: 'completed',
      },
    });
  });
};

export const getPaymentSessionService = async (sessionId: string) => {
  return getStripe().checkout.sessions.retrieve(sessionId);
};
