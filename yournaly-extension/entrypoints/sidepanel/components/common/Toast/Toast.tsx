import React from 'react';

import { CheckCircle, CircleAlert, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToastProps {
	message: string;
	type: 'success' | 'error';
	onClose?: VoidFunction;
}

const Toast: React.FC<ToastProps> = props => {
	const { message, type, onClose } = props;

	const [isVisible, setIsVisible] = useState<boolean>(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 4000);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!isVisible && onClose) {
			onClose();
		}
	}, [isVisible, onClose]);

	if (!isVisible) {
		return null;
	}

	const getToastStyles = () => {
		if (type === 'success') {
			return 'bg-surface-50 border-secondary-300 text-secondary-800';
		}
		return 'bg-surface-50 border-red-300 text-red-800';
	};

	const getIconStyles = () => {
		if (type === 'success') {
			return 'text-secondary-600';
		}
		return 'text-red-600';
	};

	const handleClose = () => {
		setIsVisible(false);
	};

	return (
		<div
			className={`fixed top-6 right-6 max-w-md p-4 rounded-xl border-2 shadow-lg transition-all duration-300 z-50 ${
				isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
			} ${getToastStyles()}`}
		>
			<div className="flex items-start gap-3">
				<div className={`flex-shrink-0 ${getIconStyles()}`}>
					{type === 'success' ? <CheckCircle className="w-5 h-5" /> : <CircleAlert className="w-5 h-5" />}
				</div>
				<p className="flex-1 text-sm font-medium leading-relaxed">{message}</p>
				<button
					onClick={handleClose}
					className="flex-shrink-0 text-primary-400 hover:text-primary-600 transition-colors duration-200 p-1 rounded-md hover:bg-primary-100"
					type="button"
					aria-label="Close notification"
				>
					<X className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
};

export default Toast;
