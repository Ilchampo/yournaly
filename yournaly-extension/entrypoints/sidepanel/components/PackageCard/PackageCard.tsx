import React from 'react';

import type { InkPackage } from '@interfaces/ink.interface';

import { useTranslation } from 'react-i18next';

interface PackageCardProps {
	inkPackage: InkPackage;
	onClick: (packageId: string) => void;
	isSelected: boolean;
}

export const PackageCard: React.FC<PackageCardProps> = props => {
	const { inkPackage, onClick, isSelected } = props;

	const { t } = useTranslation();

	return (
		<div
			className={`border cursor-pointer rounded-xl p-4 transition-all duration-200 ${isSelected ? 'border-primary-300 bg-surface-100/50 shadow-md' : 'border-primary-700 hover:border-primary-300 hover:shadow-sm'} ${inkPackage.isRecommended ? 'relative' : ''}`}
			onClick={() => onClick(inkPackage.id)}
		>
			{inkPackage.isRecommended && (
				<div className="absolute -top-3 right-4 bg-secondary-500 text-secondary-50 text-xs px-2 py-1 rounded-full">
					{t('components.packageCard.recommended')}
				</div>
			)}
			<div className="flex justify-between items-start">
				<div>
					<h3 className="font-medium text-primary-900 text-lg">
						{inkPackage.inksToAdd} {t('common.misc.inks')}
					</h3>
					<p className="text-sm text-primary-700 mt-1">{t(inkPackage.title)}</p>
				</div>
				<div className="text-lg font-semibold text-primary-900">${inkPackage.price}</div>
			</div>
			<div className="mt-3">
				<p className="text-sm text-primary-700">{t(inkPackage.description)}</p>
			</div>
			<div className="mt-3 flex items-center">
				<div
					className={`w-5 h-5 rounded-full border ${isSelected ? 'border-secondary-600 bg-secondary-600' : 'border-primary-300'} flex items-center justify-center mr-2`}
				>
					{isSelected && <div className="w-2 h-2 rounded-full bg-surface-50"></div>}
				</div>
				<span className="text-sm font-medium text-primary-700">
					{isSelected ? t('components.packageCard.selected') : t('components.packageCard.select')}
				</span>
			</div>
		</div>
	);
};

export default PackageCard;
