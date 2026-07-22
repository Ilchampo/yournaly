import { authenticateJWT } from '@/middlewares/auth.middleware';
import { rawBodyMiddleware } from '@/middlewares/rawBody.middleware';
import { Router, RequestHandler } from 'express';
import {
  createCheckoutSessionController,
  handleWebhookController,
  getPaymentSessionController,
  checkPaymentStatusController,
} from '@/controllers/payment.controller';

const router = Router();

// @desc: Create Stripe checkout session
// @route: POST /payment/create-checkout-session
// @access: Private
router.post('/create-checkout-session', authenticateJWT as RequestHandler, createCheckoutSessionController);

// @desc: Handle Stripe webhook events
// @route: POST /payment/webhook
// @access: Public (no auth required for webhooks)
router.post('/webhook', rawBodyMiddleware, handleWebhookController);

// @desc: Get payment session details
// @route: GET /payment/session/:sessionId
// @access: Private
router.get('/session/:sessionId', authenticateJWT as RequestHandler, getPaymentSessionController);

// @desc: Check payment status for Chrome Extension
// @route: GET /payment/status/:sessionId
// @access: Private
router.get('/status/:sessionId', authenticateJWT as RequestHandler, checkPaymentStatusController);

export default router;
