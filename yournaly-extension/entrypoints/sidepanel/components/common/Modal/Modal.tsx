import React from 'react';

import { XIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

import BackgroundWrapper from '@components/common/BackgroundWrapper/BackgroundWrapper';

interface ModalProps {
	title: string;
	isOpen: boolean;
	onClose: VoidFunction;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = props => {
	const { isOpen, onClose, title, children } = props;

	const modalRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose]);

	return isOpen ? (
		<div
			className="fixed inset-0 bg-black/50 lg:bg-black/60 flex items-center justify-center z-50 w-full h-screen p-0 lg:p-4"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			aria-describedby="modal-content"
			ref={modalRef}
		>
			<div className="w-full h-full lg:w-auto lg:h-auto">
				<BackgroundWrapper>
					<div className="w-full h-full lg:w-auto lg:h-auto lg:max-w-2xl lg:max-h-[90vh] overflow-hidden">
						<div className="h-full lg:h-auto overflow-y-auto relative">
							<div className="sticky top-0 bg-surface-100 border-b border-surface-200 p-4 flex justify-between items-center z-20 shadow-md">
								<h2 id="modal-title" className="text-lg font-semibold">
									{title}
								</h2>
								<button
									ref={closeButtonRef}
									onClick={onClose}
									className="p-1 hover:bg-primary-300 rounded-full transition-colors text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
									aria-label="Close modal"
									type="button"
								>
									<XIcon size={20} />
								</button>
							</div>

							<div id="modal-content" className="p-6 relative z-10">
								{children}
							</div>
						</div>
					</div>
				</BackgroundWrapper>
			</div>
		</div>
	) : null;
};

export default Modal;
