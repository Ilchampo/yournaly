import type { Organization } from '@interfaces/organization.interface';
import type { JournalTone, Language } from '@lib/types';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OrganizationState {
	organization: Organization | null;

	setOrganization: (organization: Organization) => void;
	updateOrganization: (updates: Partial<Organization>) => void;
	clearOrganization: () => void;
}

export const useOrganizationStore = create<OrganizationState>()(
	persist(
		(set, get) => ({
			organization: null,

			setOrganization: (organization: Organization) => {
				set({ organization });
			},

			updateOrganization: (updates: Partial<Organization>) => {
				const currentOrganization = get().organization;

				if (currentOrganization) {
					set({
						organization: { ...currentOrganization, ...updates },
					});
				}
			},

			clearOrganization: () => {
				set({ organization: null });
			},
		}),
		{
			name: 'organization-storage',
			storage: {
				getItem: () => null,
				setItem: () => {},
				removeItem: () => {},
			},
		},
	),
);

export const useOrganization = () => {
	const organization = useOrganizationStore(state => state.organization);

	return organization;
};

export const useOrganizationTones = () => {
	const organization = useOrganizationStore(state => state.organization);

	return organization?.tones ?? [];
};

export const useOrganizationLanguages = () => {
	const organization = useOrganizationStore(state => state.organization);

	return organization?.languages ?? [];
};

export const useOrganizationMaxCharacters = () => {
	const organization = useOrganizationStore(state => state.organization);

	return organization?.maxCharacters ?? 2500;
};

export const useOrganizationBusinessPlan = () => {
	const organization = useOrganizationStore(state => state.organization);

	return organization?.businessPlan;
};

export const useOrganizationInfo = () => {
	const organization = useOrganizationStore(state => state.organization);

	return {
		name: organization?.name,
		contactEmail: organization?.contactEmail,
		logoUrl: organization?.logoUrl,
	};
};

export const useIsToneAvailable = (tone: JournalTone) => {
	const availableTones = useOrganizationTones();

	return availableTones.includes(tone);
};

export const useIsLanguageAvailable = (language: Language) => {
	const availableLanguages = useOrganizationLanguages();

	return availableLanguages.includes(language);
};
