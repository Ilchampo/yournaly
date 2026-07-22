import type { Metadata, Viewport } from 'next';

import { Analytics } from '@vercel/analytics/react';
import { SITE_URL, CHROME_STORE_URL } from '@constants/site.constant';
import { Delius_Swash_Caps, Noto_Sans } from 'next/font/google';

import Footer from '@components/Footer/Footer';
import Navbar from '@components/Navbar/Navbar';
import PageWrapper from '@components/PageWrapper/PageWrapper';

import './globals.css';

const deliusSwashCaps = Delius_Swash_Caps({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-delius-swash-caps',
});
const notoSans = Noto_Sans({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-noto-sans',
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: 'Yournaly - AI Writing Assistant for Language Learners | Chrome Extension',
		template: '%s | Yournaly',
	},
	description:
		"Improve your writing with Yournaly's AI-powered feedback. Perfect for language learners seeking grammar corrections, tone adjustments, and personalized writing guidance. Free Chrome extension.",
	keywords: [
		'AI writing assistant',
		'language learning',
		'grammar checker',
		'writing feedback',
		'Chrome extension',
		'ESL writing',
		'writing improvement',
		'AI tutor',
	],
	authors: [{ name: 'Astrobit LLC' }],
	creator: 'Astrobit LLC',
	publisher: 'Astrobit LLC',
	robots: 'index, follow',
	category: 'Education',
	classification: 'Language Learning Tool',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: SITE_URL,
		siteName: 'Yournaly',
		title: 'Yournaly - AI Writing Assistant for Language Learners',
		description:
			'Transform your writing with AI-powered feedback designed for language learners. Get instant grammar corrections, tone suggestions, and personalized guidance.',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Yournaly AI Writing Assistant for Language Learners',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@yournaly',
		creator: '@astrobit',
		title: 'Yournaly - AI Writing Assistant for Language Learners',
		description:
			'Improve your writing with AI-powered feedback designed for language learners. Free Chrome extension.',
		images: ['/twitter-image.png'],
	},
	verification: {
		google: 'ZTSdNjscURacuWTYBTG9AtQgXVbwJPTvVq0uvqOYtm4',
	},
	alternates: {
		canonical: '/',
	},
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'SoftwareApplication',
							name: 'Yournaly',
							description: 'AI-powered writing assistant for language learners',
							applicationCategory: 'EducationalApplication',
							operatingSystem: 'Chrome Browser',
							offers: {
								'@type': 'Offer',
								price: '0',
								priceCurrency: 'USD',
							},
							publisher: {
								'@type': 'Organization',
								name: 'Astrobit LLC',
								url: 'https://www.goastrobit.com',
							},
							url: SITE_URL,
							downloadUrl: CHROME_STORE_URL,
							screenshot: `${SITE_URL}/og-image.png`,
							featureList: [
								'AI-powered grammar checking',
								'Writing tone analysis',
								'Language learning feedback',
								'Real-time suggestions',
								'Personalized writing guidance',
							],
						}),
					}}
				/>
			</head>
			<body className={`${deliusSwashCaps.variable} ${notoSans.variable} antialiased`}>
				<Analytics />
				<Navbar />
				<PageWrapper>{children}</PageWrapper>
				<Footer />
			</body>
		</html>
	);
}
