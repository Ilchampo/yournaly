// Global types
export type Environment = 'production' | 'development';
export type Language = 'en' | 'es' | 'it' | 'fr' | 'pt';
export type BusinessPlan = 'B2B' | 'B2C';
export type UserRole = 'admin' | 'advisor' | 'learner';
export type UITheme = 'default';
export type SortOption =
	| 'date-newest'
	| 'date-oldest'
	| 'score-highest'
	| 'score-lowest'
	| 'ink-highest'
	| 'ink-lowest';

// Journal types
export type JournalTone = 'original' | 'professional' | 'educational' | 'friendly' | 'serious';
export type JournalTextLength = 'shorten' | 'extend' | 'none';
export type JournalScore = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type JournalMistakeType =
	| 'grammar'
	| 'vocabulary'
	| 'punctuation'
	| 'word-choice'
	| 'word-usage'
	| 'word-form'
	| 'word-meaning'
	| 'spelling'
	| 'sentence-structure';

// Payment types
export type PaymentStatus = 'idle' | 'creating' | 'pending' | 'polling' | 'completed' | 'failed' | 'expired';
