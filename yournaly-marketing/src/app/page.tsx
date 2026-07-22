import type { Metadata } from 'next';
import React from 'react';

import FeatureSection from '@sections/FeatureSection/FeatureSection';
import HeroSection from '@sections/HeroSection/HeroSection';
import HowSection from '@sections/HowSection/HowSection';

export const metadata: Metadata = {
	title: {
		absolute: 'Yournaly - AI Writing Assistant for Language Learners | Chrome Extension',
	},
	description:
		"Transform your writing with Yournaly's AI-powered feedback. Perfect for ESL students and language learners. Get instant grammar corrections, tone suggestions, and personalized writing guidance with our free Chrome extension.",
	alternates: {
		canonical: '/',
	},
};

const HomePage: React.FC = () => {
	return (
		<main>
			<section id="hero" aria-label="Hero section introducing Yournaly AI writing assistant">
				<HeroSection />
			</section>
			<section id="how" aria-label="How Yournaly helps you learn and improve your writing">
				<HowSection />
			</section>
			<section id="features" aria-label="Key features of Yournaly writing assistant">
				<FeatureSection />
			</section>
		</main>
	);
};

export default HomePage;
