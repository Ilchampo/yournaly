import { Step } from '@interfaces/step.interface';

import { BarChartIcon, BookOpenIcon, MessageCircleIcon, SettingsIcon } from 'lucide-react';

export const STEPS: Step[] = [
	{
		title: 'Start Writing',
		description:
			'Open Yournaly and write anything—emails, journal entries, or drafts. Just focus on expressing yourself.',
		icon: BookOpenIcon,
	},
	{
		title: 'Set Your Preferences',
		description: 'Choose your native language, tone, and feedback level. Yournaly adapts to your learning style.',
		icon: SettingsIcon,
	},
	{
		title: 'Get Teacher-Like Feedback',
		description: 'Receive warm, natural corrections and suggestions—just like a real teacher would give you.',
		icon: MessageCircleIcon,
	},
	{
		title: 'Review, Learn, and Improve',
		description: 'Understand your mistakes, read the insights, and watch your English grow one Yournal at a time.',
		icon: BarChartIcon,
	},
] as const;
