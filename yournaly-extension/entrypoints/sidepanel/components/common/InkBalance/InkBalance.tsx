import React from 'react';

import { useOrganizationBusinessPlan } from '@stores/organization.store';
import { useUserStore } from '@stores/user.store';
import { PencilIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const InkBalance: React.FC = () => {
	const { user } = useUserStore();
	const { t } = useTranslation();
	const businessPlan = useOrganizationBusinessPlan();

	return businessPlan === 'B2C' ? (
		<Link
			to="/purchase"
			className="bg-secondary-300/50 border border-primary-700 backdrop-blur-sm rounded-full px-3 py-1 text-sm hover:bg-secondary-200/50 transition-all flex items-center"
		>
			<span className="mr-1">
				{user?.inksBalance ?? 0} {t('common.misc.inks')}
			</span>
			<PencilIcon size={14} />
		</Link>
	) : null;
};

export default InkBalance;
