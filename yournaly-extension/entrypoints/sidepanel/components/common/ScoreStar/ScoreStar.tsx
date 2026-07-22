import React from 'react';

import type { JournalScore } from '@lib/types';

interface ScoreStarProps {
	score: JournalScore;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	className?: string;
}

const ScoreStar: React.FC<ScoreStarProps> = props => {
	const { score, size = 'md', className = 'absolute -top-2 -right-2 z-5' } = props;

	const getScoreColor = (score: JournalScore) => {
		switch (score) {
			case 'A':
				return 'text-green-500 bg-green-200';
			case 'B':
				return 'text-blue-500 bg-blue-200';
			case 'C':
				return 'text-cyan-500 bg-cyan-200';
			case 'D':
				return 'text-yellow-500 bg-yellow-200';
			case 'E':
				return 'text-orange-500 bg-orange-200';
			case 'F':
				return 'text-red-500 bg-red-200';
			default:
				return 'text-gray-500 bg-gray-200';
		}
	};

	const getSizeClass = (size: ScoreStarProps['size']) => {
		switch (size) {
			case 'sm':
				return 'w-6 h-6 text-xs';
			case 'md':
				return 'w-8 h-8 text-xs';
			case 'lg':
				return 'w-10 h-10 text-lg';
			case 'xl':
				return 'w-18 h-18 text-2xl';
			default:
				return 'w-4 h-4 text-xs';
		}
	};

	return (
		<div
			className={`${className} ${getSizeClass(size)} rounded-full flex items-center justify-center border-2 ${getScoreColor(score)} shadow-md`}
		>
			<div className="flex items-center justify-center">
				<span className="font-bold">{score}</span>
			</div>
		</div>
	);
};

export default ScoreStar;
