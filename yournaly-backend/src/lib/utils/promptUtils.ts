import type { FormatPromptArgs } from '@/lib/interfaces/prompts.interface';

import { REVIEW_JOURNAL_TEMPLATE } from '@/lib/templates/reviewJournal.template';

export const generatePrompt = (args: Record<string, unknown>, template: string): string => {
  return template.replace(/{{(.*?)}}/g, (match, p1) => (args[p1] as string) || match);
};

export const formatPrompt = (args: FormatPromptArgs): string => {
  const templateArgs = {
    originalText: args.originalText,
    targetLanguage: args.targetLanguage,
    reviewLanguage: args.reviewLanguage,
    tone: args.tone,
    improveReadability: args.improveReadability.toString(),
    textLength: args.textLength,
    minCharacters: args.minCharacters?.toString() ?? 'null',
    maxCharacters: args.maxCharacters?.toString() ?? 'null',
  };

  return generatePrompt(templateArgs, REVIEW_JOURNAL_TEMPLATE);
};
