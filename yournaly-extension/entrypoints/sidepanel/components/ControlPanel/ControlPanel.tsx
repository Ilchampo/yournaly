import React from 'react';

import type { JournalAdvancedOptions } from '@interfaces/journal.interface';
import type { JournalTone, Language } from '@lib/types';

import { CopyIcon, EyeIcon, PencilIcon, RotateCcwIcon, SplitIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import AdvancedOptions from '@components/AdvancedOptions/AdvancedOptions';
import ActionButton from '@components/common/ActionButton/ActionButton';
import InkUsage from '@components/InkUsage/InkUsage';
import TargetLanguage from '@components/TargetLanguage/TargetLanguage';
import ToneSelector from '@components/ToneSelector/ToneSelector';

interface ControlPanelProps {
	isReviewing: boolean;
	reviewedText: string | null;
	showComparison: boolean;
	showAdvancedOptions: boolean;
	improveReadability: boolean;
	estimatedInks: number;
	errors?: string | null;
	tone: JournalTone;
	advancedOptions: JournalAdvancedOptions;
	targetLanguage: Language;
	isFormValid: boolean;

	/* Handlers */
	onToggleAdvanced: VoidFunction;
	onToneChange: (tone: JournalTone) => void;
	onImproveReadabilityChange: (value: boolean) => void;
	onAdvancedOptionsChange: (options: JournalAdvancedOptions) => void;
	onTargetLanguageChange: (language: Language) => void;
	onReview: VoidFunction;
	onToggleComparison: VoidFunction;
	onCopyReviewed: VoidFunction;
	onReviewSummary: VoidFunction;
	onNewEntry: VoidFunction;
}

const ControlPanel: React.FC<ControlPanelProps> = props => {
	const { t } = useTranslation();
	const {
		isReviewing,
		reviewedText,
		showComparison,
		showAdvancedOptions,
		improveReadability,
		estimatedInks,
		errors,
		tone,
		advancedOptions,
		targetLanguage,
		isFormValid,
		onToggleAdvanced,
		onToneChange,
		onImproveReadabilityChange,
		onAdvancedOptionsChange,
		onTargetLanguageChange,
		onReview,
		onToggleComparison,
		onCopyReviewed,
		onReviewSummary,
		onNewEntry,
	} = props;

	return (
		<aside
			className="lg:col-span-1 lg:flex lg:h-full lg:flex-col border border-primary-700 p-4 rounded-lg bg-primary-50/50 shadow-md"
			aria-label={t('journal.journalOptions')}
		>
			<div className="space-y-4 lg:flex-1">
				<ToneSelector
					onChange={onToneChange}
					value={tone}
					disabled={isReviewing || !!reviewedText}
					error={errors || undefined}
					improveReadability={improveReadability}
					onImproveReadabilityChange={onImproveReadabilityChange}
					label={t('common.params.tone')}
				/>

				<TargetLanguage
					onChange={onTargetLanguageChange}
					value={targetLanguage}
					label={t('common.params.targetLanguage')}
				/>

				<button
					onClick={onToggleAdvanced}
					className="text-sm text-primary-700 hover:text-primary-900 flex items-center disabled:opacity-50"
					type="button"
					aria-label={t('journal.toggleAdvancedOptions')}
					disabled={isReviewing}
				>
					{showAdvancedOptions
						? t('components.controlPanel.hideAdvanced')
						: t('components.controlPanel.showAdvanced')}
				</button>

				{showAdvancedOptions && (
					<AdvancedOptions
						onChange={onAdvancedOptionsChange}
						value={advancedOptions}
						disabled={isReviewing || !!reviewedText}
					/>
				)}

				<InkUsage estimatedInks={estimatedInks} />

				{!reviewedText && (
					<>
						<hr className="my-4 border-primary-700" />
						<ActionButton
							onClick={onReview}
							ariaLabel={t('mainPage.reviewJournal')}
							primary
							disabled={!isFormValid || isReviewing}
							loading={isReviewing}
						>
							<PencilIcon className="w-5 h-5 mr-2" />
							<span>
								{isReviewing
									? t('common.states.processing')
									: t('components.controlPanel.actions.review')}
							</span>
						</ActionButton>
					</>
				)}

				{reviewedText && (
					<>
						<div className="w-full items-center gap-2 hidden lg:flex">
							<button
								className="flex w-full items-center justify-center gap-2 hover:text-primary-600 transition-colors p-2 rounded-lg border border-primary-700"
								onClick={onToggleComparison}
								type="button"
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
								className="flex w-full items-center justify-center gap-2 hover:text-primary-600 transition-colors p-2 rounded-lg border border-primary-700"
								onClick={onCopyReviewed}
								type="button"
								aria-label={t('components.textBox.actions.copy')}
							>
								<CopyIcon className="w-5 h-5" />
								<span>{t('components.textBox.actions.copy')}</span>
							</button>
						</div>

						<hr className="my-4 border-primary-700" />

						<div
							className="flex flex-col md:flex-row items-center lg:flex-col gap-2"
							aria-label={t('journal.journalActions')}
						>
							<ActionButton onClick={onReviewSummary} ariaLabel={t('mainPage.viewReviewSummary')} primary>
								<EyeIcon className="w-5 h-5 mr-2" />
								<span>{t('components.controlPanel.actions.summary')}</span>
							</ActionButton>
							<ActionButton
								onClick={onNewEntry}
								ariaLabel={t('components.controlPanel.actions.newEntry')}
								primary={false}
							>
								<RotateCcwIcon className="w-5 h-5 mr-2" />
								<span>{t('components.controlPanel.actions.newEntry')}</span>
							</ActionButton>
						</div>
					</>
				)}
			</div>
		</aside>
	);
};

export default React.memo(ControlPanel);
