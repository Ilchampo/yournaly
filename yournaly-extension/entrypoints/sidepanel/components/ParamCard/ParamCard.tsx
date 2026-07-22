import React from 'react';

interface ParamCardProps {
	param: string;
	value: string;
}

const ParamCard: React.FC<ParamCardProps> = props => {
	const { param, value } = props;

	return (
		<div className="bg-surface-100 border border-primary-700 p-2 rounded-lg">
			<div className="text-xs text-primary-700">{param}</div>
			<div className="text-sm">{value}</div>
		</div>
	);
};

export default ParamCard;
