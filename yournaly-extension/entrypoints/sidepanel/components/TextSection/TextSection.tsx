import React from 'react';

import { CopyIcon, SplitIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import TextBox from '@components/common/TextBox/TextBox';

interface TextSectionProps {
	originalText: string;
	reviewedText: string | null;
	isReviewing: boolean;
	showComparison: boolean;
	error?: string;
	onOriginalChange: (text: string) => void;
	onToggleComparison: VoidFunction;
	onCopyReviewed: VoidFunction;
	showActions?: boolean;
}

const TextSection: React.FC<TextSectionProps> = props => {
	const { t } = useTranslation();
	const {
		originalText,
		reviewedText,
		isReviewing,
		showComparison,
		error,
		onOriginalChange,
		onToggleComparison,
		onCopyReviewed,
		showActions = true,
	} = props;

	return (
		<div className="flex flex-col h-full gap-4">
			{(!reviewedText || (reviewedText && showComparison)) && (
				<TextBox
					value={originalText}
					onChange={onOriginalChange}
					placeholder={t('components.textBox.states.before.placeholder')}
					label={t('components.textBox.states.before.title')}
					disabled={isReviewing || !!reviewedText}
					error={error}
					showMaxLength={!showComparison}
				/>
			)}

			{reviewedText && (
				<div className="flex flex-col flex-1">
					<TextBox
						value={reviewedText}
						onChange={() => undefined}
						placeholder=""
						label={t('components.textBox.states.after.title')}
						disabled
						showMaxLength={false}
					/>
					{showActions && (
						<div className="flex items-center justify-between lg:hidden mb-4 lg:mb-0">
							<button
								className="flex items-center justify-center gap-2 hover:text-primary-600 transition-colors p-2 rounded-lg"
								onClick={onToggleComparison}
								aria-label={t('components.textBox.actions.compare')}
							>
								<SplitIcon className="w-5 h-5" />
								<span>
									{showComparison
										? t('components.textBox.actions.hide')
										: t('components.textBox.actions.compare')}
								</span>
							</button>
							<button
								className="flex items-center justify-center gap-2 hover:text-primary-600 transition-colors p-2 rounded-lg"
								onClick={onCopyReviewed}
								aria-label={t('components.textBox.actions.copy')}
							>
								<CopyIcon className="w-5 h-5" />
								<span>{t('components.textBox.actions.copy')}</span>
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default React.memo(TextSection);
