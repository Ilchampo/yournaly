import React from 'react';

import { useTranslation } from 'react-i18next';

const TermsService: React.FC = () => {
	const { t } = useTranslation();

	return (
		<div className="space-y-6 text-sm font-medium">
			<div className="mb-6">
				<h2 className="text-2xl font-bold mb-2">{t('components.termsOfService.title')}</h2>
				<p className="text-sm text-gray-600 mb-4">{t('components.termsOfService.lastUpdated')}</p>
				<p className="mb-6">{t('components.termsOfService.intro')}</p>
			</div>

			<section>
				<h3 className="text-lg font-bold mb-4">{t('components.termsOfService.sections.eligibility.title')}</h3>
				<div className="space-y-4">
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.eligibility.minimumAge.title')}
						</h4>
						<p className="mb-4">{t('components.termsOfService.sections.eligibility.minimumAge.content')}</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.eligibility.oneAccount.title')}
						</h4>
						<p className="mb-4">{t('components.termsOfService.sections.eligibility.oneAccount.content')}</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.eligibility.accurateInfo.title')}
						</h4>
						<p className="mb-4">
							{t('components.termsOfService.sections.eligibility.accurateInfo.content')}
						</p>
					</div>
				</div>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">
					{t('components.termsOfService.sections.serviceDescription.title')}
				</h3>
				<p className="mb-4">{t('components.termsOfService.sections.serviceDescription.content')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">
					{t('components.termsOfService.sections.subscriptions.title')}
				</h3>
				<div className="space-y-4">
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.subscriptions.creditSystem.title')}
						</h4>
						<p className="mb-4">
							{t('components.termsOfService.sections.subscriptions.creditSystem.content')}
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.subscriptions.packages.title')}
						</h4>
						<p className="mb-4">{t('components.termsOfService.sections.subscriptions.packages.content')}</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.subscriptions.paymentProcessing.title')}
						</h4>
						<p className="mb-4">
							{t('components.termsOfService.sections.subscriptions.paymentProcessing.content')}
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.subscriptions.refunds.title')}
						</h4>
						<p className="mb-4">{t('components.termsOfService.sections.subscriptions.refunds.content')}</p>
					</div>
				</div>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">{t('components.termsOfService.sections.license.title')}</h3>
				<div className="space-y-4">
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.license.contentLicense.title')}
						</h4>
						<p className="mb-4">{t('components.termsOfService.sections.license.contentLicense.content')}</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.license.aiOutput.title')}
						</h4>
						<p className="mb-4">{t('components.termsOfService.sections.license.aiOutput.content')}</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.license.serviceIP.title')}
						</h4>
						<p className="mb-4">{t('components.termsOfService.sections.license.serviceIP.content')}</p>
					</div>
				</div>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">
					{t('components.termsOfService.sections.prohibitedConduct.title')}
				</h3>
				<p className="mb-4">{t('components.termsOfService.sections.prohibitedConduct.intro')}</p>
				<ul className="list-disc list-inside space-y-2 mb-4">
					{(
						t('components.termsOfService.sections.prohibitedConduct.items', {
							returnObjects: true,
						}) as string[]
					).map((item: string, index: number) => (
						<li key={index} className="ml-4">
							{item}
						</li>
					))}
				</ul>
				<p className="mb-4">{t('components.termsOfService.sections.prohibitedConduct.reservation')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">{t('components.termsOfService.sections.dataPrivacy.title')}</h3>
				<div className="space-y-4">
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.dataPrivacy.dataCollected.title')}
						</h4>
						<p className="mb-4">
							{t('components.termsOfService.sections.dataPrivacy.dataCollected.content')}
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.dataPrivacy.processors.title')}
						</h4>
						<p className="mb-4">{t('components.termsOfService.sections.dataPrivacy.processors.content')}</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.dataPrivacy.dataRetention.title')}
						</h4>
						<p className="mb-4">
							{t('components.termsOfService.sections.dataPrivacy.dataRetention.content')}
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.dataPrivacy.dataRequests.title')}
						</h4>
						<p className="mb-4">
							{t('components.termsOfService.sections.dataPrivacy.dataRequests.content')}
						</p>
					</div>
				</div>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">{t('components.termsOfService.sections.disclaimers.title')}</h3>
				<div className="space-y-4">
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.disclaimers.educationalUse.title')}
						</h4>
						<p className="mb-4">
							{t('components.termsOfService.sections.disclaimers.educationalUse.content')}
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.disclaimers.aiLimitations.title')}
						</h4>
						<p className="mb-4">
							{t('components.termsOfService.sections.disclaimers.aiLimitations.content')}
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.disclaimers.noWarranty.title')}
						</h4>
						<p className="mb-4">{t('components.termsOfService.sections.disclaimers.noWarranty.content')}</p>
					</div>
				</div>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">
					{t('components.termsOfService.sections.limitationOfLiability.title')}
				</h3>
				<p className="mb-4">{t('components.termsOfService.sections.limitationOfLiability.content')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">{t('components.termsOfService.sections.governingLaw.title')}</h3>
				<div className="space-y-4">
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.governingLaw.governingLaw.title')}
						</h4>
						<p className="mb-4">
							{t('components.termsOfService.sections.governingLaw.governingLaw.content')}
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.governingLaw.informalResolution.title')}
						</h4>
						<p className="mb-4">
							{t('components.termsOfService.sections.governingLaw.informalResolution.content')}
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.governingLaw.bindingArbitration.title')}
						</h4>
						<p className="mb-4">
							{t('components.termsOfService.sections.governingLaw.bindingArbitration.content')}
						</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.governingLaw.smallClaims.title')}
						</h4>
						<p className="mb-4">
							{t('components.termsOfService.sections.governingLaw.smallClaims.content')}
						</p>
					</div>
				</div>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">{t('components.termsOfService.sections.termination.title')}</h3>
				<div className="space-y-4">
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.termination.byYou.title')}
						</h4>
						<p className="mb-4">{t('components.termsOfService.sections.termination.byYou.content')}</p>
					</div>
					<div>
						<h4 className="font-semibold mb-2">
							{t('components.termsOfService.sections.termination.byUs.title')}
						</h4>
						<p className="mb-4">{t('components.termsOfService.sections.termination.byUs.content')}</p>
					</div>
				</div>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">
					{t('components.termsOfService.sections.modifications.title')}
				</h3>
				<p className="mb-4">{t('components.termsOfService.sections.modifications.content')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">{t('components.termsOfService.sections.forceMajeure.title')}</h3>
				<p className="mb-4">{t('components.termsOfService.sections.forceMajeure.content')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">{t('components.termsOfService.sections.assignment.title')}</h3>
				<p className="mb-4">{t('components.termsOfService.sections.assignment.content')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">
					{t('components.termsOfService.sections.entireAgreement.title')}
				</h3>
				<p className="mb-4">{t('components.termsOfService.sections.entireAgreement.content')}</p>
			</section>

			<section>
				<h3 className="text-lg font-bold mb-4">{t('components.termsOfService.sections.contactInfo.title')}</h3>
				<p className="mb-4">{t('components.termsOfService.sections.contactInfo.intro')}</p>
				<div className="space-y-2">
					<p className="font-semibold">{t('components.termsOfService.sections.contactInfo.company')}</p>
					<p>{t('components.termsOfService.sections.contactInfo.address')}</p>
					<p>{t('components.termsOfService.sections.contactInfo.cityState')}</p>
					<p>{t('components.termsOfService.sections.contactInfo.email')}</p>
				</div>
			</section>
		</div>
	);
};

export default TermsService;
