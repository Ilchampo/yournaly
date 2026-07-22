'use client';

import React from 'react';

import { FEATURES } from '@constants/features.constant';
import { CONTAINER_VARIANTS, FADE_UP_VARIANTS } from '@constants/motion.constant';
import { useIsMobile } from '@hooks/useIsMobile';
import { ASSETS } from '@lib/assets';
import { motion } from 'framer-motion';

import Feature from '@components/Feature/Feature';
import Image from 'next/image';

const FeatureSection: React.FC = () => {
	const { isMobile } = useIsMobile();

	return (
		<div className="py-16 md:py-24">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row gap-10 md:gap-16">
					<motion.div
						className="md:w-2/5"
						variants={FADE_UP_VARIANTS}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.1 }}
					>
						<h2 className="text-3xl md:text-4xl mb-6">Features Designed for Language Learners</h2>
						<div className="w-20 h-1 bg-primary-700 rounded-full mb-6"></div>
						<p className="text-lg">
							Yournaly is built to help you write better and learn faster. Every feature is designed with
							language learners in mind—so you feel supported, not overwhelmed.
						</p>
						<div className="flex flex-col relative mt-4">
							<div className="absolute left-1/2 -top-2 transform -translate-x-1/2">
								<div className="bg-cyan-400/50 w-32 h-8 flex items-center justify-center transform shadow-sm" />
							</div>
							<Image
								src={isMobile ? ASSETS.FEATURE_SMALL : ASSETS.FEATURE_LARGE}
								alt="Yournaly features overview for AI writing feedback and language learning"
								className="w-full h-auto shadow-xl my-4 object-contain"
								width={isMobile ? 100 : 300}
								height={isMobile ? 300 : 500}
								priority
								loading="eager"
							/>
						</div>
					</motion.div>
					<div className="hidden md:block w-px mx-4"></div>
					<motion.div
						className="md:w-3/5"
						variants={CONTAINER_VARIANTS}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, amount: 0.2 }}
					>
						<div className="space-y-10">
							{FEATURES.map(feature => (
								<motion.div key={feature.title} variants={FADE_UP_VARIANTS}>
									<Feature feature={feature} />
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default FeatureSection;
