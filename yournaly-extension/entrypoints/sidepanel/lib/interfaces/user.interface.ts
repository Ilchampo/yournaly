import type { JournalTone, Language, UITheme, UserRole } from '@lib/types';

export interface UserPreferences {
	defaultLanguage: Language;
	defaultTone: JournalTone;
	defaultTarget: Language;
	theme: UITheme;
}

export interface User {
	id: string;
	role: UserRole;
	firstName: string;
	lastName: string;
	avatarUrl: string | null;
	onboardingComplete: boolean;
	inksBalance: number;
	preferences: UserPreferences;
}

export interface UpdateUserPreferencesParams {
	organizationId: string;
	defaultLanguage: Language;
	defaultTone: JournalTone;
	defaultTarget: Language;
	theme: UITheme;
}
