import type { Language } from '@lib/types';

import { useUserStore } from '@stores/user.store';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguageSync = () => {
	const { i18n } = useTranslation();
	const { user } = useUserStore();

	useEffect(() => {
		if (user?.preferences?.defaultLanguage) {
			const currentLanguage = i18n.language;
			const userPreferredLanguage = user.preferences.defaultLanguage;

			if (currentLanguage !== userPreferredLanguage) {
				i18n.changeLanguage(userPreferredLanguage);
			}
		}
	}, [user?.preferences?.defaultLanguage, i18n]);

	return {
		currentLanguage: i18n.language as Language,
		changeLanguage: (language: Language) => i18n.changeLanguage(language),
	};
};

export const useReactiveTranslations = () => {
	const { t } = useTranslation();

	return {
		getLanguageName: (language: Language) => t(`constants.languages.${language}`),
		getToneName: (tone: string) => t(`constants.tones.${tone}`),

		common: {
			save: t('common.actions.save'),
			confirm: t('common.actions.save'),
			cancel: t('common.actions.cancel'),
			processing: t('common.states.processing'),
			loading: t('common.states.loading'),
		},

		t,
	};
};

export const useLanguageManager = () => {
	const { i18n } = useTranslation();

	const changeLanguage = async (language: Language) => {
		try {
			await i18n.changeLanguage(language);

			return true;
		} catch (error) {
			console.error('Failed to change language:', error);
			return false;
		}
	};

	return {
		changeLanguage,
		currentLanguage: i18n.language as Language,
		availableLanguages: Object.keys(i18n.options.resources || {}) as Language[],
	};
};
