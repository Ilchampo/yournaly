import type { DatabaseConfig } from '@/lib/interfaces/config.interface';

import { DEFAULT_DATABASE_CONFIG } from '@/lib/constants/defaultValues';
import { appConfig } from '@/configs/app.config';
import { config } from 'dotenv';

config();

const getDatabaseUrl = (): string => {
  const env = appConfig.env;

  const envConfig = {
    production: 'DATABASE_URL_PROD',
    development: 'DATABASE_URL_DEV',
  } as const;

  const envKey = envConfig[env as keyof typeof envConfig];

  if (envKey) {
    const databaseUrl = process.env[envKey] ?? process.env['DATABASE_URL'];

    if (!databaseUrl) {
      throw new Error(`${envKey} or DATABASE_URL is required for ${env} environment`);
    }

    return databaseUrl;
  }

  const databaseUrl = process.env['DATABASE_URL'];

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required');
  }

  return databaseUrl;
};

export const databaseConfig: DatabaseConfig = {
  url: getDatabaseUrl(),
  logLevel: appConfig.env === 'development' ? ['error', 'warn'] : ['error'],
  connectionLimit: parseInt(process.env['DB_CONNECTION_LIMIT'] ?? DEFAULT_DATABASE_CONFIG.connectionLimit.toString()),
  acquireTimeout: parseInt(process.env['DB_ACQUIRE_TIMEOUT'] ?? DEFAULT_DATABASE_CONFIG.acquireTimeout.toString()),
  timeout: parseInt(process.env['DB_TIMEOUT'] ?? DEFAULT_DATABASE_CONFIG.timeout.toString()),
};
