import React from 'react';

import { useOrganizationBusinessPlan } from '@stores/organization.store';
import { useTranslation } from 'react-i18next';

interface InkUsageProps {
	estimatedInks: number;
}

const InkUsage: React.FC<InkUsageProps> = props => {
	const { estimatedInks } = props;
	const { t } = useTranslation();

	const businessPlan = useOrganizationBusinessPlan();

	return businessPlan === 'B2C' ? (
		<div className="bg-secondary-500/30 border border-secondary-600 rounded-md py-3 px-4 flex items-center justify-between">
			<div className="text-sm font-medium">{t('components.controlPanel.estimatedInks')}</div>
			<div className="font-semibold">{estimatedInks} Inks</div>
		</div>
	) : null;
};

export default InkUsage;
