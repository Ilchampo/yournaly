import type { JournalAdvancedOptions } from '@interfaces/journal.interface';
import type { JournalTone } from '@lib/types';

export const calculateInkUsage = (
	textLength: number,
	improveReadability: boolean,
	tone: JournalTone,
	advancedOptions: JournalAdvancedOptions,
): number => {
	let totalInks = 0;

	const baseInks = Math.ceil((textLength / 500) * 2.5);

	totalInks += baseInks;

	if (tone !== 'original') {
		totalInks += 1;
	}

	if (improveReadability) {
		totalInks += 1.5;
	}

	if (advancedOptions.textLength !== 'none') {
		totalInks += 2.5;
	}

	if (advancedOptions.minCharacters || advancedOptions.maxCharacters) {
		totalInks += 1.5;
	}

	return Math.ceil(totalInks);
};
