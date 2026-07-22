import React from 'react';

import Doodles from '@components/common/Doodles/Doodles';
import GridPattern from '@components/common/GridPattern/GridPattern';

interface BackgroundWrapperProps {
	children: React.ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = props => {
	const { children } = props;

	return (
		<div className="relative w-full h-full bg-surface-50">
			<GridPattern />
			<Doodles />
			{children}
		</div>
	);
};

export default React.memo(BackgroundWrapper);
