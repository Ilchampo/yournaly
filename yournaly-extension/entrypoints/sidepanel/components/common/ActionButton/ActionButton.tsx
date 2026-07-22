import React from 'react';

import { cn } from '@utils/string.utils';

import Spinner from '@components/common/Spinner/Spinner';

interface ActionButtonProps {
	children: React.ReactNode;
	ariaLabel: string;
	onClick: () => void;
	primary?: boolean;
	disabled?: boolean;
	loading?: boolean;
	className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = props => {
	const {
		children,
		onClick,
		primary = false,
		disabled = false,
		loading = false,
		className = '',
		ariaLabel = 'Action Button',
	} = props;

	return (
		<button
			onClick={onClick}
			disabled={disabled || loading}
			aria-disabled={disabled || loading}
			aria-label={ariaLabel}
			type="button"
			className={cn(
				'w-full flex items-center justify-center rounded-xl py-3 px-4 transition-all duration-200 shadow-sm hover:shadow-md h-full max-h-12',
				primary
					? 'bg-primary-800 text-primary-50 hover:bg-primary-900 disabled:bg-primary-800/70 disabled:text-primary-50/70'
					: 'bg-surface-50 text-surface-800 hover:bg-surface-100 border border-surface-800 disabled:bg-surface-50/70 disabled:text-surface-800/70',
				className,
			)}
		>
			{loading ? <Spinner /> : children}
		</button>
	);
};

export default React.memo(ActionButton);
