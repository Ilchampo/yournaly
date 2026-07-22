import type {
	CreateCheckoutSessionParams,
	CreateCheckoutSessionServiceResponse,
	PaymentSessionDetailsServiceResponse,
	PaymentStatusServiceResponse,
} from '@interfaces/payment.interface';

import { config } from '@lib/config';
import { ErrorService } from '@services/error.service';
import { useUserStore } from '@stores/user.store';

export class PaymentAPIService {
	private static readonly BASE_URL = config.api.baseUrl;

	static async createCheckoutSession(
		params: CreateCheckoutSessionParams,
	): Promise<CreateCheckoutSessionServiceResponse> {
		const { user, token } = useUserStore.getState();

		if (!user) {
			const error = new Error('User not found');
			ErrorService.reportApiError(error, { service: 'PaymentAPI', method: 'createCheckoutSession' });
			throw error;
		}

		if (!token) {
			const error = new Error('Token not found');
			ErrorService.reportApiError(error, { service: 'PaymentAPI', method: 'createCheckoutSession' });
			throw error;
		}

		const requestBody = {
			packageId: params.packageId,
		};

		try {
			const response = await fetch(`${this.BASE_URL}/payment/create-checkout-session`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				const error = new Error(errorData.message ?? 'Failed to create checkout session');

				ErrorService.reportApiError(error, {
					service: 'PaymentAPI',
					method: 'createCheckoutSession',
					status: response.status,
					statusText: response.statusText,
					requestParams: params,
				});

				throw error;
			}

			const apiResponse = await response.json();

			if (apiResponse.data) {
				return apiResponse as CreateCheckoutSessionServiceResponse;
			}

			return apiResponse as CreateCheckoutSessionServiceResponse;
		} catch (error) {
			if (error instanceof Error && error.message.includes('Failed to create checkout session')) {
				throw error;
			}

			const networkError = new Error('Network error occurred while creating checkout session');

			ErrorService.reportApiError(networkError, {
				service: 'PaymentAPI',
				method: 'createCheckoutSession',
				originalError: error instanceof Error ? error.message : 'Unknown error',
				requestParams: params,
			});

			throw networkError;
		}
	}

	static async checkPaymentStatus(sessionId: string): Promise<PaymentStatusServiceResponse> {
		const { user, token } = useUserStore.getState();

		if (!user) {
			const error = new Error('User not found');
			ErrorService.reportApiError(error, { service: 'PaymentAPI', method: 'checkPaymentStatus' });
			throw error;
		}

		if (!token) {
			const error = new Error('Token not found');
			ErrorService.reportApiError(error, { service: 'PaymentAPI', method: 'checkPaymentStatus' });
			throw error;
		}

		try {
			const response = await fetch(`${this.BASE_URL}/payment/status/${sessionId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				const error = new Error(errorData.message ?? 'Failed to check payment status');

				ErrorService.reportApiError(error, {
					service: 'PaymentAPI',
					method: 'checkPaymentStatus',
					status: response.status,
					statusText: response.statusText,
					sessionId,
				});

				throw error;
			}

			const apiResponse = await response.json();

			if (apiResponse.data) {
				return apiResponse as PaymentStatusServiceResponse;
			}

			return apiResponse as PaymentStatusServiceResponse;
		} catch (error) {
			if (error instanceof Error && error.message.includes('Failed to check payment status')) {
				throw error;
			}

			const networkError = new Error('Network error occurred while checking payment status');

			ErrorService.reportApiError(networkError, {
				service: 'PaymentAPI',
				method: 'checkPaymentStatus',
				originalError: error instanceof Error ? error.message : 'Unknown error',
				sessionId,
			});

			throw networkError;
		}
	}

	static async getPaymentSessionDetails(sessionId: string): Promise<PaymentSessionDetailsServiceResponse> {
		const { user, token } = useUserStore.getState();

		if (!user) {
			const error = new Error('User not found');
			ErrorService.reportApiError(error, { service: 'PaymentAPI', method: 'getPaymentSessionDetails' });
			throw error;
		}

		if (!token) {
			const error = new Error('Token not found');
			ErrorService.reportApiError(error, { service: 'PaymentAPI', method: 'getPaymentSessionDetails' });
			throw error;
		}

		try {
			const response = await fetch(`${this.BASE_URL}/payment/session/${sessionId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				const error = new Error(errorData.message ?? 'Failed to get payment session details');

				ErrorService.reportApiError(error, {
					service: 'PaymentAPI',
					method: 'getPaymentSessionDetails',
					status: response.status,
					statusText: response.statusText,
					sessionId,
				});

				throw error;
			}

			const apiResponse = await response.json();

			if (apiResponse.data) {
				return apiResponse as PaymentSessionDetailsServiceResponse;
			}

			return apiResponse as PaymentSessionDetailsServiceResponse;
		} catch (error) {
			if (error instanceof Error && error.message.includes('Failed to get payment session details')) {
				throw error;
			}

			const networkError = new Error('Network error occurred while getting payment session details');

			ErrorService.reportApiError(networkError, {
				service: 'PaymentAPI',
				method: 'getPaymentSessionDetails',
				originalError: error instanceof Error ? error.message : 'Unknown error',
				sessionId,
			});

			throw networkError;
		}
	}
}
