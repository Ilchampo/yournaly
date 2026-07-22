'use client';

import React from 'react';

import { CHROME_STORE_URL } from '@constants/site.constant';
import { CONTAINER_VARIANTS, FADE_UP_VARIANTS, IMAGE_VARIANTS } from '@constants/motion.constant';
import { useIsMobile } from '@hooks/useIsMobile';
import { ASSETS } from '@lib/assets';
import { motion } from 'framer-motion';

import ActionButton from '@components/ActionButton/ActionButton';
import Image from 'next/image';

const HeroSection: React.FC = () => {
	const { isMobile } = useIsMobile();

	return (
		<motion.div
			className="grid grid-cols-1 md:grid-cols-2 h-full items-center z-10"
			variants={CONTAINER_VARIANTS}
			initial="hidden"
			animate="show"
		>
			<div className="flex flex-col gap-4 mt-20 md:mt-0">
				<motion.div variants={FADE_UP_VARIANTS} layout>
					<a
						href="https://www.producthunt.com/products/yournaly?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-yournaly"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=997926&theme=light&t=1753547050066"
							alt="Yournaly - Let your creativity grow with every word | Product Hunt"
							style={{ width: '250px', height: '54px' }}
							width="250"
							height="54"
							className="mb-4"
						/>
					</a>
					<h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
						Let your creativity grow with every word
					</h1>
				</motion.div>
				<motion.p className="text-lg md:text-xl mb-8 max-w-lg" variants={FADE_UP_VARIANTS} layout>
					Your personal AI writing teacher designed for ESL students and language learners. Get instant
					grammar corrections, tone adjustments, and personalized feedback to improve your writing skills.
				</motion.p>
				<motion.div className="flex items-center gap-4" variants={FADE_UP_VARIANTS}>
					<ActionButton
						ariaLabel="Visit Chrome Web Store"
						className="w-full md:max-w-fit"
						href={CHROME_STORE_URL}
						primary
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 640 640"
							fill="currentColor"
							className="w-6 h-6"
							aria-hidden="true"
						>
							<path d="M64 320C64 273.4 76.5 229.6 98.3 191.1L208.1 382.3C230 421.5 271.9 448 320 448C334.3 448 347.1 445.7 360.8 441.4L284.5 573.6C159.9 556.3 64 449.3 64 320zM429.1 385.6C441.4 366.4 448 343.1 448 320C448 281.8 431.2 247.5 404.7 224L557.4 224C569.4 253.6 576 286.1 576 320C576 461.4 461.4 575.1 320 576L429.1 385.6zM541.8 192L320 192C257.1 192 206.3 236.1 194.5 294.7L118.2 162.5C165 102.5 238 64 320 64C414.8 64 497.5 115.5 541.8 192zM408 320C408 368.6 368.6 408 320 408C271.4 408 232 368.6 232 320C232 271.4 271.4 232 320 232C368.6 232 408 271.4 408 320z" />
						</svg>
						<span className="ml-2">Chrome Store</span>
					</ActionButton>
				</motion.div>
			</div>
			<motion.div className="w-full flex justify-center z-10" variants={IMAGE_VARIANTS}>
				<Image
					src={isMobile ? ASSETS.HERO_IMAGE_SMALL : ASSETS.HERO_IMAGE_LARGE}
					alt="Yournaly Chrome extension showing AI writing feedback for language learners"
					className="w-full h-full object-contain pt-10 md:pt-20"
					width={isMobile ? 300 : 500}
					height={isMobile ? 300 : 500}
					priority
					loading="eager"
				/>
			</motion.div>
		</motion.div>
	);
};

export default HeroSection;
