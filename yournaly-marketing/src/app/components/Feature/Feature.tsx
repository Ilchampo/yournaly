import React from 'react';

import type { Feature } from '@interfaces/feature.interface';

interface FeatureProps {
	feature: Feature;
}

const Feature: React.FC<FeatureProps> = props => {
	const { feature } = props;

	return (
		<div className="flex items-start border border-primary-700 rounded-lg p-4 bg-primary-100/50">
			<div className="flex-shrink-0 mr-5 p-2 rounded-full">
				<feature.icon className="w-8 h-8 text-primary-700" />
			</div>
			<div>
				<h3 className="text-xl mb-2">{feature.title}</h3>
				<p>{feature.description}</p>
			</div>
		</div>
	);
};

export default Feature;
