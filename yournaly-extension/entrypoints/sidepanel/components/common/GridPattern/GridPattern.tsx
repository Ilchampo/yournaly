import React from 'react';

const GridPattern: React.FC = () => {
	return (
		<div
			className="absolute inset-0"
			style={{
				backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z'/%3E%3C/g%3E%3C/svg%3E")`,
				backgroundRepeat: 'repeat',
			}}
		/>
	);
};

export default React.memo(GridPattern);
