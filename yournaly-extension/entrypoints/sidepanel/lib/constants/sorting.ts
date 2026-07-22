import type { SortConfig } from '@interfaces/sorting.interface';

export const SORT_OPTIONS: SortConfig[] = [
	{ value: 'date-newest', label: 'constants.sorting.options.dateNewest', sort: 'createdAt', order: 'desc' },
	{ value: 'date-oldest', label: 'constants.sorting.options.dateOldest', sort: 'createdAt', order: 'asc' },
	{ value: 'score-highest', label: 'constants.sorting.options.scoreHighest', sort: 'score', order: 'asc' },
	{ value: 'score-lowest', label: 'constants.sorting.options.scoreLowest', sort: 'score', order: 'desc' },
	{ value: 'ink-highest', label: 'constants.sorting.options.inkHighest', sort: 'inksUsed', order: 'desc' },
	{ value: 'ink-lowest', label: 'constants.sorting.options.inkLowest', sort: 'inksUsed', order: 'asc' },
] as const;
