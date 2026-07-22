import React from 'react';

const Doodles: React.FC = () => {
	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{/* Yellow circle doodle */}
			<div
				className="absolute top-[15%] left-[10%] w-16 h-16 rounded-full border-2 border-yellow-300 opacity-20"
				style={{
					transform: 'rotate(-10deg)',
				}}
			/>
			{/* Red squiggle */}
			<svg
				className="absolute top-[70%] right-[15%] w-20 h-20 text-red-300 opacity-20"
				viewBox="0 0 100 100"
				fill="none"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
			>
				<path d="M10,50 Q30,30 50,50 T90,50" />
			</svg>
			{/* Blue stars */}
			<svg
				className="absolute top-[25%] right-[20%] w-12 h-12 text-blue-300 opacity-20"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
			</svg>
			<svg
				className="absolute bottom-[15%] left-[20%] w-8 h-8 text-blue-300 opacity-20"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
			</svg>
			{/* Green circle */}
			<div
				className="absolute top-[30%] left-[30%] w-12 h-12 rounded-full border-2 border-green-300 opacity-20"
				style={{
					transform: 'rotate(10deg)',
				}}
			/>
			{/* Purple circle */}
			<div
				className="absolute top-[50%] right-[20%] w-12 h-12 rounded-full border-2 border-purple-300 opacity-20"
				style={{
					transform: 'rotate(-10deg)',
				}}
			/>
			{/* Orange star */}
			<svg
				className="absolute top-[60%] left-[40%] w-8 h-8 text-orange-300 opacity-20"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
			</svg>
		</div>
	);
};

export default React.memo(Doodles);
