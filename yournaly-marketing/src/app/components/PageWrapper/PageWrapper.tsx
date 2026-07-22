import React from 'react';

import Background from '@components/Background/Background';
import Doodles from '@components/Doodles/Doodles';

interface PageWrapperProps {
	children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = props => {
	const { children } = props;

	return (
		<div className="relative min-h-screen flex flex-col w-full">
			<Background />
			<Doodles />
			<div className="relative z-10 flex-1 flex flex-col">
				<main className="container mx-auto px-4 py-8 flex-1 flex flex-col">{children}</main>
			</div>
		</div>
	);
};

export default PageWrapper;
