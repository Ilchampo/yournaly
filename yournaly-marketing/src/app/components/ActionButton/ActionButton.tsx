import React from 'react';

import Spinner from '@components/Spinner/Spinner';

interface ActionButtonBaseProps {
	children: React.ReactNode;
	ariaLabel: string;
	primary?: boolean;
	disabled?: boolean;
	loading?: boolean;
	className?: string;
}

interface ActionButtonAsButton extends ActionButtonBaseProps {
	href?: undefined;
	onClick: () => void;
}

interface ActionButtonAsLink extends ActionButtonBaseProps {
	href: string;
	onClick?: never;
}

type ActionButtonProps = ActionButtonAsButton | ActionButtonAsLink;

const cn = (...classes: (string | undefined | null | false)[]): string => classes.filter(Boolean).join(' ');

const ActionButton: React.FC<ActionButtonProps> = props => {
	const {
		children,
		primary = false,
		disabled = false,
		loading = false,
		className = '',
		ariaLabel = 'Action Button',
	} = props;

	const sharedClassName = cn(
		'w-full flex items-center justify-center rounded-xl py-3 px-4 transition-all duration-200 shadow-sm hover:shadow-md h-full max-h-12',
		primary
			? 'bg-primary-800 text-primary-50 hover:bg-primary-900 disabled:bg-primary-800/70 disabled:text-primary-50/70'
			: 'bg-surface-50 text-surface-800 hover:bg-surface-100 border border-surface-800 disabled:bg-surface-50/70 disabled:text-surface-800/70',
		className,
	);

	if ('href' in props && props.href) {
		return (
			<a
				href={props.href}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={ariaLabel}
				className={sharedClassName}
			>
				{loading ? <Spinner /> : children}
			</a>
		);
	}

	return (
		<button
			onClick={props.onClick}
			disabled={disabled || loading}
			aria-disabled={disabled || loading}
			aria-label={ariaLabel}
			type="button"
			className={sharedClassName}
		>
			{loading ? <Spinner /> : children}
		</button>
	);
};

export default React.memo(ActionButton);
