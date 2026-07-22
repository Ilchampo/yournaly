import React from 'react';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AboutUs from '@components/AboutUs/AboutUs';
import Modal from '@components/common/Modal/Modal';
import PageWrapper from '@components/common/PageWrapper/PageWrapper';
import PrivacyPolicy from '@components/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from '@components/TermsService/TermsService';

const AboutPage: React.FC = () => {
	const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);
	const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);

	const { t } = useTranslation();

	return (
		<>
			<PageWrapper title={t('pages.aboutPage.title')} subtitle={t('pages.aboutPage.description')}>
				<AboutUs setIsTermsOpen={setIsTermsOpen} setIsPrivacyOpen={setIsPrivacyOpen} />
			</PageWrapper>
			<Modal
				isOpen={isTermsOpen}
				onClose={() => setIsTermsOpen(false)}
				title={t('components.aboutUs.legal.termsOfService')}
			>
				<TermsOfService />
			</Modal>
			<Modal
				isOpen={isPrivacyOpen}
				onClose={() => setIsPrivacyOpen(false)}
				title={t('components.aboutUs.legal.privacyPolicy')}
			>
				<PrivacyPolicy />
			</Modal>
		</>
	);
};

export default AboutPage;
