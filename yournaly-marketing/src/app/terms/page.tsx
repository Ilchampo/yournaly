import type { Metadata } from 'next';
import React from 'react';

import FadeUp from '@components/FadeUp/FadeUp';

export const metadata: Metadata = {
	title: 'Terms of Service',
	description:
		'Read the Terms of Service for Yournaly by Astrobit LLC, covering accounts, Inks credits, AI output, and acceptable use.',
	alternates: {
		canonical: '/terms',
	},
	openGraph: {
		title: 'Terms of Service | Yournaly',
		description:
			'Read the Terms of Service for Yournaly by Astrobit LLC, covering accounts, Inks credits, and acceptable use.',
		url: '/terms',
	},
};

const TermsPage: React.FC = () => {
	return (
		<FadeUp>
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<h1 className="text-3xl font-bold my-8">Terms of Service</h1>
				<div className="text-sm text-gray-600 mb-8">Last updated: 20 July 2025</div>

				<article className="prose prose-lg max-w-none">
					<p className="mb-6">
						These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Yournaly browser
						extension, web services, mobile applications, and any associated software or websites
						(collectively, the &quot;Service&quot;) provided by Astrobit LLC (&quot;Astrobit&quot;,
						&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing or using the Service, you
						(&quot;you&quot; or &quot;User&quot;) agree to be bound by these Terms. If you do not agree, do
						not access or use the Service.
					</p>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">1. Eligibility & Account Registration</h2>

						<h3 className="text-lg font-medium mb-2">1.1 Minimum Age</h3>
						<p className="mb-4">
							You must be at least 13 years old (or the minimum age of digital consent in your
							jurisdiction, whichever is higher) and have a valid Google or Apple account to register. If
							you are under 18, you represent that you have obtained parental or guardian consent.
						</p>

						<h3 className="text-lg font-medium mb-2">1.2 One Account Per Person</h3>
						<p className="mb-4">
							Each individual may maintain one Yournaly account. Account sharing is discouraged; if you
							share your credentials, you remain fully responsible for all activity under your account.
						</p>

						<h3 className="text-lg font-medium mb-2">1.3 Accurate Information</h3>
						<p className="mb-4">
							You agree to provide and maintain accurate, current, and complete information, including
							your legal name and a valid email address.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">2. Service Description</h2>
						<p>
							Yournaly is an AI-powered writing assistant that provides language-learning feedback,
							grammar suggestions, tone adjustments, readability improvements, and related features. Users
							submit text (&quot;User Content&quot;) and receive AI-generated feedback (&quot;AI
							Output&quot;). The Service is intended for educational purposes only and not for
							professional advice.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">3. Subscriptions, &quot;Inks,&quot; and Payments</h2>

						<h3 className="text-lg font-medium mb-2">3.1 Credit System</h3>
						<p className="mb-4">
							Usage is measured in virtual credits called &quot;Inks.&quot; Each new account receives 100
							free Inks. When your balance reaches zero, you must purchase an Ink package to continue
							using the Service.
						</p>

						<h3 className="text-lg font-medium mb-2">3.2 Packages & Pricing</h3>
						<p className="mb-4">
							Ink packages, pricing, and the amount of Inks consumed per action are described within the
							Service. Astrobit may modify package pricing or consumption rates upon 30 days&apos; notice
							via email or in-product messaging.
						</p>

						<h3 className="text-lg font-medium mb-2">3.3 Payment Processing</h3>
						<p className="mb-4">
							Payments are processed by Stripe in U.S. dollars (USD). Taxes, duties, and exchange fees are
							your responsibility.
						</p>

						<h3 className="text-lg font-medium mb-2">3.4 Refunds</h3>
						<p className="mb-4">
							If we fail to deliver purchased Inks to your account within a reasonable time (normally &lt;
							5 minutes), you may request a refund by emailing pablo@goastrobit.com within 30 days of
							purchase. Approved refunds are credited to your original payment method.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">4. License & Intellectual Property</h2>

						<h3 className="text-lg font-medium mb-2">4.1 Your Content License to Us</h3>
						<p className="mb-4">
							You retain ownership of your User Content. By submitting User Content, you grant Astrobit a
							worldwide, non-exclusive, royalty-free license to (a) host, store, display, and process the
							content to provide and improve the Service; (b) create aggregated, de-identified data for
							analytics and product development; and (c) comply with legal obligations.
						</p>

						<h3 className="text-lg font-medium mb-2">4.2 AI Output</h3>
						<p className="mb-4">
							Subject to these Terms and your payment of applicable fees, Astrobit assigns to you any
							intellectual-property rights it may have in the AI Output generated specifically for you, to
							the extent permitted by applicable law and third-party model licenses. You acknowledge that
							AI Output may be similar or identical to output provided to other users.
						</p>

						<h3 className="text-lg font-medium mb-2">4.3 Service IP</h3>
						<p className="mb-4">
							The Service, including all software, logos, trademarks, and content (excluding User
							Content), is owned by Astrobit or its licensors and is protected by intellectual-property
							laws. No rights are granted except as expressly set out in these Terms.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">5. Prohibited Conduct</h2>
						<p className="mb-4">You must not:</p>
						<ul className="list-disc pl-6 mb-4 space-y-2">
							<li>
								Use the Service for any unlawful, harmful, harassing, hate-related, defamatory, obscene,
								or otherwise objectionable purpose;
							</li>
							<li>Upload or transmit any content that infringes third-party rights or privacy;</li>
							<li>Attempt to reverse-engineer, decompile, or disassemble any part of the Service;</li>
							<li>Interfere with or disrupt the Service, servers, or networks;</li>
							<li>Bypass or breach security or usage-limit measures.</li>
						</ul>
						<p>
							We reserve the right to suspend or terminate accounts engaged in prohibited conduct and to
							report illegal activity to law-enforcement authorities.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">6. Data Privacy & Security</h2>

						<h3 className="text-lg font-medium mb-2">6.1 Data Collected</h3>
						<p className="mb-4">
							We collect your email address, first and last name (from your OAuth provider), User Content,
							usage metrics, and payment-related data. See our Privacy Policy for full details.
						</p>

						<h3 className="text-lg font-medium mb-2">6.2 Processors</h3>
						<p className="mb-4">
							We use OpenAI (text processing), Stripe (payments), Google Cloud Platform (infrastructure),
							and Render (PostgreSQL database in Virginia, USA) as sub-processors.
						</p>

						<h3 className="text-lg font-medium mb-2">6.3 Data Retention</h3>
						<p className="mb-4">
							We store User Content indefinitely unless you delete it or request deletion. Back-ups are
							retained for disaster-recovery purposes. Soft-deleted data may persist in back-ups for up to
							30 days.
						</p>

						<h3 className="text-lg font-medium mb-2">6.4 Data Requests</h3>
						<p className="mb-4">
							You may request access to or deletion of your personal data by emailing
							pablo@goastrobit.com. We will comply unless retention is required by law.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">7. Disclaimers</h2>

						<h3 className="text-lg font-medium mb-2">7.1 Educational Use Only</h3>
						<p className="mb-4">
							The Service is provided for language-learning and educational purposes. It does not
							constitute professional, legal, medical, or other expert advice.
						</p>

						<h3 className="text-lg font-medium mb-2">7.2 AI Limitations</h3>
						<p className="mb-4">
							AI Output is generated by large-language models (currently provided by OpenAI) and may
							contain errors, biases, or outdated information. You are solely responsible for reviewing
							and verifying AI Output before relying on it.
						</p>

						<h3 className="text-lg font-medium mb-2">7.3 No Warranty</h3>
						<p className="mb-4">
							The Service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of
							any kind, express or implied, including fitness for a particular purpose, accuracy, or
							non-infringement.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">8. Limitation of Liability</h2>
						<p>
							To the maximum extent permitted by law, Astrobit and its affiliates, officers, employees,
							and agents shall not be liable for any indirect, incidental, special, consequential, or
							punitive damages, or for loss of profits, revenues, data, or goodwill. Astrobit&apos;s total
							liability arising out of or related to the Service shall not exceed the greater of (a) USD
							100 or (b) the amount you paid to Astrobit for the Service in the 12 months preceding the
							claim. Some jurisdictions do not allow certain limitations, so portions of this section may
							not apply to you.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">9. Governing Law & Dispute Resolution</h2>

						<h3 className="text-lg font-medium mb-2">9.1 Governing Law</h3>
						<p className="mb-4">
							These Terms are governed by the laws of the State of Delaware, USA, without regard to
							conflict-of-law principles.
						</p>

						<h3 className="text-lg font-medium mb-2">9.2 Informal Resolution</h3>
						<p className="mb-4">
							Before filing a claim, you agree to attempt to resolve the dispute informally by emailing
							pablo@goastrobit.com. If unresolved after 30 days, either party may initiate arbitration.
						</p>

						<h3 className="text-lg font-medium mb-2">9.3 Binding Arbitration & Class-Action Waiver</h3>
						<p className="mb-4">
							Any dispute arising out of or relating to these Terms or the Service shall be finally
							settled by binding arbitration administered by JAMS pursuant to its Streamlined Rules. The
							arbitration will take place in Wilmington, Delaware, USA, or via video conference if travel
							is impractical. YOU AND ASTROBIT WAIVE THE RIGHT TO A JURY TRIAL AND TO PARTICIPATE IN
							CLASS-ACTION PROCEEDINGS.
						</p>

						<h3 className="text-lg font-medium mb-2">9.4 Small-Claims Option</h3>
						<p className="mb-4">
							Either party may bring individual claims in small-claims court in New Castle County,
							Delaware, if the claim qualifies.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">10. Termination</h2>

						<h3 className="text-lg font-medium mb-2">10.1 By You</h3>
						<p className="mb-4">You may stop using the Service at any time and request account deletion.</p>

						<h3 className="text-lg font-medium mb-2">10.2 By Us</h3>
						<p className="mb-4">
							We may suspend or terminate your access (with or without notice) if you violate these Terms
							or if we discontinue the Service. Unused purchased Inks are non-refundable except as
							required by law.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">11. Modifications</h2>
						<p>
							We may revise these Terms from time to time. If we make material changes, we will notify you
							via email at least 30 days before the revised Terms take effect. Continued use after the
							effective date constitutes acceptance.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">12. Force Majeure</h2>
						<p>
							Astrobit will not be liable for any delay or failure to perform due to events beyond its
							reasonable control, including natural disasters, internet outages, labor disputes, or
							governmental actions.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">13. Assignment</h2>
						<p>
							Astrobit may assign or transfer these Terms, in whole or in part, to a successor or
							acquirer. You may not assign your rights or obligations without our prior written consent.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">14. Entire Agreement & Severability</h2>
						<p>
							These Terms constitute the entire agreement between you and Astrobit regarding the Service
							and supersede any prior agreements. If any provision is found unenforceable, the remaining
							provisions will remain in full force and effect.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-xl font-semibold mb-4">15. Contact Information</h2>
						<p className="mb-4">For questions, support, or legal notices:</p>
						<div className="bg-surface-50/50 border border-primary-700 p-4 rounded-lg">
							<p className="font-medium">Astrobit LLC</p>
							<p>131 Continental Dr, Suite 305</p>
							<p>Newark, DE 19713, USA</p>
							<p className="mt-2">Email: pablo@goastrobit.com (support & legal)</p>
						</div>
					</section>
				</article>
			</div>
		</FadeUp>
	);
};

export default TermsPage;
