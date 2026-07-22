import type { Response } from '@interfaces/response.interface';
import type { JournalMistakeType, JournalScore, JournalTextLength, JournalTone, Language } from '@lib/types';

export interface JournalAdvancedOptions {
	textLength: JournalTextLength;
	minCharacters: number | null;
	maxCharacters: number | null;
}

export interface JournalInsight {
	mistakeType: JournalMistakeType;
	mistakeTitle: string;
	originalMistake: string;
	mistakeCorrection: string;
	mistakeExplanation: string;
	ranges: [number, number][];
}

export interface JournalReview {
	title: string;
	score: string;
	reviewedText: string;
	feedback: string;
	insights: Array<JournalInsight>;
}

export interface JournalSummaryCard {
	id: string;
	title: string;
	description: string;
	tone: JournalTone;
	inksUsed: number;
	score: JournalScore;
	date: string;
}

export interface JournalReviewDetail {
	id: string;
	title: string;
	originalText: string;
	reviewedText: string;
	score: JournalScore;
	tone: JournalTone;
	inksUsed: number;
	date: string;
	feedback: string;
	insights: Array<JournalInsight>;
	parameters: {
		improveReadability: boolean;
		targetLanguage: Language;
		reviewLanguage: Language;
		advancedOptions: JournalAdvancedOptions | null;
	};
}

export interface JournalRequestParams {
	originalText: string;
	targetLanguage: Language;
	reviewLanguage: Language;
	tone: JournalTone;
	improveReadability: boolean;
	estimatedInks: number;
	advancedOptions: JournalAdvancedOptions | null;
}

export interface JournalSummaryRequestParams {
	organizationId?: string;
	page?: number;
	limit?: number;
	sort?: string;
	order?: string;
}

export interface JournalDetailRequestParams {
	id: string;
}

export interface JournalDeleteServiceParams {
	id: string;
}

export interface JournalUpdateTitleServiceParams {
	id: string;
	title: string;
}

export interface JournalSummaryServiceResponse extends Response {
	data: {
		total: number;
		page: number;
		limit: number;
		journals: Array<JournalSummaryCard>;
	};
}

export interface JournalReviewServiceResponse extends Response {
	data: JournalReviewDetail;
}

export interface JournalDeleteServiceResponse extends Response {
	data: {
		success: boolean;
		message: string;
	};
}

export interface JournalUpdateTitleServiceResponse extends Response {
	data: {
		success: boolean;
		title: string;
	};
}
