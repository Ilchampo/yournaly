import { JournalLanguage, JournalTone, UITheme } from '@/lib/_types';

export interface UpdateUserInkBalanceArgs {
  userId: string;
  inkAmount: number;
}

export interface DeductUserInksArgs {
  userId: string;
  inkAmount: number;
}

export interface CreateUserWalletArgs {
  userId: string;
  initialInks?: number;
}

export interface UpdateUserPreferencesArgs {
  userId: string;
  organizationId: string;
  defaultLanguage: JournalLanguage;
  defaultTone: JournalTone;
  defaultTarget: JournalLanguage;
  theme: UITheme;
}

export interface UpdateUserPreferencesResponse {
  defaultLanguage: JournalLanguage;
  defaultTone: JournalTone;
  defaultTarget: JournalLanguage;
  theme: UITheme;
}
