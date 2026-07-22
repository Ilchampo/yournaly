import React from 'react';

const Background: React.FC = () => {
	return (
		<div
			className="absolute inset-0 pointer-events-none"
			style={{
				backgroundImage: `linear-gradient(to right, #c0f0c3 1px, transparent 1px), 
                            linear-gradient(to bottom, #c0f0c3 1px, transparent 1px)`,
				backgroundSize: '20px 20px',
			}}
		/>
	);
};

export default Background;
