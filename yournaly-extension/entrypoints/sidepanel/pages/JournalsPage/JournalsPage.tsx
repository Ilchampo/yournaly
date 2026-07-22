import React from 'react';

import type {
	JournalSummaryCard as JournalSummaryCardType,
	JournalSummaryRequestParams,
} from '@interfaces/journal.interface';
import type { SortOption } from '@lib/types';

import { useDropdown } from '@hooks/useDropdown';
import { SORT_OPTIONS } from '@lib/constants/sorting';
import { JournalAPIService } from '@services/journalApi.service';
import { ChevronDownIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PageLoader from '@components/common/PageLoader/PageLoader';
import PageWrapper from '@components/common/PageWrapper/PageWrapper';
import Paginator from '@components/common/Paginator/Paginator';
import JournalSummaryCard from '@components/JournalSummaryCard/JournalSummaryCard';

const LIMIT_PER_PAGE = 5 as const;

const JournalsPage: React.FC = () => {
	const [journals, setJournals] = useState<JournalSummaryCardType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [currentSort, setCurrentSort] = useState<SortOption>('date-newest');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalItems, setTotalItems] = useState<number>(0);

	const { isOpen, dropdownRef, buttonRef, optionRefs, handleToggle, handleKeyDown, closeDropdown } = useDropdown();
	const { t } = useTranslation();

	const loadJournals = useCallback(async (sortOption: SortOption, page: number = 1) => {
		try {
			setIsLoading(true);
			setError(null);

			const sortConfig = SORT_OPTIONS.find(option => option.value === sortOption);
			if (!sortConfig) return;

			const params: JournalSummaryRequestParams = {
				page,
				limit: LIMIT_PER_PAGE,
				sort: sortConfig.sort,
				order: sortConfig.order,
			};

			const response = await JournalAPIService.getJournalSummary(params);

			setJournals(response.data.journals);
			setTotalItems(response.data.total);
			setCurrentPage(page);
		} catch (err) {
			console.error('Failed to load journals:', err);
			setError(err instanceof Error ? err.message : 'Failed to load journals');
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadJournals(currentSort, 1);
	}, [loadJournals, currentSort]);

	useEffect(() => {
		optionRefs.current = optionRefs.current.slice(0, SORT_OPTIONS.length);
	}, [optionRefs]);

	const handleSortChange = useCallback(
		(sortOption: SortOption) => {
			setCurrentSort(sortOption);
			setCurrentPage(1);
			closeDropdown();
		},
		[closeDropdown],
	);

	const handlePageChange = useCallback(
		(page: number) => {
			loadJournals(currentSort, page);
		},
		[currentSort, loadJournals],
	);

	const handleOptionKeyDown = useCallback(
		(e: React.KeyboardEvent, index: number) => {
			if (e.key === 'Enter' || e.key === ' ') {
				if (SORT_OPTIONS[index]) {
					handleSortChange(SORT_OPTIONS[index].value);
					e.preventDefault();
				}
			} else {
				handleKeyDown(e, index);
			}
		},
		[handleSortChange, handleKeyDown],
	);

	const handleOptionClick = useCallback(
		(sortOption: SortOption) => {
			handleSortChange(sortOption);
		},
		[handleSortChange],
	);

	const currentSortConfig = SORT_OPTIONS.find(option => option.value === currentSort);
	const selectedIndex = SORT_OPTIONS.findIndex(option => option.value === currentSort);

	return (
		<PageWrapper title={t('pages.myYournalsPage.title')} subtitle={t('pages.myYournalsPage.description')}>
			{isLoading && <PageLoader message={t('common.states.loading')} />}
			<div className="mb-6">
				<div className="flex justify-end items-center mb-4">
					<div className="relative" ref={dropdownRef}>
						<button
							ref={buttonRef}
							className="flex items-center justify-between p-2.5 border rounded-lg bg-primary-50/50 transition duration-150 border-primary-700 hover:bg-primary-100 min-w-[200px]"
							onClick={handleToggle}
							onKeyDown={handleKeyDown}
							aria-haspopup="listbox"
							aria-expanded={isOpen}
							aria-label="Sort journals"
							aria-controls="sort-options-list"
						>
							<span>{t(currentSortConfig?.label ?? 'constants.sorting.dateNewest')}</span>
							<ChevronDownIcon size={18} />
						</button>
						{isOpen && (
							<ul
								id="sort-options-list"
								className="absolute z-10 w-full mt-1 bg-primary-50 border border-primary-700 rounded-lg shadow-lg max-h-64 overflow-y-auto"
								role="listbox"
								aria-label="Sort options"
								aria-activedescendant={selectedIndex >= 0 ? `sort-option-${selectedIndex}` : undefined}
							>
								{SORT_OPTIONS.map((option, index) => (
									<li
										ref={el => {
											optionRefs.current[index] = el;
										}}
										id={`sort-option-${index}`}
										key={option.value}
										className={`p-2.5 hover:bg-primary-100 cursor-pointer ${
											currentSort === option.value ? 'bg-primary-100 text-primary-700' : ''
										}`}
										onClick={() => handleOptionClick(option.value)}
										onKeyDown={e => handleOptionKeyDown(e, index)}
										role="option"
										aria-selected={currentSort === option.value}
										tabIndex={0}
									>
										{t(option.label)}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</div>

			{/* Journals List */}
			<div className="mb-6">
				{error && (
					<div className="bg-red-100/50 border border-red-300 rounded-lg p-4 mb-4" role="alert">
						<p className="text-red-800 text-sm font-semibold">{error}</p>
					</div>
				)}

				{isLoading && journals.length === 0 ? (
					<div className="text-center py-8">
						<p className="text-gray-500">{t('common.states.loading')}</p>
					</div>
				) : journals.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-500 mb-2">{t('pages.myYournalsPage.emptyTitle')}</p>
						<p className="text-sm text-gray-400">{t('pages.myYournalsPage.emptyDescription')}</p>
					</div>
				) : (
					<>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{journals.map(journal => (
								<JournalSummaryCard key={journal.id} journal={journal} />
							))}
						</div>

						{totalItems > LIMIT_PER_PAGE && (
							<div className="mt-6">
								<Paginator
									currentPage={currentPage}
									totalItems={totalItems}
									itemsPerPage={LIMIT_PER_PAGE}
									onPageChange={handlePageChange}
									disabled={isLoading}
								/>
							</div>
						)}
					</>
				)}
			</div>
		</PageWrapper>
	);
};

export default React.memo(JournalsPage);
