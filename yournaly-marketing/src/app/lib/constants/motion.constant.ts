import { Variants } from 'framer-motion';

export const CONTAINER_VARIANTS: Variants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.15,
		},
	},
};

export const FADE_UP_VARIANTS: Variants = {
	hidden: { opacity: 0, y: 40 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
	},
};

export const IMAGE_VARIANTS: Variants = {
	hidden: { opacity: 0, scale: 0.95, y: 40 },
	show: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { duration: 1, ease: [0.4, 0, 0.2, 1] },
	},
};
