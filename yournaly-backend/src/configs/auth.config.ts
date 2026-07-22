import type { AuthConfig } from '@/lib/interfaces/config.interface';

import { DEFAULT_AUTH_CONFIG } from '@/lib/constants/defaultValues';
import { TimeUnits } from '@/lib/constants/magicNumbers';
import { appConfig } from '@/configs/app.config';
import { config } from 'dotenv';

config();

const resolveJwtSecret = (): string => {
  const secret = process.env['JWT_SECRET'];

  if (!secret || secret === DEFAULT_AUTH_CONFIG.jwt.secret || secret.length < 32) {
    throw new Error('JWT_SECRET is required and must be at least 32 characters (do not use the default placeholder)');
  }

  return secret;
};

const resolveGoogleClientId = (): string => {
  const clientId = process.env['GOOGLE_CLIENT_ID'] ?? DEFAULT_AUTH_CONFIG.google.clientId;

  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID is required');
  }

  return clientId;
};

export const authConfig: AuthConfig = {
  google: {
    clientId: resolveGoogleClientId(),
    userInfoUrl: process.env['GOOGLE_USER_INFO_URL'] ?? DEFAULT_AUTH_CONFIG.google.userInfoUrl,
    tokenInfoUrl: process.env['GOOGLE_TOKEN_INFO_URL'] ?? DEFAULT_AUTH_CONFIG.google.tokenInfoUrl,
  },
  jwt: {
    secret: resolveJwtSecret(),
    expiresIn: process.env['JWT_EXPIRES_IN'] ?? DEFAULT_AUTH_CONFIG.jwt.expiresIn,
    refreshExpiresIn: process.env['JWT_REFRESH_EXPIRES_IN'] ?? DEFAULT_AUTH_CONFIG.jwt.refreshExpiresIn,
  },
  sessionSecret: process.env['SESSION_SECRET'] ?? DEFAULT_AUTH_CONFIG.sessionSecret,
  cookieSecure: appConfig.env === 'production',
  cookieHttpOnly: true,
  cookieMaxAge: TimeUnits.week,
};
