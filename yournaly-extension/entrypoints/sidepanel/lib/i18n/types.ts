import 'react-i18next';

import type enTranslations from '@lib/i18n/locales/en.json';

declare module 'react-i18next' {
	interface CustomTypeOptions {
		defaultNS: 'translation';
		resources: {
			translation: typeof enTranslations;
		};
	}
}

export type TranslationKey = keyof typeof enTranslations;

export type NestedTranslationKey = 'pages' | 'components' | 'constants' | 'common';

export type TranslationPath<T extends NestedTranslationKey> = T extends 'common'
	? keyof typeof enTranslations.common
	: T extends 'pages'
		? keyof typeof enTranslations.pages
		: T extends 'components'
			? keyof typeof enTranslations.components
			: T extends 'constants'
				? keyof typeof enTranslations.constants
				: never;
