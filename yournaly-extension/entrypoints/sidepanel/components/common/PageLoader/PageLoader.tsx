import React from 'react';

import { LoaderIcon } from 'lucide-react';

interface PageLoaderProps {
	message?: string;
}

const PageLoader: React.FC<PageLoaderProps> = props => {
	const { message = 'Loading...' } = props;

	return (
		<div className="fixed inset-0 flex flex-col items-center justify-center bg-surface-50/90 z-50 w-screen h-screen">
			<div className="text-center">
				<LoaderIcon size={40} className="animate-spin text-secondary-600 mx-auto mb-4" />
				<p className="text-primary-800 font-semibold">{message}</p>
			</div>
		</div>
	);
};

export default PageLoader;
