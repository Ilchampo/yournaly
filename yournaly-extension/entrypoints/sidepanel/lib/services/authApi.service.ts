import type { AuthResponse } from '@lib/interfaces/auth.interface';

import { config } from '@lib/config';

export class AuthAPIService {
	private static readonly BASE_URL = config.api.baseUrl;

	static async authenticateWithGoogle(token: string): Promise<AuthResponse> {
		const response = await fetch(`${this.BASE_URL}/auth/google/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response.json();
	}
}
