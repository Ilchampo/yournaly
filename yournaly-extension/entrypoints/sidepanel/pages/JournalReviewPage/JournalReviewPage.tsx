import React from 'react';

import type { JournalReviewDetail } from '@interfaces/journal.interface';

import { JournalAPIService } from '@services/journalApi.service';
import { useJournalStore } from '@stores/journal.store';
import { formatDateToReadable } from '@utils/string.utils';
import { AlertTriangleIcon, CheckIcon, PenBoxIcon, Trash2, XIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import ActionButton from '@components/common/ActionButton/ActionButton';
import Collapsable from '@components/common/Collapsable/Collapsable';
import Modal from '@components/common/Modal/Modal';
import PageLoader from '@components/common/PageLoader/PageLoader';
import PageWrapper from '@components/common/PageWrapper/PageWrapper';
import ScoreStar from '@components/common/ScoreStar/ScoreStar';
import InsightCard from '@components/InsightCard/InsightCard';
import ReviewParams from '@components/ReviewParams/ReviewParams';
import TextSection from '@components/TextSection/TextSection';

const JournalReviewPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	const { t } = useTranslation();

	const navigate = useNavigate();

	const { deleteJournal, isDeleting, updateJournalTitle, isUpdatingTitle } = useJournalStore();

	const [journal, setJournal] = useState<JournalReviewDetail | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [originalTitle, setOriginalTitle] = useState<string>('');

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

	const loadJournal = useCallback(async (journalId: string) => {
		try {
			setIsLoading(true);
			setError(null);

			const response = await JournalAPIService.getJournalReview({ id: journalId });
			setJournal(response.data);
			setOriginalTitle(response.data.title);
		} catch (err) {
			console.error('Failed to load journal:', err);
			setError(err instanceof Error ? err.message : 'Failed to load journal');
		} finally {
			setIsLoading(false);
		}
	}, []);

	const handleDelete = useCallback(
		async (journalId: string) => {
			try {
				setError(null);

				await deleteJournal({ id: journalId });

				navigate('/journals', { replace: true });
			} catch (err) {
				console.error('Failed to delete journal:', err);
				setError(err instanceof Error ? err.message : 'Failed to delete journal');
			}
		},
		[deleteJournal, navigate],
	);

	const handleUpdateTitle = useCallback(
		async (journalId: string, title: string) => {
			if (!journalId || !title.trim()) {
				setError('Invalid journal ID or title');
				return;
			}

			try {
				setError(null);

				const updatedTitle = await updateJournalTitle({ id: journalId, title: title.trim() });

				setJournal(prev => (prev ? { ...prev, title: updatedTitle } : null));
				setOriginalTitle(updatedTitle);
				setIsEditing(false);
			} catch (err) {
				console.error('Failed to update journal title:', err);
				setError(err instanceof Error ? err.message : 'Failed to update journal title');

				if (journal) {
					setJournal({ ...journal, title: originalTitle });
				}
			}
		},
		[updateJournalTitle, journal, originalTitle],
	);

	const handleStartEditing = useCallback(() => {
		if (journal) {
			setOriginalTitle(journal.title);
			setIsEditing(true);
		}
	}, [journal]);

	const handleCancelEditing = useCallback(() => {
		if (journal) {
			setJournal({ ...journal, title: originalTitle });
			setIsEditing(false);
		}
	}, [journal, originalTitle]);

	useEffect(() => {
		if (!id) {
			navigate('/journals', { replace: true });
			return;
		}

		loadJournal(id);
	}, [id, loadJournal, navigate]);

	return (
		<>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('common.actions.delete')}>
				<div className="space-y-5">
					<div className="text-center">
						<div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-3">
							<AlertTriangleIcon className="h-6 w-6 text-primary-700" />
						</div>
						<h2 className="text-xl font-semibold  mb-2">{t('common.actions.delete')}</h2>
						<p className=" text-sm">{t('components.modals.deleteJournal.description')}</p>
					</div>
					<div className="flex space-x-3">
						<ActionButton
							onClick={() => handleDelete(journal?.id ?? '')}
							ariaLabel={t('common.actions.confirm')}
							primary
							disabled={!journal?.id}
						>
							{t('common.actions.confirm')}
						</ActionButton>
						<ActionButton onClick={() => setIsModalOpen(false)} ariaLabel={t('common.actions.cancel')}>
							{t('common.actions.cancel')}
						</ActionButton>
					</div>
				</div>
			</Modal>

			<PageWrapper>
				{isLoading && <PageLoader message={t('common.states.loading')} />}
				{journal && (
					<div className="flex flex-col gap-4 mb-4">
						<div className="flex flex-col items-center justify-center gap-2">
							{isEditing ? (
								<div className="flex items-center gap-2">
									<input
										className="text-xl text-primary-600 font-bold text-center border-2 border-primary-300 rounded-xl p-2 bg-surface-100"
										type="text"
										value={journal.title}
										onChange={e => setJournal({ ...journal, title: e.target.value })}
										style={{ fontFamily: 'Delius Swash Caps' }}
										disabled={isUpdatingTitle}
										maxLength={100}
									/>
									<button
										onClick={() => handleUpdateTitle(journal.id, journal.title)}
										className="text-primary-300 hover:text-primary-700 transition-colors disabled:opacity-50"
										type="button"
										aria-label={t('common.actions.save')}
										disabled={isUpdatingTitle || !journal.title.trim()}
									>
										<CheckIcon className="w-6 h-6" />
									</button>
									<button
										onClick={handleCancelEditing}
										className="text-primary-300 hover:text-primary-700 transition-colors disabled:opacity-50"
										type="button"
										aria-label={t('common.actions.cancel')}
										disabled={isUpdatingTitle}
									>
										<XIcon className="w-6 h-6" />
									</button>
								</div>
							) : (
								<h2 className="text-2xl font-bold mb-4 text-center">
									{journal.title}{' '}
									<button
										onClick={handleStartEditing}
										className="text-primary-300 hover:text-primary-700 transition-colors"
										type="button"
										aria-label={t('common.actions.edit')}
									>
										<PenBoxIcon className="w-4 h-4" />
									</button>
								</h2>
							)}

							<ScoreStar
								score={journal.score}
								size="xl"
								className="flex flex-col items-center justify-center"
							/>
							<p className="text-center">{journal.feedback}</p>
							<span className="text-sm text-primary-700">
								{getReadableDate(formatDateToReadable(journal.date))}
							</span>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
							<div className="col-span-1 lg:col-span-2">
								<TextSection
									originalText={journal.originalText}
									reviewedText={journal.reviewedText}
									isReviewing={true}
									showComparison={true}
									onOriginalChange={() => undefined}
									onToggleComparison={() => undefined}
									onCopyReviewed={() => undefined}
									showActions={false}
								/>
							</div>
							<hr className="border-primary-700 lg:hidden" />
							<div className="col-span-1 lg:col-span-1 space-y-4">
								<Collapsable
									title={t('pages.yournalSummaryPage.insights.title')}
									defaultOpen={journal.insights.length > 0}
								>
									{journal.insights.length > 0 ? (
										<div className="flex flex-col gap-2">
											{journal.insights.map((insight, index) => (
												<InsightCard key={index} insight={insight} />
											))}
										</div>
									) : (
										<div className="font-medium bg-primary-50 p-2 rounded border border-primary-500">
											{t('pages.yournalSummaryPage.insights.none')}
										</div>
									)}
								</Collapsable>
								<Collapsable title={t('pages.yournalSummaryPage.params.title')}>
									<ReviewParams journal={journal} />
								</Collapsable>
								<ActionButton
									onClick={() => setIsModalOpen(true)}
									ariaLabel={t('common.actions.delete')}
									primary
									disabled={isDeleting}
								>
									<Trash2 className="w-4 h-4 mr-2" />
									{t('common.actions.delete')}
								</ActionButton>
							</div>
						</div>
					</div>
				)}
				{error && <div className="text-red-500">{error}</div>}
			</PageWrapper>
		</>
	);
};

export default JournalReviewPage;
