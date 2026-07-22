import type { Organization } from '@interfaces/organization.interface';
import type { User } from '@interfaces/user.interface';

declare global {
	interface Window {
		chrome: typeof chrome;
	}
}

export interface ChromeStorageData {
	accessToken?: string;
	refreshToken?: string;
	user?: User;
	organization?: Organization;
}
