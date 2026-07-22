import type { AuthenticatedRequest, JWTPayload } from '@/lib/interfaces/auth.interface';
import type { Request } from 'express';

import { createSuccessResponse, createBadRequestResponse, createUnauthorizedResponse } from '@/lib/utils/responseUtils';
import { asyncHandler } from '@/middlewares/error.middleware';
import { createCheckoutSessionService, getPaymentSessionService } from '@/services/payment.service';
import { handleStripeWebhook } from '@/lib/handlers/stripeWebhook.handler';

const assertSessionOwner = (session: Awaited<ReturnType<typeof getPaymentSessionService>>, userId: string): boolean => {
  return session.metadata?.['userId'] === userId;
};

export const createCheckoutSessionController = asyncHandler(async (req: AuthenticatedRequest) => {
  const { packageId } = req.body;

  const user = req.user as JWTPayload | undefined;
  const userId = user?.userId;

  if (!userId) {
    return createUnauthorizedResponse('User not authenticated');
  }

  if (!packageId) {
    return createBadRequestResponse('Package ID is required');
  }

  const session = await createCheckoutSessionService({
    packageId,
    userId,
  });

  return createSuccessResponse(session, 'Checkout session created successfully');
});

export const handleWebhookController = asyncHandler(async (req: Request) => {
  try {
    await handleStripeWebhook(req);

    return createSuccessResponse({ received: true }, 'Webhook processed successfully');
  } catch (error) {
    return createBadRequestResponse(
      `Webhook processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
});

export const getPaymentSessionController = asyncHandler(async (req: AuthenticatedRequest) => {
  const { sessionId } = req.params;
  const userId = req.user?.userId;

  if (!userId) {
    return createUnauthorizedResponse('User not authenticated');
  }

  if (!sessionId) {
    return createBadRequestResponse('Session ID is required');
  }

  const session = await getPaymentSessionService(sessionId);

  if (!assertSessionOwner(session, userId)) {
    return createUnauthorizedResponse('Session does not belong to user');
  }

  return createSuccessResponse(session, 'Payment session retrieved successfully');
});

export const checkPaymentStatusController = asyncHandler(async (req: AuthenticatedRequest) => {
  const { sessionId } = req.params;

  const user = req.user as JWTPayload | undefined;
  const userId = user?.userId;

  if (!userId) {
    return createUnauthorizedResponse('User not authenticated');
  }

  if (!sessionId) {
    return createBadRequestResponse('Session ID is required');
  }

  const session = await getPaymentSessionService(sessionId);

  if (!assertSessionOwner(session, userId)) {
    return createUnauthorizedResponse('Session does not belong to user');
  }

  return createSuccessResponse(
    {
      sessionId: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
    },
    'Payment status retrieved successfully'
  );
});
