import type { JournalAdvancedOptions } from '@/lib/interfaces/journal.interface';
import type { JournalTone } from '@/lib/_types';

import { InkPricing } from '@/lib/constants/magicNumbers';

export interface CalculateInkCostArgs {
  originalText: string;
  tone: JournalTone | string;
  improveReadability: boolean;
  advancedOptions: JournalAdvancedOptions | null;
}

/**
 * Server-side ink cost for a journal review.
 * Base: 2.5 inks per 500 characters, plus optional add-ons; final cost is ceil'd (min 1).
 */
export const calculateInkCost = (args: CalculateInkCostArgs): number => {
  const { originalText, tone, improveReadability, advancedOptions } = args;

  let cost = (originalText.length / InkPricing.charactersPerBaseUnit) * InkPricing.baseInksPerUnit;

  if (tone !== 'original') {
    cost += InkPricing.toneAdjustment;
  }

  if (improveReadability) {
    cost += InkPricing.readabilityAdjustment;
  }

  if (advancedOptions) {
    if (advancedOptions.textLength === 'shorten' || advancedOptions.textLength === 'extend') {
      cost += InkPricing.textLengthAdjustment;
    }

    const hasMin = (advancedOptions.minCharacters ?? 0) > 0;
    const hasMax = (advancedOptions.maxCharacters ?? 0) > 0;

    if (hasMin || hasMax) {
      cost += InkPricing.minMaxCharactersAdjustment;
    }
  }

  return Math.max(1, Math.ceil(cost));
};
