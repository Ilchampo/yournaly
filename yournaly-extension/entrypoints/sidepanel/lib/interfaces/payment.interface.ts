import type { Response } from '@interfaces/response.interface';
import type { PaymentStatus } from '@lib/types';

export interface CreateCheckoutSessionParams {
	packageId: string;
}

export interface CheckoutSessionData {
	sessionId: string;
	url: string;
}

export interface PaymentStatusData {
	sessionId: string;
	status: 'open' | 'complete' | 'expired';
	paymentStatus: 'paid' | 'unpaid' | 'no_payment_required';
	amountTotal: number;
	currency: string;
}

export interface PaymentSessionDetailsData {
	id: string;
	object: 'checkout.session';
	amount_total: number;
	currency: string;
	status: 'open' | 'complete' | 'expired';
	payment_status: 'paid' | 'unpaid' | 'no_payment_required';
	metadata: {
		packageId: string;
		userId: string;
	};
}

export interface CreateCheckoutSessionServiceResponse extends Response {
	data: CheckoutSessionData;
}

export interface PaymentStatusServiceResponse extends Response {
	data: PaymentStatusData;
}

export interface PaymentSessionDetailsServiceResponse extends Response {
	data: PaymentSessionDetailsData;
}

export interface PaymentFlowState {
	status: PaymentStatus;
	sessionId?: string;
	checkoutUrl?: string;
	error?: string;
}
