import React from 'react';

import type { JournalSummaryCard as JournalSummaryCardType } from '@interfaces/journal.interface';

import { formatDateToReadable } from '@lib/utils/string.utils';
import { ArrowLeftIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import ScoreStar from '@components/common/ScoreStar/ScoreStar';
import ToneBadge from '@components/common/ToneBadge/ToneBadge';

interface JournalSummaryCardProps {
	journal: JournalSummaryCardType;
}

const MAX_TITLE_LENGTH = 30;

const JournalSummaryCard: React.FC<JournalSummaryCardProps> = props => {
	const { journal } = props;

	const { t } = useTranslation();

	const reduceTitle = (title: string) =>
		title.length > MAX_TITLE_LENGTH ? title.slice(0, MAX_TITLE_LENGTH) + '...' : title;

	const getReadableDate = (date: string) => {
		if (date.includes('common.dates.daysAgo')) {
			return t('common.dates.daysAgo', { number: date.split(' ')[0] });
		}

		if (date.includes('common.dates.today')) {
			return date.replace('common.dates.today', t('common.dates.today'));
		}

		if (date.includes('common.dates.yesterday')) {
			return date.replace('common.dates.yesterday', t('common.dates.yesterday'));
		}

		return t(date);
	};

	return (
		<Link
			to={`/journals/${journal.id}`}
			className="flex flex-col p-4 bg-primary-50/50 border border-primary-700 rounded-xl hover:border-primary-500 transition-all duration-200 hover:shadow-md relative max-w-full w-full box-border"
		>
			<ScoreStar score={journal.score} />
			<div className="mb-2">
				<h3 className="font-medium mb-1 text-lg w-full">{reduceTitle(journal.title)}</h3>
				<div className="text-xs line-clamp-2 mb-2">{journal.description}</div>
			</div>
			<div className="flex flex-col flex-1 justify-end gap-2">
				<div className="flex justify-between items-center">
					<ToneBadge tone={journal.tone} />
					<div className="text-xs">{journal.inksUsed} Inks</div>
				</div>
				<div className="flex items-center text-xs pt-1 border-t border-primary-100">
					<ArrowLeftIcon size={12} className="mr-1" />
					{getReadableDate(formatDateToReadable(journal.date))}
				</div>
			</div>
		</Link>
	);
};

export default JournalSummaryCard;
