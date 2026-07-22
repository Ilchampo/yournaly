import { useCallback, useEffect, useRef, useState } from 'react';

interface UseDropdownOptions {
	disabled?: boolean;
	onOpenChange?: (isOpen: boolean) => void;
}

export const useDropdown = (options: UseDropdownOptions = {}) => {
	const { disabled = false, onOpenChange } = options;

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const dropdownRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const optionRefs = useRef<(HTMLElement | null)[]>([]);

	const setOpen = useCallback(
		(open: boolean) => {
			setIsOpen(open);
			onOpenChange?.(open);
		},
		[onOpenChange],
	);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, setOpen]);

	useEffect(() => {
		if (isOpen && optionRefs.current[0]) {
			optionRefs.current[0]?.focus();
		}
	}, [isOpen]);

	const handleToggle = useCallback(() => {
		if (!disabled) {
			setOpen(!isOpen);
		}
	}, [disabled, isOpen, setOpen]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent, index?: number) => {
			switch (e.key) {
				case 'Escape':
					setOpen(false);
					buttonRef.current?.focus();

					break;
				case 'Enter':
				case ' ':
					if (index !== undefined) {
						e.preventDefault();
					} else {
						handleToggle();
						e.preventDefault();
					}

					break;
				case 'ArrowDown':
					e.preventDefault();

					if (isOpen && index !== undefined) {
						const nextIndex = Math.min(index + 1, optionRefs.current.length - 1);
						optionRefs.current[nextIndex]?.focus();
					} else if (!isOpen) {
						setOpen(true);
					}

					break;
				case 'ArrowUp':
					e.preventDefault();

					if (isOpen && index !== undefined) {
						const prevIndex = Math.max(index - 1, 0);
						optionRefs.current[prevIndex]?.focus();
					}

					break;
				case 'Tab':
					if (isOpen) {
						setOpen(false);
					}

					break;
			}
		},
		[isOpen, handleToggle, setOpen],
	);

	const closeDropdown = useCallback(() => {
		setOpen(false);
		buttonRef.current?.focus();
	}, [setOpen]);

	return {
		isOpen,
		dropdownRef,
		buttonRef,
		optionRefs,
		handleToggle,
		handleKeyDown,
		closeDropdown,
		setOpen,
	};
};
