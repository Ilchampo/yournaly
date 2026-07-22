import React from 'react';

import type { JournalAdvancedOptions } from '@interfaces/journal.interface';

import { useOrganizationMaxCharacters } from '@stores/organization.store';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AdvancedOptionsProps {
	disabled: boolean;
	onChange: (options: JournalAdvancedOptions) => void;
	value?: JournalAdvancedOptions;
}

export const AdvancedOptions: React.FC<AdvancedOptionsProps> = props => {
	const { disabled, onChange, value } = props;
	const { t } = useTranslation();

	const [options, setOptions] = useState<JournalAdvancedOptions>(
		() =>
			value ?? {
				textLength: 'none',
				minCharacters: null,
				maxCharacters: null,
			},
	);

	const maxCharacters = useOrganizationMaxCharacters();

	useEffect(() => {
		if (value !== undefined) {
			setOptions(value);
		}
	}, [value]);

	const handleChange = (option: keyof JournalAdvancedOptions, newValue: string | number | null) => {
		const updatedOptions = { ...options, [option]: newValue };

		setOptions(updatedOptions);
		onChange(updatedOptions);
	};

	const handleTextLengthChange = (newValue: 'shorten' | 'extend' | 'none') => {
		const updatedOptions = { ...options, textLength: newValue };

		setOptions(updatedOptions);
		onChange(updatedOptions);
	};

	return (
		<div className="mt-3 p-3 bg-primary-50/50 rounded-lg border border-primary-700">
			<div className="mb-3">
				<label className="text-sm font-medium block mb-1">{t('common.params.advancedParams.textLength')}</label>
				<div className="flex space-x-2">
					<button
						className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
							options.textLength === 'shorten'
								? 'bg-secondary-300/50 text-secondary-700 border border-secondary-300'
								: 'bg-primary-100 border border-primary-700 hover:bg-secondary-50'
						} disabled:opacity-50 disabled:cursor-not-allowed`}
						onClick={() => handleTextLengthChange(options.textLength === 'shorten' ? 'none' : 'shorten')}
						disabled={disabled}
						type="button"
						aria-label="Shorten"
						aria-pressed={options.textLength === 'shorten'}
					>
						{t('common.params.advancedParams.textShorten')}
					</button>
					<button
						className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
							options.textLength === 'extend'
								? 'bg-secondary-300/50 text-secondary-700 border border-secondary-300'
								: 'bg-primary-100 border border-primary-700 hover:bg-secondary-50'
						} disabled:opacity-50 disabled:cursor-not-allowed`}
						onClick={() => handleTextLengthChange(options.textLength === 'extend' ? 'none' : 'extend')}
						disabled={disabled}
						type="button"
						aria-label="Extend"
						aria-pressed={options.textLength === 'extend'}
					>
						{t('common.params.advancedParams.textExtend')}
					</button>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-3">
				<div>
					<label className="text-sm font-medium block mb-1">
						{t('common.params.advancedParams.minCharacters')}
					</label>
					<input
						type="number"
						min="0"
						className="w-full p-2 border border-primary-700 rounded-md focus:ring-2 focus:ring-primary-400 focus:border-primary-400 disabled:bg-gray-100 disabled:text-gray-500"
						value={options.minCharacters ?? ''}
						onChange={e => handleChange('minCharacters', e.target.value ? Number(e.target.value) : null)}
						placeholder="Min"
						disabled={disabled}
						aria-label="Minimum characters"
					/>
				</div>
				<div>
					<label className="text-sm font-medium text-gray-700 block mb-1">
						{t('common.params.advancedParams.maxCharacters')}
					</label>
					<input
						type="number"
						min="0"
						max={maxCharacters}
						className="w-full p-2 border border-primary-700 rounded-md focus:ring-2 focus:ring-primary-400 focus:border-primary-400 disabled:bg-gray-100 disabled:text-gray-500"
						value={options.maxCharacters ?? ''}
						onChange={e => handleChange('maxCharacters', e.target.value ? Number(e.target.value) : null)}
						placeholder="Max"
						disabled={disabled}
						aria-label="Maximum characters"
					/>
				</div>
			</div>
		</div>
	);
};

export default AdvancedOptions;
