import React from 'react';

import type { JournalInsight } from '@interfaces/journal.interface';

import { mistakeTypeMapper } from '@utils/mapper.utils';
import { useTranslation } from 'react-i18next';

interface InsightCardProps {
	insight: JournalInsight;
}

const InsightCard: React.FC<InsightCardProps> = props => {
	const { insight } = props;

	const { t } = useTranslation();

	return (
		<div className="bg-surface-50 rounded-lg border border-primary-700 overflow-hidden">
			<div className="bg-surface-100 px-3 py-1.5 border-b border-surface-500">
				<div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2">
					<span className="text-xs font-medium bg-surface-200 border border-surface-300 px-2 py-0.5 rounded-full">
						{mistakeTypeMapper(insight.mistakeType)}
					</span>
					<h4 className="text-sm font-medium">{insight.mistakeTitle}</h4>
				</div>
			</div>
			<div className="p-3 space-y-2">
				<div>
					<div className="text-xs font-medium text-primary-500 mb-1">
						{t('pages.yournalSummaryPage.insights.original')}:
					</div>
					<div className="text-sm bg-primary-50 p-1.5 rounded border border-primary-500">
						"{insight.originalMistake}"
					</div>
				</div>
				<div>
					<div className="text-xs font-medium text-primary-500 mb-1">
						{t('pages.yournalSummaryPage.insights.suggestion')}:
					</div>
					<div className="text-sm bg-primary-50 p-1.5 rounded border border-primary-500">
						"{insight.mistakeCorrection}"
					</div>
				</div>
				<div>
					<div className="text-xs font-medium text-primary-500 mb-1">
						{t('pages.yournalSummaryPage.insights.explanation')}:
					</div>
					<div className="text-sm">{insight.mistakeExplanation}</div>
				</div>
			</div>
		</div>
	);
};

export default InsightCard;
