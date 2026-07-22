import type {
	JournalAdvancedOptions,
	JournalDeleteServiceParams,
	JournalRequestParams,
	JournalUpdateTitleServiceParams,
} from '@interfaces/journal.interface';
import type { JournalTone, Language } from '@lib/types';

import { JournalAPIService } from '@services/journalApi.service';
import { useOrganizationStore } from '@stores/organization.store';
import { useUserStore } from '@stores/user.store';
import { calculateInkUsage } from '@utils/ink.utils';
import { create } from 'zustand';

interface JournalState {
	id: string | null;
	originalText: string;
	tone: JournalTone;
	improveReadability: boolean;
	advancedOptions: JournalAdvancedOptions;
	language: Language;
	isReviewing: boolean;
	isDeleting: boolean;
	isUpdatingTitle: boolean;
	reviewedText: string | null;
	reviewError: string | null;
	reviewTitle: string | null;
	reviewScore: string | null;
	reviewFeedback: string | null;
	reviewMistakes: Array<{
		mistakeType: string;
		mistakeTitle: string;
		originalMistake: string;
		mistakeCorrection: string;
		mistakeExplanation: string;
		ranges: [number, number][];
	}> | null;

	setOriginalText: (text: string) => void;
	setTone: (tone: JournalTone) => void;
	setImproveReadability: (value: boolean) => void;
	setAdvancedOptions: (options: JournalAdvancedOptions) => void;
	setLanguage: (language: Language) => void;
	reviewJournal: () => Promise<void>;
	deleteJournal: (params: JournalDeleteServiceParams) => Promise<void>;
	updateJournalTitle: (params: JournalUpdateTitleServiceParams) => Promise<string>;
	resetReview: () => void;
	clearForm: () => void;
	getEstimatedInks: () => number;
	getMaxCharacters: () => number;
}

export const useJournalStore = create<JournalState>((set, get) => ({
	id: null,
	originalText: '',
	tone: 'original',
	improveReadability: false,
	advancedOptions: {
		textLength: 'none',
		minCharacters: null,
		maxCharacters: null,
	},
	language: 'en',

	isReviewing: false,
	isDeleting: false,
	isUpdatingTitle: false,
	reviewedText: null,
	reviewError: null,
	reviewTitle: null,
	reviewScore: null,
	reviewFeedback: null,
	reviewMistakes: null,

	setOriginalText: (text: string) => {
		set({ originalText: text });
	},

	setTone: (tone: JournalTone) => {
		const { organization } = useOrganizationStore.getState();

		if (organization && !organization.tones.includes(tone)) {
			console.warn(`Tone '${tone}' is not available for this organization`);

			return;
		}

		set({ tone });
	},

	setImproveReadability: (value: boolean) => {
		set({ improveReadability: value });
	},

	setAdvancedOptions: (options: JournalAdvancedOptions) => {
		set({ advancedOptions: options });
	},

	setLanguage: (language: Language) => {
		const { organization } = useOrganizationStore.getState();

		if (organization && !organization.languages.includes(language)) {
			console.warn(`Language '${language}' is not available for this organization`);

			return;
		}

		set({ language });
	},

	reviewJournal: async () => {
		const { originalText, tone, improveReadability, advancedOptions, language } = get();
		const { user } = useUserStore.getState();

		if (!originalText.trim()) {
			set({ reviewError: 'Please enter some text to review' });

			return;
		}

		if (!user) {
			set({ reviewError: 'User not authenticated' });

			return;
		}

		set({ isReviewing: true, reviewError: null });

		try {
			const estimatedInks = get().getEstimatedInks();

			const params: JournalRequestParams = {
				originalText: originalText.trim(),
				targetLanguage: language,
				reviewLanguage: user.preferences.defaultLanguage,
				tone,
				improveReadability,
				estimatedInks,
				advancedOptions,
			};

			const response = await JournalAPIService.reviewJournal(params);

			set({
				id: response.data.id,
				reviewedText: response.data.reviewedText,
				reviewTitle: response.data.title,
				reviewScore: response.data.score,
				reviewFeedback: response.data.feedback,
				reviewMistakes: response.data.insights ?? null,
				isReviewing: false,
			});

			useUserStore.getState().updateInkBalance(user.inksBalance - estimatedInks);
		} catch (error) {
			console.error('Journal review failed:', error);

			set({
				reviewError: error instanceof Error ? error.message : 'Failed to review journal',
				isReviewing: false,
			});
		}
	},

	deleteJournal: async (params: JournalDeleteServiceParams) => {
		set({ isDeleting: true });

		try {
			await JournalAPIService.deleteJournal(params);
		} catch (error) {
			console.error('Journal deletion failed:', error);
			throw error;
		} finally {
			set({ isDeleting: false });
		}
	},

	updateJournalTitle: async (params: JournalUpdateTitleServiceParams) => {
		set({ isUpdatingTitle: true });

		try {
			const response = await JournalAPIService.updateJournalTitle(params);
			return response.data.title;
		} catch (error) {
			console.error('Journal title update failed:', error);
			throw error;
		} finally {
			set({ isUpdatingTitle: false });
		}
	},

	resetReview: () => {
		set({
			reviewedText: null,
			reviewError: null,
			reviewTitle: null,
			reviewScore: null,
			reviewFeedback: null,
			reviewMistakes: null,
		});
	},

	clearForm: () => {
		const { organization } = useOrganizationStore.getState();
		const { user } = useUserStore.getState();

		set({
			originalText: '',
			tone: user?.preferences?.defaultTone ?? organization?.tones?.[0] ?? 'original',
			improveReadability: false,
			advancedOptions: {
				textLength: 'none',
				minCharacters: null,
				maxCharacters: null,
			},
			language: user?.preferences?.defaultTarget ?? organization?.languages?.[0] ?? 'en',
		});

		get().resetReview();
	},

	getEstimatedInks: () => {
		const { originalText, tone, improveReadability, advancedOptions } = get();

		return calculateInkUsage(originalText.length, improveReadability, tone, advancedOptions);
	},

	getMaxCharacters: () => {
		const { organization } = useOrganizationStore.getState();

		return organization?.maxCharacters ?? 2500;
	},
}));

export const useJournalFormState = () =>
	useJournalStore(state => ({
		originalText: state.originalText,
		tone: state.tone,
		improveReadability: state.improveReadability,
		advancedOptions: state.advancedOptions,
		language: state.language,
	}));

export const useJournalReviewState = () =>
	useJournalStore(state => ({
		isReviewing: state.isReviewing,
		isDeleting: state.isDeleting,
		isUpdatingTitle: state.isUpdatingTitle,
		reviewedText: state.reviewedText,
		reviewError: state.reviewError,
		reviewTitle: state.reviewTitle,
		reviewScore: state.reviewScore,
		reviewFeedback: state.reviewFeedback,
		reviewMistakes: state.reviewMistakes,
	}));

export const useJournalActions = () =>
	useJournalStore(state => ({
		setOriginalText: state.setOriginalText,
		setTone: state.setTone,
		setImproveReadability: state.setImproveReadability,
		setAdvancedOptions: state.setAdvancedOptions,
		setLanguage: state.setLanguage,
		reviewJournal: state.reviewJournal,
		deleteJournal: state.deleteJournal,
		updateJournalTitle: state.updateJournalTitle,
		resetReview: state.resetReview,
		clearForm: state.clearForm,
		getEstimatedInks: state.getEstimatedInks,
		getMaxCharacters: state.getMaxCharacters,
	}));
