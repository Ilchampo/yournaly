import type { Feature } from '@interfaces/feature.interface';

import { BarChart3Icon, GlobeIcon, LayoutDashboardIcon, SlidersIcon, UserIcon, WalletIcon } from 'lucide-react';

export const FEATURES: Feature[] = [
	{
		title: 'Human-Like Feedback',
		description:
			'Yournaly reviews your writing like a teacher would—offering natural corrections, tone suggestions, and context-based guidance.',
		icon: UserIcon,
	},
	{
		title: 'Multilingual Support',
		description:
			'Get feedback in your native language—English, Spanish, French, Portuguese, or Italian—to understand your mistakes more clearly.',
		icon: GlobeIcon,
	},
	{
		title: 'Grading System (A–F)',
		description:
			'Every text is scored with a letter grade from A to F, helping you track your progress and see where you can improve.',
		icon: BarChart3Icon,
	},
	{
		title: 'Tone & Readability Controls',
		description:
			'Choose your preferred tone—formal or casual—and adjust for readability. Yournaly adapts to your writing goals.',
		icon: SlidersIcon,
	},
	{
		title: 'Flexible Pricing with Inks',
		description: 'Only pay for what you use. Buy Inks as needed—no subscriptions or hidden fees.',
		icon: WalletIcon,
	},
	{
		title: 'Works Right in Your Browser',
		description:
			'No extra apps or complicated setup. Yournaly lives in your browser and is ready whenever you write.',
		icon: LayoutDashboardIcon,
	},
];
