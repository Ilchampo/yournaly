import type { ChromeStorageData } from '@interfaces/chrome.interface';
import type { User, UserPreferences } from '@interfaces/user.interface';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AuthAPIService } from '@services/authApi.service';
import { ChromeAuthService } from '@services/chromeAuth.service';
import { ChromeStorageService } from '@services/chromeStorage.service';
import { useOrganizationStore } from '@stores/organization.store';

interface UserState {
	user: User | null;
	token: string | null;
	refreshToken: string | null;

	loginWithGoogle: () => Promise<void>;
	logout: VoidFunction;
	loadFromChromeStorage: () => Promise<void>;
	updateUser: (updates: Partial<User>) => void;
	updateUserPreferences: (preferences: UserPreferences) => void;
	updateInkBalance: (newBalance: number) => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set, get) => ({
			user: null,
			token: null,
			refreshToken: null,

			loginWithGoogle: async () => {
				try {
					const googleToken = await ChromeAuthService.getGoogleToken();
					const authResponse = await AuthAPIService.authenticateWithGoogle(googleToken);

					const { user, token, refreshToken, organization } = authResponse.data;

					set({ user, token, refreshToken });

					useOrganizationStore.getState().setOrganization(organization);

					await ChromeStorageService.setUserData({
						accessToken: token,
						refreshToken,
						user,
						organization,
					});
				} catch (error) {
					console.error('Google authentication failed:', error);
					throw error;
				}
			},

			logout: async () => {
				const { token } = get();

				if (token) {
					await ChromeAuthService.removeGoogleToken(token);
				}

				await ChromeStorageService.clearUserData();

				useOrganizationStore.getState().clearOrganization();

				set({
					user: null,
					token: null,
					refreshToken: null,
				});
			},

			loadFromChromeStorage: async () => {
				const data = await ChromeStorageService.getUserData();

				if (data.user && data.accessToken) {
					set({
						user: data.user,
						token: data.accessToken,
						refreshToken: data.refreshToken,
					});

					if (data.organization) {
						useOrganizationStore.getState().setOrganization(data.organization);
					}
				}
			},

			updateUser: (updates: Partial<User>) => {
				const currentUser = get().user;

				if (currentUser) {
					const updatedUser = { ...currentUser, ...updates };

					set({
						user: updatedUser,
					});

					const storageData: ChromeStorageData = {
						user: updatedUser,
					};

					const token = get().token;
					const refreshToken = get().refreshToken;
					const organization = useOrganizationStore.getState().organization;

					if (token) {
						storageData.accessToken = token;
					}

					if (refreshToken) {
						storageData.refreshToken = refreshToken;
					}
					if (organization) {
						storageData.organization = organization;
					}

					ChromeStorageService.setUserData(storageData).catch(error => {
						console.error('Failed to persist user data to Chrome storage:', error);
					});
				}
			},

			updateUserPreferences: (preferences: UserPreferences) => {
				const currentUser = get().user;

				if (currentUser) {
					const updatedUser = { ...currentUser, preferences };

					set({
						user: updatedUser,
					});

					const storageData: ChromeStorageData = {
						user: updatedUser,
					};

					const token = get().token;
					const refreshToken = get().refreshToken;
					const organization = useOrganizationStore.getState().organization;

					if (token) {
						storageData.accessToken = token;
					}

					if (refreshToken) {
						storageData.refreshToken = refreshToken;
					}
					if (organization) {
						storageData.organization = organization;
					}

					ChromeStorageService.setUserData(storageData).catch(error => {
						console.error('Failed to persist user data to Chrome storage:', error);
					});
				}
			},

			updateInkBalance: (newBalance: number) => {
				const currentUser = get().user;

				if (currentUser) {
					set({
						user: { ...currentUser, inksBalance: newBalance },
					});
				}
			},
		}),
		{
			name: 'user-storage',
			storage: {
				getItem: () => null,
				setItem: () => {},
				removeItem: () => {},
			},
		},
	),
);

export const useIsAuthenticated = () => {
	const user = useUserStore(state => state.user);

	return !!user;
};

export const useInkBalance = () => {
	const user = useUserStore(state => state.user);

	return user?.inksBalance ?? 0;
};
