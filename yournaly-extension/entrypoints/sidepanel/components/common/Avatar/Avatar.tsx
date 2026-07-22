import React from 'react';

import { UserIcon } from 'lucide-react';

interface AvatarProps {
	url?: string;
	name?: string;
	size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar: React.FC<AvatarProps> = ({ url, name, size = 'md' }) => {
	return (
		<div
			className={`flex items-center justify-center rounded-full ${size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-10 h-10' : size === 'lg' ? 'w-12 h-12' : 'w-46 h-46'}`}
		>
			{url ? (
				<img src={url} alt={name} className="w-full h-full object-cover rounded-full" />
			) : (
				<div className="w-full h-full rounded-full bg-primary-200 border border-primary-700 flex items-center justify-center">
					<UserIcon className="w-4 h-4" />
				</div>
			)}
		</div>
	);
};

export default Avatar;
