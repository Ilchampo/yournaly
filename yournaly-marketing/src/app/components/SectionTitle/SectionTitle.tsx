import React from 'react';

interface SectionTitleProps {
	title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = props => {
	const { title } = props;

	return (
		<div className="text-center mb-16">
			<h2 className="text-3xl md:text-4xl mb-4">{title}</h2>
			<div className="w-20 h-1 mx-auto rounded-full bg-primary-700"></div>
		</div>
	);
};

export default SectionTitle;
