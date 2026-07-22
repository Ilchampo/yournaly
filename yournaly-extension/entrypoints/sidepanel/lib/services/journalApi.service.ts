import type {
	JournalDeleteServiceParams,
	JournalDeleteServiceResponse,
	JournalDetailRequestParams,
	JournalRequestParams,
	JournalReviewServiceResponse,
	JournalSummaryRequestParams,
	JournalSummaryServiceResponse,
	JournalUpdateTitleServiceParams,
	JournalUpdateTitleServiceResponse,
} from '@interfaces/journal.interface';

import { config } from '@lib/config';
import { ErrorService } from '@services/error.service';
import { useOrganizationStore } from '@stores/organization.store';
import { useUserStore } from '@stores/user.store';

export class JournalAPIService {
	private static readonly BASE_URL = config.api.baseUrl;

	static async reviewJournal(params: JournalRequestParams): Promise<JournalReviewServiceResponse> {
		const { user, token } = useUserStore.getState();
		const { organization } = useOrganizationStore.getState();

		if (!user) {
			const error = new Error('User not found');
			ErrorService.reportApiError(error, { service: 'JournalAPI', method: 'reviewJournal' });
			throw error;
		}

		if (!organization) {
			const error = new Error('Organization not found');
			ErrorService.reportApiError(error, { service: 'JournalAPI', method: 'reviewJournal' });
			throw error;
		}

		if (!token) {
			const error = new Error('Token not found');
			ErrorService.reportApiError(error, { service: 'JournalAPI', method: 'reviewJournal' });
			throw error;
		}

		const requestBody = {
			userId: user.id,
			organizationId: organization.id,
			originalText: params.originalText,
			params: {
				tone: params.tone,
				improveReadability: params.improveReadability,
				targetLanguage: params.targetLanguage,
				reviewLanguage: user.preferences.defaultLanguage,
				estimatedInks: params.estimatedInks,
				advancedOptions: params.advancedOptions
					? {
							textLength: params.advancedOptions.textLength || 'none',
							minCharacters: params.advancedOptions.minCharacters,
							maxCharacters: params.advancedOptions.maxCharacters,
						}
					: null,
			},
		};

		try {
			const response = await fetch(`${this.BASE_URL}/journals/review`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				const error = new Error(errorData.message ?? 'Failed to request review for journal');

				ErrorService.reportApiError(error, {
					service: 'JournalAPI',
					method: 'reviewJournal',
					status: response.status,
					statusText: response.statusText,
					requestParams: params,
				});

				throw error;
			}

			return (await response.json()) as JournalReviewServiceResponse;
		} catch (error) {
			if (error instanceof Error && error.message.includes('Failed to request review')) {
				throw error;
			}

			const networkError = new Error('Network error occurred while reviewing journal');

			ErrorService.reportApiError(networkError, {
				service: 'JournalAPI',
				method: 'reviewJournal',
				originalError: error instanceof Error ? error.message : 'Unknown error',
				requestParams: params,
			});

			throw networkError;
		}
	}

	static async getJournalSummary(params: JournalSummaryRequestParams): Promise<JournalSummaryServiceResponse> {
		const { user, token } = useUserStore.getState();
		const { organization } = useOrganizationStore.getState();

		if (!user) {
			const error = new Error('User not found');
			ErrorService.reportApiError(error, { service: 'JournalAPI', method: 'getJournalSummary' });
			throw error;
		}

		if (!organization) {
			const error = new Error('Organization not found');
			ErrorService.reportApiError(error, { service: 'JournalAPI', method: 'getJournalSummary' });
			throw error;
		}

		if (!token) {
			const error = new Error('Token not found');
			ErrorService.reportApiError(error, { service: 'JournalAPI', method: 'getJournalSummary' });
			throw error;
		}

		const queryParams = new URLSearchParams({
			organizationId: params.organizationId ?? organization.id,
			page: (params.page ?? 1).toString(),
			limit: (params.limit ?? 10).toString(),
			sort: params.sort ?? 'createdAt',
			order: params.order ?? 'desc',
		});

		try {
			const response = await fetch(`${this.BASE_URL}/journals/summary?${queryParams.toString()}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				const error = new Error(errorData.message ?? 'Failed to request summary for journals');

				ErrorService.reportApiError(error, {
					service: 'JournalAPI',
					method: 'getJournalSummary',
					status: response.status,
					statusText: response.statusText,
					requestParams: params,
				});

				throw error;
			}

			return (await response.json()) as JournalSummaryServiceResponse;
		} catch (error) {
			if (error instanceof Error && error.message.includes('Failed to request summary')) {
				throw error;
			}

			const networkError = new Error('Network error occurred while requesting summary for journals');

			ErrorService.reportApiError(networkError, {
				service: 'JournalAPI',
				method: 'getJournalSummary',
				originalError: error instanceof Error ? error.message : 'Unknown error',
				requestParams: params,
			});

			throw networkError;
		}
	}

	static async getJournalReview(params: JournalDetailRequestParams): Promise<JournalReviewServiceResponse> {
		const { user, token } = useUserStore.getState();
		const { organization } = useOrganizationStore.getState();

		if (!user) {
			const error = new Error('User not found');
			ErrorService.reportApiError(error, { service: 'JournalAPI', method: 'getJournalDetail' });
			throw error;
		}

		if (!organization) {
			const error = new Error('Organization not found');
			ErrorService.reportApiError(error, { service: 'JournalAPI', method: 'getJournalDetail' });
			throw error;
		}

		if (!token) {
			const error = new Error('Token not found');
			ErrorService.reportApiError(error, { service: 'JournalAPI', method: 'getJournalDetail' });
			throw error;
		}

		const queryParams = new URLSearchParams({
			organizationId: organization.id,
		});

		try {
			const response = await fetch(`${this.BASE_URL}/journals/${params.id}?${queryParams.toString()}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				const error = new Error(errorData.message ?? 'Failed to fetch journal details');

				ErrorService.reportApiError(error, {
					service: 'JournalAPI',
					method: 'getJournalDetail',
					status: response.status,
					statusText: response.statusText,
					requestParams: params,
				});

				throw error;
			}

			return (await response.json()) as JournalReviewServiceResponse;
		} catch (error) {
			if (error instanceof Error && error.message.includes('Failed to fetch journal')) {
				throw error;
			}

			const networkError = new Error('Network error occurred while fetching journal details');

			ErrorService.reportApiError(networkError, {
				service: 'JournalAPI',
				method: 'getJournalDetail',
				originalError: error instanceof Error ? error.message : 'Unknown error',
				requestParams: params,
			});

			throw networkError;
		}
	}

