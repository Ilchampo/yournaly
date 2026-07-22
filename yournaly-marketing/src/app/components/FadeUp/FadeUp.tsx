'use client';

import React from 'react';

import { FADE_UP_VARIANTS } from '@constants/motion.constant';
import { motion } from 'framer-motion';

interface FadeUpProps {
	children: React.ReactNode;
}

const FadeUp: React.FC<FadeUpProps> = ({ children }) => {
	return (
		<motion.div variants={FADE_UP_VARIANTS} initial="hidden" animate="show">
			{children}
		</motion.div>
	);
};

export default FadeUp;
