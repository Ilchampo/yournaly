import type {
  JournalTone,
  JournalTextLength,
  JournalScore,
  JournalLanguage,
  JournalMistakeType,
  JournalSortField,
  JournalSortOrder,
} from '@/lib/_types';

export interface JournalAdvancedOptions {
  textLength: JournalTextLength;
  minCharacters: number | null;
  maxCharacters: number | null;
}

export interface JournalInsightAI {
  mistakeType: JournalMistakeType;
  mistakeTitle: string;
  originalMistake: string;
  mistakeCorrection: string;
  mistakeExplanation: string;
  ranges: [number, number][];
}

export interface JournalReviewParams {
  tone: JournalTone;
  improveReadability: boolean;
  targetLanguage: JournalLanguage;
  reviewLanguage: JournalLanguage;
  /** @deprecated Ignored — server calculates cost via calculateInkCost */
  estimatedInks?: number;
  advancedOptions: JournalAdvancedOptions | null;
}

export interface ReviewJournalAIArgs {
  userId: string;
  organizationId: string;
  originalText: string;
  params: JournalReviewParams;
}

export interface ReviewJournalAIResponse {
  id: string;
  title: string;
  score: JournalScore;
  reviewedText: string;
  feedback: string;
  insights: JournalInsightAI[];
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

export interface GetJournalsSummaryServiceArgs {
  organizationId: string;
  userId: string;
  page?: number;
  limit?: number;
  sort?: JournalSortField;
  order?: JournalSortOrder;
}

export interface GetJournalsSummaryServiceResponse {
  total: number;
  page: number;
  limit: number;
  journals: Array<JournalSummaryCard>;
}

export interface GetJournalByIdServiceArgs {
  journalId: string;
  userId: string;
  organizationId: string;
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
  insights: Array<{
    mistakeType: JournalMistakeType;
    mistakeTitle: string;
    originalMistake: string;
    mistakeCorrection: string;
    mistakeExplanation: string;
    ranges: [number, number][];
  }>;
  parameters: {
    improveReadability: boolean;
    targetLanguage: JournalLanguage;
    reviewLanguage: JournalLanguage;
    advancedOptions: JournalAdvancedOptions | null;
  };
}

export interface SoftDeleteJournalArgs {
  userId: string;
  organizationId: string;
  journalId: string;
}

export interface SoftDeleteJournalResponse {
  success: boolean;
  message: string;
}

export interface UpdateJournalTitleArgs {
  userId: string;
  organizationId: string;
  journalId: string;
  title: string;
}

export interface UpdateJournalTitleResponse {
  success: boolean;
  title: string;
}
