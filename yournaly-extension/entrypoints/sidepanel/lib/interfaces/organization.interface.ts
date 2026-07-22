import type { BusinessPlan, JournalTone, Language } from '@lib/types';

export interface Organization {
	id: string;
	name: string;
	contactEmail: string;
	logoUrl: string | null;
	businessPlan: BusinessPlan;
	maxCharacters: number;
	tones: JournalTone[];
	languages: Language[];
}
