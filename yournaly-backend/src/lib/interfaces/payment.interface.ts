export interface CreateCheckoutSessionRequest {
  packageId: string;
  userId: string;
}

export interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface PaymentSuccessData {
  sessionId: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  packageId: string;
  userId: string;
}

export interface WebhookEvent {
  id: string;
  type: string;
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    object: any;
  };
}

export interface StripeCheckoutSession {
  id: string;
  payment_intent?: string;
  amount_total?: number;
  currency?: string;
  metadata?: {
    packageId?: string;
    userId?: string;
  };
  status: string;
}
