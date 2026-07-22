import React from 'react';

import type { UserPreferences as UserPreferencesType } from '@interfaces/user.interface';

import { useLanguageSync } from '@lib/hooks/useLanguageSync';
import { UserAPIService } from '@services/userApi.service';
import { useOrganizationStore } from '@stores/organization.store';
import { useUserStore } from '@stores/user.store';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import ActionButton from '@components/common/ActionButton/ActionButton';
import Avatar from '@components/common/Avatar/Avatar';
import PageLoader from '@components/common/PageLoader/PageLoader';
import PageWrapper from '@components/common/PageWrapper/PageWrapper';
import Toast from '@components/common/Toast/Toast';
import UserPreferences from '@components/UserPreferences/UserPreferences';

const PreferencePage: React.FC = () => {
	const { t } = useTranslation();
	const { user, updateUserPreferences } = useUserStore();
	const { organization } = useOrganizationStore();

	const navigate = useNavigate();

	useLanguageSync();

	const [preferences, setPreferences] = useState<UserPreferencesType>({
		defaultLanguage: user?.preferences?.defaultLanguage ?? 'en',
		defaultTone: user?.preferences?.defaultTone ?? 'original',
		defaultTarget: user?.preferences?.defaultTarget ?? 'en',
		theme: user?.preferences?.theme ?? 'default',
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showToast, setShowToast] = useState<boolean>(false);
	const [toastMessage, setToastMessage] = useState<string>('');
	const [toastType, setToastType] = useState<'success' | 'error'>('success');

	const handlePreferencesChange = useCallback((newPreferences: UserPreferencesType) => {
		setPreferences(newPreferences);
	}, []);

	const handleSave = useCallback(async () => {
		if (!user || !organization) {
			setToastMessage(t('components.toast.saveErrorPreference'));
			setToastType('error');
			setShowToast(true);

			return;
		}

		setIsLoading(true);

		try {
			const updatedPreferences = await UserAPIService.updateUserPreferences({
				organizationId: organization.id,
				defaultLanguage: preferences.defaultLanguage,
				defaultTone: preferences.defaultTone,
				defaultTarget: preferences.defaultTarget,
				theme: preferences.theme,
			});

			updateUserPreferences(updatedPreferences);

			setToastMessage(t('components.toast.savePreference'));
			setToastType('success');
			setShowToast(true);
		} catch (error) {
			console.error('Failed to save preferences:', error);

			setToastMessage(t('components.toast.saveErrorPreference'));
			setToastType('error');
			setShowToast(true);
		} finally {
			setIsLoading(false);
		}
	}, [user, organization, preferences, updateUserPreferences, t]);

	const handleCancel = useCallback(() => {
		navigate('/home');
	}, [navigate]);

	const handleCloseToast = useCallback(() => {
		setShowToast(false);
	}, []);

	return (
		<>
			{showToast && <Toast message={toastMessage} type={toastType} onClose={handleCloseToast} />}
			<PageWrapper title={t('pages.preferencesPage.title')} subtitle={t('pages.preferencesPage.description')}>
				{isLoading && <PageLoader message={t('common.states.loading')} />}
				<div className="flex flex-col gap-4">
					<div className="flex flex-col justify-center items-center">
						<Avatar url={user?.avatarUrl ?? undefined} name={user?.firstName ?? ''} size="xl" />
						<h1 className="text-2xl font-bold">{user?.firstName}</h1>
					</div>
					<div className="flex flex-col border border-primary-700 p-4 rounded-lg bg-primary-50/50 shadow-md">
						<UserPreferences onPreferencesChange={handlePreferencesChange} />
						<hr className="my-4 border-primary-700" />
						<div className="flex gap-4">
							<ActionButton
								onClick={handleSave}
								ariaLabel={t('common.actions.save')}
								primary
								loading={isLoading}
								disabled={isLoading}
							>
								{t('common.actions.save')}
							</ActionButton>
							<ActionButton
								onClick={handleCancel}
								ariaLabel={t('common.actions.cancel')}
								disabled={isLoading}
							>
								{t('common.actions.cancel')}
							</ActionButton>
						</div>
					</div>
				</div>
			</PageWrapper>
		</>
	);
};

export default PreferencePage;
