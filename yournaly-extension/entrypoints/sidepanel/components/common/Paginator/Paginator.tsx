import React from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface PaginatorProps {
	currentPage: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
	disabled?: boolean;
}

const Paginator: React.FC<PaginatorProps> = props => {
	const { currentPage, totalItems, itemsPerPage, onPageChange, disabled = false } = props;

	const { t } = useTranslation();

	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const hasNext = currentPage < totalPages;
	const hasPrevious = currentPage > 1;

	const handlePrevious = useCallback(() => {
		if (hasPrevious && !disabled) {
			onPageChange(currentPage - 1);
		}
	}, [currentPage, hasPrevious, disabled, onPageChange]);

	const handleNext = useCallback(() => {
		if (hasNext && !disabled) {
			onPageChange(currentPage + 1);
		}
	}, [currentPage, hasNext, disabled, onPageChange]);

	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className="flex justify-center items-center space-x-2 mt-4">
			<button
				onClick={handlePrevious}
				disabled={currentPage === 1}
				className="p-1 rounded-md border border-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
				aria-label="Previous page"
				aria-disabled={currentPage === 1}
				tabIndex={currentPage === 1 ? -1 : 0}
				aria-current={currentPage === 1 ? 'page' : undefined}
			>
				<ChevronLeftIcon size={18} />
			</button>
			<div className="text-sm">
				{t('constants.sorting.page')} {currentPage} {t('constants.sorting.pageOf')} {totalPages}
			</div>
			<button
				onClick={handleNext}
				disabled={currentPage === totalPages}
				className="p-1 rounded-md border border-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
				aria-label="Next page"
				aria-disabled={currentPage === totalPages}
				tabIndex={currentPage === totalPages ? -1 : 0}
				aria-current={currentPage === totalPages ? 'page' : undefined}
			>
				<ChevronRightIcon size={18} />
			</button>
		</div>
	);
};

export default React.memo(Paginator);
