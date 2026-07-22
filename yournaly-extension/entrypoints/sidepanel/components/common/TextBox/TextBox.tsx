import React from 'react';

import { DEBOUNCE_DELAYS } from '@constants/performance.constants';
import { useDebouncedCallback } from '@hooks/useDebounce';
import { useOrganizationMaxCharacters } from '@stores/organization.store';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface TextBoxProps {
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	disabled?: boolean;
	label?: string;
	className?: string;
	showMaxLength?: boolean;
	error?: string;
	ariaLabel?: string;
}

const TextBox: React.FC<TextBoxProps> = props => {
	const { t } = useTranslation();
	const {
		value,
		onChange,
		placeholder,
		disabled = false,
		label,
		className = '',
		showMaxLength = true,
		error,
		ariaLabel,
	} = props;
	const [localValue, setLocalValue] = useState<string>(value);

	const debouncedOnChange = useDebouncedCallback(onChange, DEBOUNCE_DELAYS.TEXT_INPUT);
	const maxLength = useOrganizationMaxCharacters();

	React.useEffect(() => {
		setLocalValue(value);
	}, [value]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const newValue = e.target.value;

			if (newValue.length <= maxLength) {
				setLocalValue(newValue);
				debouncedOnChange(newValue);
			}
		},
		[maxLength, debouncedOnChange],
	);

	const characterCount = localValue.length;
	const isNearLimit = characterCount > maxLength * 0.9;
	const isAtLimit = characterCount >= maxLength;

	const displayLabel = label ?? t('components.textBox.states.before.title');

	return (
		<div className={`w-full ${className}`}>
			<div className="flex items-center justify-between mb-2">
				<h2 className="text-base font-medium">{displayLabel}</h2>
				<span className={`text-sm ${isNearLimit ? 'text-orange-600' : ''} ${isAtLimit ? 'text-red-600' : ''}`}>
					{showMaxLength ? `${characterCount}/${maxLength}` : `${characterCount}`}{' '}
					{t('components.textBox.characters')}
				</span>
			</div>

			<textarea
				className={`block w-full h-64 md:h-86 lg:h-[450px] p-3 border rounded-lg focus:ring-2 focus:ring-primary-400 resize-none transition duration-200 ease-in-out disabled:bg-primary-50  ${
					error
						? 'border-red-500 focus:border-red-500 focus:ring-red-400'
						: 'border-primary-700 focus:border-primary-900'
				}`}
				value={localValue}
				onChange={handleChange}
				placeholder={placeholder}
				disabled={disabled}
				maxLength={maxLength}
				aria-label={ariaLabel ?? displayLabel}
				aria-describedby={error ? 'textbox-error' : undefined}
				aria-invalid={!!error}
			/>
			{error && (
				<div id="textbox-error" className="text-red-600 text-sm mt-1" role="alert">
					{error}
				</div>
			)}
		</div>
	);
};

export default React.memo(TextBox);
