'use client';

import React from 'react';

import { CONTAINER_VARIANTS, FADE_UP_VARIANTS } from '@constants/motion.constant';
import { STEPS } from '@constants/steps.constant';
import { motion } from 'framer-motion';

import SectionTitle from '@components/SectionTitle/SectionTitle';
import StepCard from '@components/StepCard/StepCard';

const HowSection: React.FC = () => {
	return (
		<div className="py-16 md:py-24">
			<motion.div
				variants={FADE_UP_VARIANTS}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.6 }}
			>
				<SectionTitle title="How Yournaly Helps You Learn" />
			</motion.div>
			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-6 items-stretch"
				variants={CONTAINER_VARIANTS}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, amount: 0.2 }}
			>
				{STEPS.map((step, index) => (
					<motion.div key={step.title} variants={FADE_UP_VARIANTS}>
						<StepCard index={index} step={step} />
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};

export default HowSection;
