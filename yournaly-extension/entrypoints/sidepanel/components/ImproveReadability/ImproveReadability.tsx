import React from 'react';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ImproveReadabilityProps {
	disabled: boolean;
	onChange: (value: boolean) => void;
	value?: boolean;
}

const ImproveReadability: React.FC<ImproveReadabilityProps> = props => {
	const { disabled, onChange, value } = props;
	const { t } = useTranslation();

	const [improveReadability, setImproveReadability] = useState<boolean>(value ?? false);

	useEffect(() => {
		if (value !== undefined) {
			setImproveReadability(value);
		}
	}, [value]);

	const onToggleReadability = () => {
		if (!disabled) {
			const newValue = !improveReadability;

			setImproveReadability(newValue);
			onChange(newValue);
		}
	};

	return (
		<div className="flex items-center">
			<span className="text-sm mr-2">{t('common.params.improveReadability')}</span>
			<button
				className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${improveReadability ? 'bg-primary-600' : 'bg-primary-300'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
				onClick={onToggleReadability}
				disabled={disabled}
				aria-pressed={improveReadability}
				aria-label="Toggle improve readability"
				type="button"
			>
				<span
					className={`inline-block h-4 w-4 transform rounded-full bg-primary-50 transition-transform ${improveReadability ? 'translate-x-6' : 'translate-x-1'}`}
				/>
			</button>
		</div>
	);
};

export default ImproveReadability;
