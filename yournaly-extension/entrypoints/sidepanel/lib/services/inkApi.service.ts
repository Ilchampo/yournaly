import type { GetInkPackagesServiceResponse } from '@interfaces/ink.interface';

import { config } from '@lib/config';
import { ErrorService } from '@services/error.service';
import { useUserStore } from '@stores/user.store';

export class InkAPIService {
	private static readonly BASE_URL = config.api.baseUrl;

	static async getInkPackages() {
		const { user, token } = useUserStore.getState();

		if (!user) {
			const error = new Error('User not found');
			ErrorService.reportApiError(error, { service: 'UserAPI', method: 'updateUserPreferences' });
			throw error;
		}

		if (!token) {
			const error = new Error('Token not found');
			ErrorService.reportApiError(error, { service: 'UserAPI', method: 'updateUserPreferences' });
			throw error;
		}

		try {
			const response = await fetch(`${this.BASE_URL}/inks/packages`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				const error = new Error(errorData.message ?? 'Failed to get ink packages');

				ErrorService.reportApiError(error, { service: 'InkAPI', method: 'getInkPackages' });
				throw error;
			}

			const apiResponse = await response.json();

			if (apiResponse.data) {
				return apiResponse.data as GetInkPackagesServiceResponse;
			}

			return apiResponse as GetInkPackagesServiceResponse;
		} catch (error) {
			if (error instanceof Error && error.message.includes('Failed to get ink packages')) {
				throw error;
			}

			const networkError = new Error('Network error occurred while getting ink packages');

			ErrorService.reportApiError(networkError, { service: 'InkAPI', method: 'getInkPackages' });

			throw networkError;
		}
	}
}
