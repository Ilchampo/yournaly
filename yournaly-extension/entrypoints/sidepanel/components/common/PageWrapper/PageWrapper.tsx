import React from 'react';

import Footer from '@components/common/Footer/Footer';
import Navbar from '@components/common/Navbar/Navbar';
import PageHeader from '@components/common/PageHeader/PageHeader';

interface PageWrapperProps {
	title?: string;
	subtitle?: string;
	children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = props => {
	const { title, subtitle, children } = props;

	return (
		<div className="flex flex-col h-full">
			<Navbar />
			<main className="flex-1 px-4  overflow-y-auto relative z-10 lg:px-8" aria-label={title}>
				<PageHeader title={title} subtitle={subtitle} />
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default PageWrapper;
