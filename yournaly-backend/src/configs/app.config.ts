import type { AppConfig } from '@/lib/interfaces/config.interface';

import { DEFAULT_APP_CONFIG } from '@/lib/constants/defaultValues';
import { config } from 'dotenv';

config();

export const appConfig: AppConfig = {
  port: Number(process.env['PORT']) || DEFAULT_APP_CONFIG.port,
  env: process.env['NODE_ENV'] ?? DEFAULT_APP_CONFIG.env,
  corsOrigins: process.env['CORS_ORIGINS']?.split(',') ?? DEFAULT_APP_CONFIG.corsOrigins,
  version: process.env['APP_VERSION'] ?? DEFAULT_APP_CONFIG.version,
};
