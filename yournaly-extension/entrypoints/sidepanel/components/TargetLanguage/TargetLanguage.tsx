import React from 'react';

import type { Language } from '@lib/types';

import { useDropdown } from '@hooks/useDropdown';
import { languageCodeMapper } from '@lib/utils/mapper.utils';
import { useOrganizationLanguages } from '@stores/organization.store';
import { useUserStore } from '@stores/user.store';
import { ChevronDownIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface TargetLanguageProps {
	onChange: (language: Language) => void;
	value?: Language;
	disabled?: boolean;
	label?: string;
	ariaLabel?: string;
	error?: string;
}

const TargetLanguage: React.FC<TargetLanguageProps> = props => {
	const { onChange, value, disabled = false, label = 'Learning Language', ariaLabel, error } = props;

	const { user } = useUserStore();
	const availableLanguages = useOrganizationLanguages();
	const defaultTargetLanguage = user?.preferences?.defaultTarget;

	const [selected, setSelected] = useState<Language>(() => {
		if (value && availableLanguages.includes(value)) {
			return value;
		}

		if (defaultTargetLanguage && availableLanguages.includes(defaultTargetLanguage)) {
			return defaultTargetLanguage;
		}

		return availableLanguages[0] ?? 'en';
	});

	const { isOpen, dropdownRef, buttonRef, optionRefs, handleToggle, handleKeyDown, closeDropdown } = useDropdown({
		disabled,
	});

	useEffect(() => {
		optionRefs.current = optionRefs.current.slice(0, availableLanguages.length);
	}, [optionRefs, availableLanguages.length]);

	useEffect(() => {
		if (value !== undefined && availableLanguages.includes(value)) {
			setSelected(value);
		}
	}, [value, availableLanguages]);

	useEffect(() => {
		if (!value && defaultTargetLanguage && availableLanguages.includes(defaultTargetLanguage)) {
			setSelected(defaultTargetLanguage);
			onChange(defaultTargetLanguage);
		}
	}, [defaultTargetLanguage, availableLanguages, value, onChange]);

	const onSelect = useCallback(
		(language: Language) => {
			if (availableLanguages.includes(language)) {
				setSelected(language);
				onChange(language);
			} else {
				console.warn(`Language '${language}' is not available for this organization`);
			}
		},
		[availableLanguages, onChange],
	);

	const handleOptionKeyDown = useCallback(
		(e: React.KeyboardEvent, index: number) => {
			if (e.key === 'Enter' || e.key === ' ') {
				if (availableLanguages[index]) {
					onSelect(availableLanguages[index]);
					closeDropdown();
					e.preventDefault();
				}
			} else {
				handleKeyDown(e, index);
			}
		},
		[availableLanguages, onSelect, closeDropdown, handleKeyDown],
	);

	const handleOptionClick = useCallback(
		(language: Language) => {
			if (availableLanguages.includes(language)) {
				onSelect(language);
				closeDropdown();
			}
		},
		[availableLanguages, onSelect, closeDropdown],
	);

	const selectedIndex = availableLanguages.findIndex(lang => lang === selected);

	if (availableLanguages.length === 0) {
		return (
			<div className="w-full">
				<div className="p-3 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg">
					No languages available
				</div>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="flex justify-between items-center mb-3">
				<label id="target-language-label" className="text-sm font-medium">
					{label}
				</label>
			</div>
			<div className="relative" ref={dropdownRef}>
				<button
					ref={buttonRef}
					className={`w-full flex items-center justify-between p-2.5 border rounded-lg bg-primary-50/50 transition duration-150 ${
						error ? 'border-red-500 focus:border-red-500' : 'border-primary-700 focus:border-primary-900'
					} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-100'}`}
					onClick={handleToggle}
					onKeyDown={e => !disabled && handleKeyDown(e)}
					disabled={disabled}
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					aria-labelledby="target-language-label"
					aria-controls="language-options-list"
					aria-label={ariaLabel || `Select ${label.toLowerCase()}`}
					aria-describedby="target-language-description"
					aria-invalid={!!error}
				>
					<span>{languageCodeMapper(selected)}</span>
					<ChevronDownIcon size={18} />
				</button>
				<div id="target-language-description" className="sr-only">
					{`Currently selected: ${languageCodeMapper(selected)}. Press Enter or Space to open options.`}
				</div>
				{error && (
					<div className="text-red-600 text-sm mt-1" role="alert">
						{error}
					</div>
				)}
				{isOpen && !disabled && (
					<ul
						id="language-options-list"
						className="absolute z-10 w-full mt-1 bg-primary-50 border border-primary-700 rounded-lg shadow-lg max-h-32 overflow-y-auto"
						role="listbox"
						aria-labelledby="target-language-label"
						aria-activedescendant={selectedIndex >= 0 ? `language-option-${selectedIndex}` : undefined}
					>
						{availableLanguages.map((language, index) => (
							<li
								ref={el => {
									optionRefs.current[index] = el;
								}}
								id={`language-option-${index}`}
								key={language}
								className={`p-2.5 hover:bg-primary-100 cursor-pointer ${selected === language ? 'bg-primary-100 text-primary-700' : ''}`}
								onClick={() => handleOptionClick(language)}
								onKeyDown={e => handleOptionKeyDown(e, index)}
								role="option"
								aria-selected={selected === language}
								tabIndex={0}
							>
								{languageCodeMapper(language)}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default TargetLanguage;
