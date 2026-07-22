import { BookOpenIcon, CreditCardIcon, HomeIcon, InfoIcon, SettingsIcon } from 'lucide-react';

export const SEGMENT_CONFIG: Record<string, { label: string; Icon: React.ComponentType<{ className?: string }> }> = {
	home: { label: 'components.navbar.home', Icon: HomeIcon },
	journal: { label: 'components.navbar.yournalSummary', Icon: BookOpenIcon },
	journals: { label: 'components.navbar.myYournals', Icon: BookOpenIcon },
	about: { label: 'components.navbar.about', Icon: InfoIcon },
	purchase: { label: 'components.navbar.purchase', Icon: CreditCardIcon },
	preferences: { label: 'components.navbar.preferences', Icon: SettingsIcon },
	'purchase-inks': { label: 'components.navbar.purchase', Icon: CreditCardIcon },
} as const;
