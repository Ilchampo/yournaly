import React from 'react';

import type { JournalReviewDetail } from '@interfaces/journal.interface';

import { languageCodeMapper, textLengthMapper, toneCodeMapper } from '@utils/mapper.utils';
import { useTranslation } from 'react-i18next';

import ParamCard from '@components/ParamCard/ParamCard';

interface ReviewParamsProps {
	journal: JournalReviewDetail;
}

const ReviewParams: React.FC<ReviewParamsProps> = props => {
	const { journal } = props;

	const { t } = useTranslation();

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-2">
			<ParamCard
				param={t('common.params.targetLanguage')}
				value={languageCodeMapper(journal.parameters.targetLanguage)}
			/>
			<ParamCard
				param={t('common.params.language')}
				value={languageCodeMapper(journal.parameters.reviewLanguage)}
			/>
			<ParamCard
				param={t('common.params.improveReadability')}
				value={journal.parameters.improveReadability ? 'Yes' : 'No'}
			/>
			<ParamCard param={t('common.params.inksUsed')} value={journal.inksUsed.toString()} />
			<ParamCard param={t('common.params.tone')} value={toneCodeMapper(journal.tone)} />
			<ParamCard
				param={t('common.params.advancedParams.textLength')}
				value={textLengthMapper(journal.parameters.advancedOptions?.textLength ?? 'none')}
			/>
			<ParamCard
				param={t('common.params.advancedParams.minCharacters')}
				value={journal.parameters.advancedOptions?.minCharacters?.toString() ?? t('common.params.none')}
			/>
			<ParamCard
				param={t('common.params.advancedParams.maxCharacters')}
				value={journal.parameters.advancedOptions?.maxCharacters?.toString() ?? t('common.params.none')}
			/>
		</div>
	);
};

export default ReviewParams;
