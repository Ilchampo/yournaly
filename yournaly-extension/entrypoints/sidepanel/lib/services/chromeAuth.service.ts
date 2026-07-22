export class ChromeAuthService {
	static async getGoogleToken(): Promise<string> {
		return new Promise((resolve, reject) => {
			chrome.identity.getAuthToken(
				{
					interactive: true,
					scopes: ['profile', 'email'],
				},
				token => {
					if (chrome.runtime.lastError) {
						reject(chrome.runtime.lastError);

						return;
					}

					resolve(token as string);
				},
			);
		});
	}

	static async removeGoogleToken(token: string): Promise<void> {
		return new Promise(resolve => {
			chrome.identity.removeCachedAuthToken({ token }, () => {
				resolve();
			});
		});
	}
}
