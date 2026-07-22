import React from 'react';

import type { JournalTone } from '@lib/types';

import { useDropdown } from '@hooks/useDropdown';
import { toneCodeMapper } from '@lib/utils/mapper.utils';
import { useOrganizationTones } from '@stores/organization.store';
import { useUserStore } from '@stores/user.store';
import { ChevronDownIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ImproveReadability from '@components/ImproveReadability/ImproveReadability';

interface ToneSelectorProps {
	disabled: boolean;
	onChange: (value: JournalTone) => void;
	value?: JournalTone;
	label?: string;
	ariaLabel?: string;
	error?: string;
	improveReadability?: boolean;
	onImproveReadabilityChange?: (value: boolean) => void;
}

export const ToneSelector: React.FC<ToneSelectorProps> = props => {
	const {
		disabled,
		onChange,
		value,
		label = 'Tone',
		ariaLabel,
		error,
		improveReadability,
		onImproveReadabilityChange,
	} = props;

	const { user } = useUserStore();
	const { t } = useTranslation();

	const availableTones = useOrganizationTones();
	const defaultTone = user?.preferences?.defaultTone;

	const [selected, setSelected] = useState<JournalTone>(() => {
		if (value && availableTones.includes(value)) {
			return value;
		}

		if (defaultTone && availableTones.includes(defaultTone)) {
			return defaultTone;
		}

		return availableTones[0] ?? 'original';
	});

	const { isOpen, dropdownRef, buttonRef, optionRefs, handleToggle, handleKeyDown, closeDropdown } = useDropdown({
		disabled,
	});

	useEffect(() => {
		optionRefs.current = optionRefs.current.slice(0, availableTones.length);
	}, [optionRefs, availableTones.length]);

	useEffect(() => {
		if (value !== undefined && availableTones.includes(value)) {
			setSelected(value);
		}
	}, [value, availableTones]);

	useEffect(() => {
		if (!value && defaultTone && availableTones.includes(defaultTone)) {
			setSelected(defaultTone);
			onChange(defaultTone);
		}
	}, [defaultTone, availableTones, value, onChange]);

	const onSelect = useCallback(
		(tone: JournalTone) => {
			if (availableTones.includes(tone)) {
				setSelected(tone);
				onChange(tone);
			} else {
				console.warn(`Tone '${tone}' is not available for this organization`);
			}
		},
		[availableTones, onChange],
	);

	const handleOptionKeyDown = useCallback(
		(e: React.KeyboardEvent, index: number) => {
			if (e.key === 'Enter' || e.key === ' ') {
				if (availableTones[index]) {
					onSelect(availableTones[index]);
					closeDropdown();
					e.preventDefault();
				}
			} else {
				handleKeyDown(e, index);
			}
		},
		[availableTones, onSelect, closeDropdown, handleKeyDown],
	);

	const handleOptionClick = useCallback(
		(tone: JournalTone) => {
			if (availableTones.includes(tone)) {
				onSelect(tone);
				closeDropdown();
			}
		},
		[availableTones, onSelect, closeDropdown],
	);

	const selectedIndex = availableTones.findIndex(tone => tone === selected);

	if (availableTones.length === 0) {
		return (
			<div className="w-full">
				<div className="flex justify-between items-center mb-3">
					<label className="text-sm font-medium">{label}</label>
					<ImproveReadability
						disabled={disabled}
						onChange={onImproveReadabilityChange ?? (() => undefined)}
						value={improveReadability}
					/>
				</div>
				<div className="p-3 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg">
					No tones available
				</div>
			</div>
		);
	}

	return (
		<div className="w-full">
			<div className="flex justify-between items-center mb-3">
				<label id="tone-selector-label" className="text-sm font-medium">
					{label}
				</label>
				<ImproveReadability
					disabled={disabled}
					onChange={onImproveReadabilityChange ?? (() => undefined)}
					value={improveReadability}
				/>
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
					aria-labelledby="tone-selector-label"
					aria-controls="tone-options-list"
					aria-label={ariaLabel || `Select ${label.toLowerCase()}`}
					aria-describedby="tone-selector-description"
					aria-invalid={!!error}
				>
					<span>{toneCodeMapper(selected)}</span>
					<ChevronDownIcon size={18} />
				</button>
				<div id="tone-selector-description" className="sr-only">
					{`Currently selected: ${toneCodeMapper(selected)}. Press Enter or Space to open options.`}
				</div>
				{error && (
					<div className="text-red-600 text-sm mt-1" role="alert">
						{error}
					</div>
				)}
				{isOpen && !disabled && (
					<ul
						id="tone-options-list"
						className="absolute z-10 w-full mt-1 bg-primary-50 border border-primary-700 rounded-lg shadow-lg max-h-32 overflow-y-auto"
						role="listbox"
						aria-labelledby="tone-selector-label"
						aria-activedescendant={selectedIndex >= 0 ? `tone-option-${selectedIndex}` : undefined}
					>
						{availableTones.map((tone, index) => (
							<li
								ref={el => {
									optionRefs.current[index] = el;
								}}
								id={`tone-option-${index}`}
								key={tone}
								className={`p-2.5 hover:bg-primary-100 cursor-pointer ${selected === tone ? 'bg-primary-100 text-primary-700' : ''}`}
								onClick={() => handleOptionClick(tone)}
								onKeyDown={e => handleOptionKeyDown(e, index)}
								role="option"
								aria-selected={selected === tone}
								tabIndex={0}
							>
								{t(toneCodeMapper(tone))}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default ToneSelector;
