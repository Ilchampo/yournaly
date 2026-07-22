import type { Request } from 'express';

import { getStripe, STRIPE_CONFIG } from '@/configs/stripe.config';
import { handlePaymentSuccessService } from '@/services/payment.service';

export const handleStripeWebhook = async (req: Request): Promise<void> => {
  const sig = req.headers['stripe-signature'];

  if (!sig || !STRIPE_CONFIG.webhookSecret) {
    throw new Error('Missing stripe signature or webhook secret');
  }

  let event;

  try {
    event = getStripe().webhooks.constructEvent(req.body, sig, STRIPE_CONFIG.webhookSecret);
  } catch (err) {
    throw new Error(`Webhook signature verification failed: ${err}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      if (session.status === 'complete') {
        await handlePaymentSuccessService(session.id);
      }
      break;
    }

    case 'payment_intent.succeeded':
    case 'checkout.session.expired':
    case 'payment_intent.payment_failed':
      break;

    default:
      break;
  }
};
