import type { Environment } from '@lib/types';

const ENVIRONMENT = import.meta.env.WXT_APP_ENVIRONMENT as Environment;
const PROD_URL = import.meta.env.WXT_API_PROD as string;
const DEV_URL = import.meta.env.WXT_API_DEV as string;

export const config = {
	api: {
		baseUrl: ENVIRONMENT === 'production' ? PROD_URL : DEV_URL,
	},
	app: {
		environment: ENVIRONMENT,
	},
} as const;
