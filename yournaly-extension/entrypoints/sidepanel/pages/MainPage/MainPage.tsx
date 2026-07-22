import React from 'react';

import { useLanguageSync } from '@lib/hooks/useLanguageSync';
import { useJournalStore } from '@stores/journal.store';
import { useInkBalance, useUserStore } from '@stores/user.store';
import { AlertTriangleIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import ControlPanel from '@components/ControlPanel/ControlPanel';
import TextSection from '@components/TextSection/TextSection';

import PageWrapper from '@components/common/PageWrapper/PageWrapper';
import Toast from '@components/common/Toast/Toast';

const MainPage: React.FC = () => {
	const { t } = useTranslation();

	const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);
	const [showComparison, setShowComparison] = useState<boolean>(false);
	const [showToast, setShowToast] = useState<boolean>(false);

	const navigate = useNavigate();

	useLanguageSync();

	const {
		// Form state
		id,
		originalText,
		improveReadability,
		advancedOptions,
		language,
		setOriginalText,
		setTone,
		setImproveReadability,
		setAdvancedOptions,
		setLanguage,

		// Review state
		isReviewing,
		reviewedText,
		reviewError,
		reviewJournal,
		clearForm,
		getEstimatedInks,
	} = useJournalStore();

	const { user } = useUserStore();

	const inkBalance = useInkBalance();
	const estimatedInks = getEstimatedInks();

	const handleCopyReviewedText = useCallback(async () => {
		if (!reviewedText) return;
		try {
			await navigator.clipboard.writeText(reviewedText);
			setShowToast(true);
		} catch (error) {
			console.error('Failed to copy text:', error);
		}
	}, [reviewedText]);

	const handleToggleAdvanced = useCallback(() => {
		setShowAdvancedOptions(prev => !prev);
	}, []);

	const handleToggleComparison = useCallback(() => {
		setShowComparison(prev => !prev);
	}, []);

	const handleCloseToast = useCallback(() => {
		setShowToast(false);
	}, []);

	const handleReviewSummary = useCallback(() => {
		if (!id) {
			return;
		}

		navigate(`/journals/${id}`);
	}, [id, navigate]);

	const handleNewEntry = useCallback(() => {
		clearForm();
		setShowAdvancedOptions(false);
		setShowComparison(false);
	}, [clearForm]);

	const hasEnoughInks = inkBalance >= estimatedInks;
	const isFormValid = originalText.trim().length > 0 && hasEnoughInks;

	return (
		<>
			{showToast && (
				<Toast message={t('components.toast.copiedText')} type="success" onClose={handleCloseToast} />
			)}
			<PageWrapper
				title={t('pages.mainPage.title', { name: user?.firstName || '' })}
				subtitle={t('pages.mainPage.description')}
			>
				<div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start lg:space-y-0">
					<section className="lg:col-span-2 lg:border lg:border-transparent lg:flex lg:flex-col lg:h-full mb-4 lg:mb-0">
						<TextSection
							originalText={originalText}
							reviewedText={reviewedText}
							isReviewing={isReviewing}
							showComparison={showComparison}
							error={reviewError ?? undefined}
							onOriginalChange={setOriginalText}
							onToggleComparison={handleToggleComparison}
							onCopyReviewed={handleCopyReviewedText}
						/>
					</section>

					<ControlPanel
						isReviewing={isReviewing}
						reviewedText={reviewedText}
						showComparison={showComparison}
						showAdvancedOptions={showAdvancedOptions}
						improveReadability={improveReadability}
						estimatedInks={estimatedInks}
						errors={reviewError}
						tone={user?.preferences.defaultTone ?? 'original'}
						advancedOptions={advancedOptions}
						targetLanguage={language}
						isFormValid={isFormValid}
						onToggleAdvanced={handleToggleAdvanced}
						onToneChange={setTone}
						onImproveReadabilityChange={setImproveReadability}
						onAdvancedOptionsChange={setAdvancedOptions}
						onTargetLanguageChange={setLanguage}
						onReview={reviewJournal}
						onToggleComparison={handleToggleComparison}
						onCopyReviewed={handleCopyReviewedText}
						onReviewSummary={handleReviewSummary}
						onNewEntry={handleNewEntry}
					/>
				</div>

				<div className="space-y-4 mt-4">
					{reviewError && (
						<div
							className="bg-red-100/50 border border-red-300 rounded-lg p-4 flex items-center"
							role="alert"
						>
							<div className="flex items-center justify-center w-10 h-10 bg-red-200 rounded-full mr-3">
								<AlertTriangleIcon className="w-5 h-5 text-red-800" />
							</div>
							<p className="text-red-800 text-sm font-semibold flex-1">{reviewError}</p>
						</div>
					)}

					{!hasEnoughInks && originalText.trim().length > 0 && (
						<div
							className="bg-secondary-50/50 border border-secondary-200 rounded-lg p-4 flex items-center"
							role="status"
						>
							<div className="flex items-center justify-center w-10 h-10 bg-secondary-100 rounded-full mr-3">
								<AlertTriangleIcon className="w-5 h-5 text-secondary-800" />
							</div>
							<p className="text-secondary-800 text-sm font-semibold flex-1">
								<Trans
									i18nKey="pages.mainPage.notEnoughInks"
									values={{ required: estimatedInks, available: inkBalance }}
									components={{
										link: <Link to="/purchase" className="text-secondary-800 underline" />,
									}}
								/>
							</p>
						</div>
					)}
				</div>
			</PageWrapper>
		</>
	);
};

export default MainPage;
