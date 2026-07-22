import type { UpdateUserPreferencesParams, UserPreferences } from '@interfaces/user.interface';

import { config } from '@lib/config';
import { ErrorService } from '@services/error.service';
import { useOrganizationStore } from '@stores/organization.store';
import { useUserStore } from '@stores/user.store';

export class UserAPIService {
	private static readonly BASE_URL = config.api.baseUrl;

	static async updateUserPreferences(params: UpdateUserPreferencesParams) {
		const { user, token } = useUserStore.getState();
		const { organization } = useOrganizationStore.getState();

		if (!user) {
			const error = new Error('User not found');
			ErrorService.reportApiError(error, { service: 'UserAPI', method: 'updateUserPreferences' });
			throw error;
		}

		if (!organization) {
			const error = new Error('Organization not found');
			ErrorService.reportApiError(error, { service: 'UserAPI', method: 'updateUserPreferences' });
			throw error;
		}

		if (!token) {
			const error = new Error('Token not found');
			ErrorService.reportApiError(error, { service: 'UserAPI', method: 'updateUserPreferences' });
			throw error;
		}

		const requestBody = {
			organizationId: organization.id,
			defaultLanguage: params.defaultLanguage,
			defaultTone: params.defaultTone,
			defaultTarget: params.defaultTarget,
			theme: params.theme,
		};

		try {
			const response = await fetch(`${this.BASE_URL}/users/preferences`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				const error = new Error(errorData.message ?? 'Failed to update user preferences');

				ErrorService.reportApiError(error, { service: 'UserAPI', method: 'updateUserPreferences' });
				throw error;
			}

			const apiResponse = await response.json();

			if (apiResponse.data) {
				return apiResponse.data as UserPreferences;
			}

			return apiResponse as UserPreferences;
		} catch (error) {
			if (error instanceof Error && error.message.includes('Failed to update user preferences')) {
				throw error;
			}

			const networkError = new Error('Network error occurred while updating user preferences');

			ErrorService.reportApiError(networkError, { service: 'UserAPI', method: 'updateUserPreferences' });

			throw networkError;
		}
	}
}
