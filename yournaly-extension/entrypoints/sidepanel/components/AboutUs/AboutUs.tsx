import React from 'react';

import { ASSETS } from '@lib/assets';
import { useOrganizationInfo } from '@stores/organization.store';
import { useTranslation } from 'react-i18next';

interface AboutUsProps {
	setIsTermsOpen: (isOpen: boolean) => void;
	setIsPrivacyOpen: (isOpen: boolean) => void;
}

const AboutUs: React.FC<AboutUsProps> = props => {
	const { setIsTermsOpen, setIsPrivacyOpen } = props;

	const { contactEmail } = useOrganizationInfo();
	const { t } = useTranslation();

	return (
		<div className="flex flex-col gap-4">
			<section>
				<h2 className="text-xl font-semibold mb-3">{t('components.aboutUs.howToUse.title')}</h2>
				<img
					src={ASSETS.settingsGuide}
					alt="Settings Guide"
					className="w-full md:w-1/2 rounded-lg shadow-md p-4 border border-primary-700 mx-auto mb-4"
				/>
				<div className="space-y-4">
					<p>{t('components.aboutUs.howToUse.description')}</p>

					<div>
						<h3 className="text-lg font-medium mb-2">
							{t('components.aboutUs.howToUse.mainParameters.title')}
						</h3>
						<ul className="space-y-3 ml-4">
							<li>
								<h4 className="text-base font-medium">
									{t('components.aboutUs.howToUse.mainParameters.language.title')}
								</h4>
								<p className="ml-4">
									{t('components.aboutUs.howToUse.mainParameters.language.description')}
								</p>
							</li>
							<li>
								<h4 className="text-base font-medium">
									{t('components.aboutUs.howToUse.mainParameters.targetLanguage.title')}
								</h4>
								<p className="ml-4">
									{t('components.aboutUs.howToUse.mainParameters.targetLanguage.description')}
								</p>
							</li>
							<li>
								<h4 className="text-base font-medium">
									{t('components.aboutUs.howToUse.mainParameters.tone.title')}
								</h4>
								<p className="ml-4">
									{t('components.aboutUs.howToUse.mainParameters.tone.description')}
								</p>
							</li>
						</ul>
					</div>

					<div className="bg-surface-100/50 p-3 rounded-lg border border-primary-700">
						<p className="text-sm">
							<strong>Tip:</strong> {t('components.aboutUs.howToUse.tip')}
						</p>
					</div>
				</div>
			</section>

			<section>
				<h2 className="text-xl font-semibold mb-3">{t('components.aboutUs.about.title')}</h2>
				<p>{t('components.aboutUs.about.description')}</p>
			</section>

			<section>
				<h2 className="text-xl font-semibold  mb-3">{t('components.aboutUs.legal.title')}</h2>
				<div className="flex gap-2">
					<button
						onClick={() => setIsTermsOpen(true)}
						className="text-primary-800 hover:text-primary-900 underline block"
					>
						{t('components.aboutUs.legal.termsOfService')}
					</button>
					<button
						onClick={() => setIsPrivacyOpen(true)}
						className="text-primary-800 hover:text-primary-900 underline block"
					>
						{t('components.aboutUs.legal.privacyPolicy')}
					</button>
				</div>
			</section>
			<section>
				<h2 className="text-xl font-semibold mb-3 justify-s">{t('components.aboutUs.contact.title')}</h2>
				<p>{t('components.aboutUs.contact.description')}</p>
				<p className="my-2">
					<a
						href={`mailto:${contactEmail}`}
						target="_blank"
						className="text-primary-800 hover:text-primary-900 underline"
					>
						{contactEmail}
					</a>
				</p>
			</section>
		</div>
	);
};

export default AboutUs;
