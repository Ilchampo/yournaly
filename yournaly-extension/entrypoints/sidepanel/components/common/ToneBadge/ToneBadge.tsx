import React from 'react';

import type { JournalTone } from '@/lib/types';

import { toneCodeMapper } from '@lib/utils/mapper.utils';

interface ToneBadgeProps {
	tone: JournalTone;
}

const ToneBadge: React.FC<ToneBadgeProps> = props => {
	const { tone } = props;

	const toneColor = (tone: JournalTone) => {
		switch (tone) {
			case 'original':
				return 'bg-primary-100 text-primary-700';
			case 'professional':
				return 'bg-blue-100 text-blue-700';
			case 'friendly':
				return 'bg-cyan-100 text-cyan-700';
			case 'serious':
				return 'bg-yellow-100 text-yellow-700';
			case 'educational':
				return 'bg-green-100 text-green-700';
			default:
				return 'bg-gray-100 text-gray-700';
		}
	};

	return (
		<div className={`text-xs rounded-full bg-opacity-50 px-2.5 py-1 whitespace-nowrap border ${toneColor(tone)}`}>
			{toneCodeMapper(tone)}
		</div>
	);
};

export default ToneBadge;
