import type { Metadata } from 'next';
import React from 'react';

import FadeUp from '@components/FadeUp/FadeUp';

export const metadata: Metadata = {
	title: 'Privacy Policy',
	description:
		'Learn how Astrobit LLC collects, uses, and protects your data when you use Yournaly, the AI writing assistant for language learners.',
	alternates: {
		canonical: '/privacy',
	},
	openGraph: {
		title: 'Privacy Policy | Yournaly',
		description: 'Learn how Astrobit LLC collects, uses, and protects your data when you use Yournaly.',
		url: '/privacy',
	},
};

const PrivacyPage: React.FC = () => {
	return (
		<FadeUp>
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<h1 className="text-3xl font-bold my-8">Privacy Policy</h1>
				<div className="text-sm text-gray-600 mb-8">Last updated: 20 July 2025</div>

				<article className="prose prose-lg max-w-none">
					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">1. Who We Are</h2>
						<div className="bg-surface-50/50 border border-primary-700 p-4 rounded-lg mb-4">
							<p className="font-medium">Data Controller: Astrobit LLC</p>
							<p>Address: 131 Continental Dr, Suite 305, Newark, DE 19713, USA</p>
							<p className="mt-2">Email: pablo@goastrobit.com</p>
						</div>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
						<p>
							We do not intentionally collect sensitive personal data (e.g., race, political opinions,
							health data). We encourage users not to include sensitive data in User Content.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
						<p className="mb-4">We process information to:</p>
						<ul className="list-disc pl-6 mb-4 space-y-2">
							<li>
								<strong>Provide & Operate the Service</strong>, including generating AI feedback and
								managing Ink credits.
							</li>
							<li>
								<strong>Improve & Personalise the Service</strong> through aggregated analytics and
								machine learning.
							</li>
							<li>
								<strong>Process Payments</strong> and maintain accurate billing and accounting records.
							</li>
							<li>
								<strong>Communicate</strong> with you about updates, security alerts, and support
								requests.
							</li>
							<li>
								<strong>Detect & Prevent Fraud</strong> and abuse, enforce our Terms of Service, and
								protect the integrity of the Service.
							</li>
							<li>
								<strong>Comply with Legal Obligations</strong>, including tax and regulatory
								requirements.
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">4. Legal Bases for Processing (EEA/UK Users)</h2>
						<p className="mb-4">We rely on the following legal grounds under the GDPR:</p>
						<ul className="list-disc pl-6 mb-4 space-y-2">
							<li>
								<strong>Contract:</strong> Processing necessary to perform our contract with you (e.g.,
								providing the Service).
							</li>
							<li>
								<strong>Legitimate Interests:</strong> Improving the Service, securing our systems, and
								preventing fraud (balanced against your rights).
							</li>
							<li>
								<strong>Consent:</strong> Where we rely on optional cookies or send marketing emails
								(you may withdraw consent at any time).
							</li>
							<li>
								<strong>Legal Obligation:</strong> Compliance with applicable laws (e.g., accounting,
								taxation).
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">5. Sharing & Disclosure</h2>
						<p className="mb-4">
							We do not sell your personal data. We disclose information only as described:
						</p>

						<h3 className="text-lg font-medium mb-2">5.1 Service Providers & Sub-Processors</h3>
						<ul className="list-disc pl-6 mb-4 space-y-2">
							<li>OpenAI, L.L.C. – language model processing</li>
							<li>Stripe, Inc. – payment processing</li>
							<li>Google Cloud Platform & Render – hosting & database (USA)</li>
						</ul>
						<p className="mb-4">
							Service providers access data solely to perform services on our behalf and are bound by
							confidentiality obligations.
						</p>

						<h3 className="text-lg font-medium mb-2">5.2 Affiliates & Business Transfers</h3>
						<p className="mb-4">
							We may share data with subsidiaries or in connection with a merger, acquisition, or asset
							sale. You will be notified of any material changes.
						</p>

						<h3 className="text-lg font-medium mb-2">5.3 Legal & Safety</h3>
						<p className="mb-4">
							We may disclose information if required by law, subpoena, or to protect the rights,
							property, or safety of Astrobit, our users, or others.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">6. International Data Transfers</h2>
						<p>
							Astrobit is headquartered in the United States. If you reside outside the U.S., your
							information will be transferred to and stored in the U.S. and potentially other countries.
							For EEA/UK data, we rely on Standard Contractual Clauses or an adequacy decision to ensure
							an equivalent level of protection.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">7. Data Retention</h2>
						<ul className="list-disc pl-6 mb-4 space-y-2">
							<li>
								<strong>Active Data:</strong> Retained as long as your account is active or as needed to
								provide the Service.
							</li>
							<li>
								<strong>Deleted Entries:</strong> Soft-deleted in the UI but removable upon request;
								backups may persist ≤ 30 days.
							</li>
							<li>
								<strong>Legal & Accounting Records:</strong> Retained per statutory requirements
								(typically 7 years).
							</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">8. Your Rights & Choices</h2>
						<p className="mb-4">Depending on your jurisdiction, you may have the right to:</p>
						<ul className="list-disc pl-6 mb-4 space-y-2">
							<li>Access the personal data we hold about you.</li>
							<li>Rectify inaccuracies.</li>
							<li>Delete your data (right to erasure).</li>
							<li>Restrict or object to processing.</li>
							<li>Port your data to another service.</li>
							<li>Opt-out of marketing communications at any time.</li>
						</ul>
						<p className="mb-4">
							To exercise these rights, email pablo@goastrobit.com. We will respond within 30 days (or the
							timeframe required by law).
						</p>

						<h3 className="text-lg font-medium mb-2">California Residents (CCPA/CPRA)</h3>
						<p>
							Astrobit does not sell personal information. You have the right to know, delete, and correct
							your personal information, and to limit use of sensitive information. Submit requests via
							pablo@goastrobit.com.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">9. Security Measures</h2>
						<p className="mb-4">
							We implement administrative, technical, and physical safeguards, including:
						</p>
						<ul className="list-disc pl-6 mb-4 space-y-2">
							<li>TLS/HTTPS encryption in transit;</li>
							<li>Encryption at rest for sensitive fields;</li>
							<li>Role-based access controls;</li>
							<li>Regular vulnerability scanning and penetration testing;</li>
							<li>Daily encrypted backups.</li>
						</ul>
						<p>
							Despite efforts, no method of transmission or storage is 100% secure. You use the Service at
							your own risk.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">10. Children&apos;s Privacy</h2>
						<p>
							The Service is not directed to children under 13 (or under 16 in certain jurisdictions). We
							do not knowingly collect personal data from children. If you believe a child has provided us
							data, contact pablo@goastrobit.com and we will delete it.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">11. Third-Party Links & Services</h2>
						<p>
							The Service may contain links to third-party sites or use third-party integrations (e.g.,
							Google OAuth). We are not responsible for the privacy practices of those parties. Review
							their policies before providing data.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">12. Cookies & Tracking Technologies</h2>
						<p>
							Our public website may use cookies or similar technologies to remember preferences and
							compile aggregated analytics. Browser settings allow you to control cookies. The Yournaly
							extension stores local data on your device to operate (e.g., session tokens, Ink balance).
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">13. Changes to This Policy</h2>
						<p>
							We may update this Policy periodically. If changes are material, we will notify you via
							email at least 30 days before they take effect. Continued use after the effective date
							constitutes acceptance.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">14. Contact Us</h2>
						<p className="mb-4">Questions or concerns?</p>
						<div className="bg-surface-50/50 border border-primary-700 p-4 rounded-lg">
							<p className="font-medium">Astrobit LLC – Privacy</p>
							<p>131 Continental Dr, Suite 305</p>
							<p>Newark, DE 19713, USA</p>
							<p className="mt-2">Email: pablo@goastrobit.com</p>
						</div>
						<p className="mt-6 text-center italic">
							Thank you for trusting Yournaly by Astrobit to support your language-learning journey.
						</p>
					</section>
				</article>
			</div>
		</FadeUp>
	);
};

export default PrivacyPage;
