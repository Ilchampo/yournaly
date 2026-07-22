import React from 'react';

import type { InkPackage } from '@interfaces/ink.interface';
import type { PaymentFlowState } from '@interfaces/payment.interface';

import { InkAPIService } from '@services/inkApi.service';
import { PaymentAPIService } from '@services/paymentApi.service';
import { useUserStore } from '@stores/user.store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ActionButton from '@components/common/ActionButton/ActionButton';
import PageLoader from '@components/common/PageLoader/PageLoader';
import PageWrapper from '@components/common/PageWrapper/PageWrapper';
import Toast from '@components/common/Toast/Toast';
import PackageCard from '@components/PackageCard/PackageCard';

const TIMEOUT_DELAY = 2000 as const;
const POLLING_INTERVAL = 2000 as const;
const POLLING_TIMEOUT = 300000 as const;

const PurchasePage: React.FC = () => {
	const [inkPackages, setInkPackages] = useState<InkPackage[]>([]);
	const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [paymentFlow, setPaymentFlow] = useState<PaymentFlowState>({
		status: 'idle',
	});
	const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

	const navigate = useNavigate();

	const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const { t } = useTranslation();
	const { user, updateInkBalance } = useUserStore();

	const clearPolling = useCallback(() => {
		if (pollingIntervalRef.current) {
			clearInterval(pollingIntervalRef.current);
			pollingIntervalRef.current = null;
		}
		if (pollingTimeoutRef.current) {
			clearTimeout(pollingTimeoutRef.current);
			pollingTimeoutRef.current = null;
		}
	}, []);

	const showToast = useCallback((message: string, type: 'success' | 'error') => {
		setToast({ message, type });
	}, []);

	const handleCancel = useCallback(() => {
		clearPolling();

		if (selectedPackageId) {
			setSelectedPackageId(null);
		}

		if (paymentFlow.status !== 'idle') {
			setPaymentFlow({ status: 'idle' });
		}

		navigate('/home');
	}, [selectedPackageId, paymentFlow.status, navigate, clearPolling]);

	const getSelectedPackage = useCallback(() => {
		return inkPackages.find(pkg => pkg.id === selectedPackageId);
	}, [inkPackages, selectedPackageId]);

	const pollPaymentStatus = useCallback(
		async (sessionId: string) => {
			try {
				const response = await PaymentAPIService.checkPaymentStatus(sessionId);
				const { status, paymentStatus } = response.data;

				if (status === 'complete' && paymentStatus === 'paid') {
					clearPolling();
					const selectedPackage = getSelectedPackage();

					if (selectedPackage && user) {
						const newBalance = user.inksBalance + selectedPackage.inksToAdd;

						updateInkBalance(newBalance);
					}

					setPaymentFlow({ status: 'completed', sessionId });
					showToast(t('pages.purchasePage.paymentSuccess'), 'success');

					setTimeout(() => {
						navigate('/home');
					}, TIMEOUT_DELAY);
				} else if (status === 'expired') {
					clearPolling();
					setPaymentFlow({ status: 'expired', sessionId });
					showToast(t('pages.purchasePage.paymentExpired'), 'error');
				}
			} catch (error) {
				clearPolling();
				setPaymentFlow({
					status: 'failed',
					error: error instanceof Error ? error.message : 'Payment status check failed',
				});
				showToast(t('pages.purchasePage.paymentStatusError'), 'error');
			}
		},
		[clearPolling, showToast, navigate, t, getSelectedPackage, user, updateInkBalance],
	);

	const startPaymentPolling = useCallback(
		(sessionId: string) => {
			setPaymentFlow({ status: 'polling', sessionId });

			pollingIntervalRef.current = setInterval(() => {
				pollPaymentStatus(sessionId);
			}, POLLING_INTERVAL);

			pollingTimeoutRef.current = setTimeout(() => {
				clearPolling();
				setPaymentFlow({
					status: 'failed',
					error: 'Payment polling timeout',
				});
				showToast(t('pages.purchasePage.paymentTimeout'), 'error');
			}, POLLING_TIMEOUT);

			pollPaymentStatus(sessionId);
		},
		[pollPaymentStatus, clearPolling, showToast, t],
	);

	const handleConfirmPurchase = useCallback(async () => {
		if (!selectedPackageId) {
			showToast(t('pages.purchasePage.selectPackageError'), 'error');
			return;
		}

		try {
			setPaymentFlow({ status: 'creating' });

			const response = await PaymentAPIService.createCheckoutSession({
				packageId: selectedPackageId,
			});

			const { sessionId, url } = response.data;

			setPaymentFlow({
				status: 'pending',
				sessionId,
				checkoutUrl: url,
			});

			chrome.tabs.create({ url });

			startPaymentPolling(sessionId);

			showToast(t('pages.purchasePage.checkoutOpened'), 'success');
		} catch (error) {
			setPaymentFlow({
				status: 'failed',
				error: error instanceof Error ? error.message : 'Payment initiation failed',
			});
			showToast(error instanceof Error ? error.message : t('pages.purchasePage.paymentError'), 'error');
		}
	}, [selectedPackageId, showToast, startPaymentPolling, t]);

	useEffect(() => {
		setIsLoading(true);
		InkAPIService.getInkPackages()
			.then(response => {
				setInkPackages(response.packages);
			})
			.catch(error => {
				showToast(error instanceof Error ? error.message : t('pages.purchasePage.loadError'), 'error');
			})
			.finally(() => setIsLoading(false));
	}, [showToast, t]);

	useEffect(() => {
		return () => {
			clearPolling();
		};
	}, [clearPolling]);

	const getConfirmButtonText = () => {
		switch (paymentFlow.status) {
			case 'creating':
				return t('pages.purchasePage.creatingSession');
			case 'pending':
				return t('pages.purchasePage.checkoutOpened');
			case 'polling':
				return t('pages.purchasePage.waitingPayment');
			case 'completed':
				return t('pages.purchasePage.paymentCompleted');
			default:
				return t('common.actions.confirm');
		}
	};

	const isConfirmDisabled =
		isLoading || !selectedPackageId || ['creating', 'pending', 'polling', 'completed'].includes(paymentFlow.status);

	const isConfirmLoading = ['creating', 'polling'].includes(paymentFlow.status);

	return (
		<>
			{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
			<PageWrapper title={t('pages.purchasePage.title')} subtitle={t('pages.purchasePage.description')}>
				{isLoading && <PageLoader message={t('pages.purchasePage.loading')} />}

				{paymentFlow.status === 'polling' && <PageLoader message={t('pages.purchasePage.pollingMessage')} />}

				<div className="space-y-3">
					{inkPackages.map(inkPackage => (
						<PackageCard
							key={inkPackage.id}
							inkPackage={inkPackage}
							isSelected={selectedPackageId === inkPackage.id}
							onClick={setSelectedPackageId}
						/>
					))}
					<hr className="my-4 border-primary-700" />
					<div className="flex gap-4">
						<ActionButton
							onClick={handleConfirmPurchase}
							ariaLabel={t('common.actions.confirm')}
							primary
							loading={isConfirmLoading}
							disabled={isConfirmDisabled}
						>
							{getConfirmButtonText()}
						</ActionButton>
						<ActionButton
							onClick={handleCancel}
							ariaLabel={t('common.actions.cancel')}
							disabled={isLoading || isConfirmLoading}
						>
							{t('common.actions.cancel')}
						</ActionButton>
					</div>
				</div>
			</PageWrapper>
		</>
	);
};

export default PurchasePage;