	static async updateJournalTitle(
		params: JournalUpdateTitleServiceParams,
	): Promise<JournalUpdateTitleServiceResponse> {
		const { user, token } = useUserStore.getState();
		const { organization } = useOrganizationStore.getState();

		if (!user) {
			const error = new Error('User not found');
			ErrorService.reportApiError(error, { service: 'JournalAPI', method: 'updateJournalTitle' });
			throw error;
		}

		if (!organization) {
			const error = new Error('Organization not found');
			ErrorService.reportApiError(error, { service: 'JournalAPI', method: 'updateJournalTitle' });
			throw error;
		}

		if (!token) {
			const error = new Error('Token not found');
			ErrorService.reportApiError(error, { service: 'JournalAPI', method: 'updateJournalTitle' });
			throw error;
		}

		const requestBody = {
			organizationId: organization.id,
			title: params.title,
		};

		try {
			const response = await fetch(`${this.BASE_URL}/journals/${params.id}/title`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(requestBody),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				const error = new Error(errorData.message ?? 'Failed to update journal title');

				ErrorService.reportApiError(error, {
					service: 'JournalAPI',
					method: 'updateJournalTitle',
					status: response.status,
					statusText: response.statusText,
					requestParams: params,
				});

				throw error;
			}

			return (await response.json()) as JournalUpdateTitleServiceResponse;
		} catch (error) {
			if (error instanceof Error && error.message.includes('Failed to update journal title')) {
				throw error;
			}

			const networkError = new Error('Network error occurred while updating journal title');

			ErrorService.reportApiError(networkError, {
				service: 'JournalAPI',
				method: 'updateJournalTitle',
				originalError: error instanceof Error ? error.message : 'Unknown error',
				requestParams: params,
			});

			throw networkError;
		}
	}

	static async deleteJournal(params: JournalDeleteServiceParams): Promise<JournalDeleteServiceResponse> {
		const { user, token } = useUserStore.getState();
		const { organization } = useOrganizationStore.getState();

		if (!user) {
			const error = new Error('User not found');
			ErrorService.reportApiError(error, { service: 'JournalAPI', method: 'deleteJournal' });
		}

		if (!organization) {
			const error = new Error('Organization not found');
			ErrorService.reportApiError(error, { service: 'JournalAPI', method: 'deleteJournal' });
			throw error;
		}

		if (!token) {
			const error = new Error('Token not found');
			ErrorService.reportApiError(error, { service: 'JournalAPI', method: 'deleteJournal' });
			throw error;
		}

		try {
			const response = await fetch(`${this.BASE_URL}/journals/${params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ organizationId: organization.id }),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				const error = new Error(errorData.message ?? 'Failed to delete journal');

				ErrorService.reportApiError(error, {
					service: 'JournalAPI',
					method: 'deleteJournal',
					status: response.status,
					statusText: response.statusText,
					requestParams: params,
				});

				throw error;
			}

			return (await response.json()) as JournalDeleteServiceResponse;
		} catch (error) {
			if (error instanceof Error && error.message.includes('Failed to delete journal')) {
				throw error;
			}

			const networkError = new Error('Network error occurred while deleting journal');

			ErrorService.reportApiError(networkError, {
				service: 'JournalAPI',
				method: 'deleteJournal',
				originalError: error instanceof Error ? error.message : 'Unknown error',
				requestParams: params,
			});

			throw networkError;
		}
	}
}
