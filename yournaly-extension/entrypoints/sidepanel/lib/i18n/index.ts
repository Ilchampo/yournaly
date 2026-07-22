import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import enTranslations from '@lib/i18n/locales/en.json';
import esTranslations from '@lib/i18n/locales/es.json';
import frTranslations from '@lib/i18n/locales/fr.json';
import itTranslations from '@lib/i18n/locales/it.json';
import ptTranslations from '@lib/i18n/locales/pt.json';

const resources = {
	en: { translation: enTranslations },
	es: { translation: esTranslations },
	fr: { translation: frTranslations },
	it: { translation: itTranslations },
	pt: { translation: ptTranslations },
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',
	fallbackLng: 'en',
	debug: process.env.NODE_ENV === 'development',

	interpolation: {
		escapeValue: false,
	},

	detection: {
		order: ['localStorage'],
		caches: ['localStorage'],
	},

	defaultNS: 'translation',
	ns: ['translation'],

	load: 'languageOnly',
	cleanCode: true,

	react: {
		useSuspense: false,
	},
});

const syncLanguageWithChromeStorage = async (language: string) => {
	try {
		if (typeof chrome !== 'undefined' && chrome.storage) {
			await chrome.storage.local.set({ preferredLanguage: language });
		}
	} catch (error) {
		console.warn('Failed to sync language with Chrome storage:', error);
	}
};

const loadLanguageFromChromeStorage = async () => {
	try {
		if (typeof chrome !== 'undefined' && chrome.storage) {
			const result = await chrome.storage.local.get(['preferredLanguage']);

			if (result.preferredLanguage) {
				await i18n.changeLanguage(result.preferredLanguage);
			}
		}
	} catch (error) {
		console.warn('Failed to load language from Chrome storage:', error);
	}
};

i18n.on('languageChanged', lng => {
	syncLanguageWithChromeStorage(lng);
});

loadLanguageFromChromeStorage();

export default i18n;
