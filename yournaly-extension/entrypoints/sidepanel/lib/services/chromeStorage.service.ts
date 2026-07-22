import type { ChromeStorageData } from '@interfaces/chrome.interface';

export class ChromeStorageService {
	static async setUserData(data: ChromeStorageData): Promise<void> {
		return new Promise(resolve => {
			chrome.storage.local.set(data, () => {
				resolve();
			});
		});
	}

	static async getUserData(): Promise<ChromeStorageData> {
		return new Promise(resolve => {
			chrome.storage.local.get(['accessToken', 'refreshToken', 'user', 'organization'], data => {
				resolve(data as ChromeStorageData);
			});
		});
	}

	static async clearUserData(): Promise<void> {
		return new Promise(resolve => {
			chrome.storage.local.remove(['accessToken', 'refreshToken', 'user', 'organization'], () => {
				resolve();
			});
		});
	}
}
