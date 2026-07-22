import i18n from '@lib/i18n';

import type { JournalMistakeType, JournalTextLength, JournalTone, Language } from '@lib/types';

export const languageCodeMapper = (language: Language): string => {
	return i18n.t(`constants.languages.${language}`);
};

export const toneCodeMapper = (tone: JournalTone): string => {
	return i18n.t(`constants.tones.${tone}`);
};

export const textLengthMapper = (textLength: JournalTextLength): string => {
	switch (textLength) {
		case 'shorten':
			return i18n.t('common.params.advancedParams.textShorten', { defaultValue: 'Short' });
		case 'extend':
			return i18n.t('common.params.advancedParams.textExtend', { defaultValue: 'Extend' });
		default:
			return i18n.t('common.params.none', { defaultValue: 'Not Set' });
	}
};

export const mistakeTypeMapper = (mistakeType: JournalMistakeType): string => {
	switch (mistakeType) {
		case 'grammar':
			return i18n.t('constants.mistakeTypes.grammar', { defaultValue: 'Grammar' });
		case 'vocabulary':
			return i18n.t('constants.mistakeTypes.vocabulary', { defaultValue: 'Vocabulary' });
		case 'punctuation':
			return i18n.t('constants.mistakeTypes.punctuation', { defaultValue: 'Punctuation' });
		case 'sentence-structure':
			return i18n.t('constants.mistakeTypes.sentenceStructure', { defaultValue: 'Sentence Structure' });
		case 'word-choice':
			return i18n.t('constants.mistakeTypes.wordChoice', { defaultValue: 'Word Choice' });
		case 'word-usage':
			return i18n.t('constants.mistakeTypes.wordUsage', { defaultValue: 'Word Usage' });
		case 'word-form':
			return i18n.t('constants.mistakeTypes.wordForm', { defaultValue: 'Word Form' });
		case 'word-meaning':
			return i18n.t('constants.mistakeTypes.wordMeaning', { defaultValue: 'Word Meaning' });
		case 'spelling':
			return i18n.t('constants.mistakeTypes.spelling', { defaultValue: 'Spelling' });
		default:
			return mistakeType;
	}
};
