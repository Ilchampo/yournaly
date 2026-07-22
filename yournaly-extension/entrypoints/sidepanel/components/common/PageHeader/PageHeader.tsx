import React from 'react';

interface PageHeaderProps {
	title?: string;
	subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = props => {
	const { title, subtitle } = props;

	return (
		<div className="my-6 text-center">
			{title && <h2 className="text-2xl font-medium mb-2">{title}</h2>}
			{subtitle && <p className="text-sm">{subtitle}</p>}
		</div>
	);
};

export default PageHeader;
