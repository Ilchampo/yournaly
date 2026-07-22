import Stripe from 'stripe';
import { config } from 'dotenv';

config();

let stripeInstance: Stripe | null = null;

export const getStripe = (): Stripe => {
  if (stripeInstance) {
    return stripeInstance;
  }

  const secretKey = process.env['STRIPE_SECRET_KEY'];

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
  }

  stripeInstance = new Stripe(secretKey, {
    apiVersion: '2025-06-30.basil',
  });

  return stripeInstance;
};

export const STRIPE_CONFIG = {
  publishableKey: process.env['STRIPE_PUBLISHABLE_KEY'],
  webhookSecret: process.env['STRIPE_WEBHOOK_SECRET'],
  successUrl:
    process.env['STRIPE_SUCCESS_URL'] ?? 'http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}',
  cancelUrl: process.env['STRIPE_CANCEL_URL'] ?? 'http://localhost:3000/payment/cancel',
};
