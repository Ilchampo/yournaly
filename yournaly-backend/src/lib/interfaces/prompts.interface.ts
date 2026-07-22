export interface FormatPromptArgs {
  originalText: string;
  targetLanguage: string;
  reviewLanguage: string;
  tone: string;
  improveReadability: boolean;
  textLength: string;
  minCharacters: number | null;
  maxCharacters: number | null;
}
