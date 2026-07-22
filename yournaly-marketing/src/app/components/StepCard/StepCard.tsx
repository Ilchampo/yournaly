import React from 'react';

import type { Step } from '@interfaces/step.interface';

interface StepCardProps {
	index: number;
	step: Step;
}

const StepCard: React.FC<StepCardProps> = props => {
	const { index, step } = props;

	const getTapeRotation = () => (index % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[3deg]');

	const getTapeColor = () => {
		switch (index) {
			case 0:
				return 'bg-amber-400/50';
			case 1:
				return 'bg-blue-400/50';
			case 2:
				return 'bg-green-400/50';
			case 3:
				return 'bg-red-400/50';
			default:
				return 'bg-gray-400/50';
		}
	};

	return (
		<div className="flex flex-col h-full relative">
			<div className={`absolute left-1/2 -top-5 transform -translate-x-1/2 ${getTapeRotation()} z-10`}>
				<div className={`${getTapeColor()} w-16 h-10 flex items-center justify-center transform shadow-sm`}>
					<span className="font-bold text-xl">{index + 1}</span>
				</div>
			</div>
			<div className="bg-secondary-50 bg-opacity-70 rounded-br-lg p-6 pt-8 shadow-sm h-full mt-2 relative overflow-hidden">
				<div className="mb-3 flex justify-center">
					<step.icon className="w-8 h-8 text-primary-700" />
				</div>
				<h3 className="font-header text-header text-xl mb-3 text-center">{step.title}</h3>
				<p className="text-body text-center">{step.description}</p>
				<div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] border-b-secondary-100 border-r-secondary-100 shadow-sm"></div>
				<div className="absolute bottom-0 right-0 w-0 h-0 border-t-[20px] border-l-[20px] border-t-transparent border-l-transparent"></div>
			</div>
		</div>
	);
};

export default StepCard;
