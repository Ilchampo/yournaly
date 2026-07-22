import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy: React.FC = () => {
	const { t } = useTranslation();

	return (
		<div className="space-y-6 text-sm font-medium">
			<section>
				<h3 className="text-lg font-bold mb-4">{t('components.privacyPolicy.sections.whoWeAre.title')}</h3>
				<p className="mb-4">{t('components.privacyPolicy.sections.whoWeAre.dataController')}</p>
				<p className="mb-4">{t('components.privacyPolicy.sections.whoWeAre.address')}</p>
				<p className="mb-4">{t('components.privacyPolicy.sections.whoWeAre.email')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">
					{t('components.privacyPolicy.sections.informationWeCollect.title')}
				</h3>
				<p className="mb-4">{t('components.privacyPolicy.sections.informationWeCollect.intro')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">{t('components.privacyPolicy.sections.howWeUse.title')}</h3>
				<p className="mb-4">{t('components.privacyPolicy.sections.howWeUse.intro')}</p>
				<ul className="list-disc pl-6 mb-4 space-y-2">
					{(
						t('components.privacyPolicy.sections.howWeUse.purposes', { returnObjects: true }) as string[]
					).map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">{t('components.privacyPolicy.sections.legalBases.title')}</h3>
				<p className="mb-4">{t('components.privacyPolicy.sections.legalBases.intro')}</p>
				<ul className="list-disc pl-6 mb-4 space-y-2">
					{(t('components.privacyPolicy.sections.legalBases.bases', { returnObjects: true }) as string[]).map(
						(item, index) => (
							<li key={index}>{item}</li>
						),
					)}
				</ul>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">
					{t('components.privacyPolicy.sections.sharingDisclosure.title')}
				</h3>
				<p className="mb-4">{t('components.privacyPolicy.sections.sharingDisclosure.intro')}</p>
				<h4 className="font-semibold mb-2">
					{t('components.privacyPolicy.sections.sharingDisclosure.serviceProviders.title')}
				</h4>
				<ul className="list-disc pl-6 mb-4 space-y-2">
					{(
						t('components.privacyPolicy.sections.sharingDisclosure.serviceProviders.providers', {
							returnObjects: true,
						}) as string[]
					).map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
				<p className="mb-4">{t('components.privacyPolicy.sections.sharingDisclosure.serviceProviders.note')}</p>
				<h4 className="font-semibold mb-2">
					{t('components.privacyPolicy.sections.sharingDisclosure.affiliates.title')}
				</h4>
				<p className="mb-4">{t('components.privacyPolicy.sections.sharingDisclosure.affiliates.content')}</p>
				<h4 className="font-semibold mb-2">
					{t('components.privacyPolicy.sections.sharingDisclosure.legalSafety.title')}
				</h4>
				<p className="mb-4">{t('components.privacyPolicy.sections.sharingDisclosure.legalSafety.content')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">
					{t('components.privacyPolicy.sections.internationalTransfers.title')}
				</h3>
				<p className="mb-4">{t('components.privacyPolicy.sections.internationalTransfers.content')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">{t('components.privacyPolicy.sections.dataRetention.title')}</h3>
				<p className="mb-4">{t('components.privacyPolicy.sections.dataRetention.activeData')}</p>
				<p className="mb-4">{t('components.privacyPolicy.sections.dataRetention.deletedEntries')}</p>
				<p className="mb-4">{t('components.privacyPolicy.sections.dataRetention.legalAccounting')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">{t('components.privacyPolicy.sections.yourRights.title')}</h3>
				<p className="mb-4">{t('components.privacyPolicy.sections.yourRights.intro')}</p>
				<ul className="list-disc pl-6 mb-4 space-y-2">
					{(
						t('components.privacyPolicy.sections.yourRights.rights', { returnObjects: true }) as string[]
					).map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
				<p className="mb-4">{t('components.privacyPolicy.sections.yourRights.contact')}</p>
				<h4 className="font-semibold mb-2">
					{t('components.privacyPolicy.sections.yourRights.california.title')}
				</h4>
				<p className="mb-4">{t('components.privacyPolicy.sections.yourRights.california.content')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">
					{t('components.privacyPolicy.sections.securityMeasures.title')}
				</h3>
				<p className="mb-4">{t('components.privacyPolicy.sections.securityMeasures.intro')}</p>
				<ul className="list-disc pl-6 mb-4 space-y-2">
					{(
						t('components.privacyPolicy.sections.securityMeasures.measures', {
							returnObjects: true,
						}) as string[]
					).map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
				<p className="mb-4">{t('components.privacyPolicy.sections.securityMeasures.disclaimer')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">
					{t('components.privacyPolicy.sections.childrenPrivacy.title')}
				</h3>
				<p className="mb-4">{t('components.privacyPolicy.sections.childrenPrivacy.content')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">
					{t('components.privacyPolicy.sections.thirdPartyLinks.title')}
				</h3>
				<p className="mb-4">{t('components.privacyPolicy.sections.thirdPartyLinks.content')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">
					{t('components.privacyPolicy.sections.cookiesTracking.title')}
				</h3>
				<p className="mb-4">{t('components.privacyPolicy.sections.cookiesTracking.content')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">
					{t('components.privacyPolicy.sections.changesToPolicy.title')}
				</h3>
				<p className="mb-4">{t('components.privacyPolicy.sections.changesToPolicy.content')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">{t('components.privacyPolicy.sections.contactUs.title')}</h3>
				<p className="mb-4">{t('components.privacyPolicy.sections.contactUs.intro')}</p>
				<p className="mb-4">{t('components.privacyPolicy.sections.contactUs.company')}</p>
				<p className="mb-4">{t('components.privacyPolicy.sections.contactUs.address')}</p>
				<p className="mb-4">{t('components.privacyPolicy.sections.contactUs.cityState')}</p>
				<p className="mb-4">{t('components.privacyPolicy.sections.contactUs.email')}</p>
			</section>

			<section>
				<p className="text-center text-gray-600 italic">
					{t('components.privacyPolicy.sections.thankYou.content')}
				</p>
			</section>
		</div>
	);
};

export default PrivacyPolicy;
