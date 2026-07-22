import type { JournalTone } from '@lib/types';

export const JOURNAL_TONES: { [key in JournalTone]: string } = {
	original: 'constants.tones.original',
	professional: 'constants.tones.professional',
	educational: 'constants.tones.educational',
	friendly: 'constants.tones.friendly',
	serious: 'constants.tones.serious',
} as const;
