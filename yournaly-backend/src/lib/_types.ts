// THEME TYPES
export type UITheme = 'default';

// JOURNAL TYPES
export type JournalSortField = 'createdAt' | 'score' | 'inksUsed';

export type JournalSortOrder = 'asc' | 'desc';

export type JournalTone = 'original' | 'formal' | 'playful' | 'academic' | 'professional';

export type JournalTextLength = 'shorten' | 'extend' | 'none';

export type JournalScore = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export type JournalLanguage = 'en' | 'es' | 'it' | 'fr' | 'pt';

export type JournalMistakeType =
  | 'grammar'
  | 'vocabulary'
  | 'punctuation'
  | 'sentenceStructure'
  | 'wordChoice'
  | 'wordUsage'
  | 'wordForm'
  | 'wordMeaning';

// ORGANIZATION TYPES
export type OrganizationBusinessPlan = 'B2B' | 'B2C';

export type OrganizationUserRole = 'admin' | 'advisor' | 'learner';
