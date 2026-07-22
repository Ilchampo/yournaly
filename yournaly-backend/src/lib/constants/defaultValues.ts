import { TimeUnits } from '@/lib/constants/magicNumbers';

export const DEFAULT_APP_CONFIG = {
  port: 3000,
  env: 'development',
  corsOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'chrome-extension://*',
    'chrome-extension://hmapfjoppnaaiidefjjndeppkjaklfjm',
  ],
  version: '1.0.0',
};

export const DEFAULT_AUTH_CONFIG = {
  google: {
    clientId: '',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
    tokenInfoUrl: 'https://oauth2.googleapis.com/tokeninfo',
  },
  jwt: {
    secret: 'jwt-secret',
    expiresIn: '7d',
    refreshExpiresIn: '30d',
  },
  sessionSecret: 'session-secret',
  cookieSecure: false,
  cookieHttpOnly: true,
  cookieMaxAge: TimeUnits.week,
};

export const DEFAULT_DATABASE_CONFIG = {
  url: '',
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
};

export const DEFAULT_OPENAI_CONFIG = {
  apiKey: '',
  model: 'openai/gpt-4.1-mini',
  baseURL: 'https://openrouter.ai/api/v1',
  httpReferer: 'https://yournaly.pablobeltran.com',
  appTitle: 'Yournaly Extension',
};

export const ORGANIZATION_CODE = 'YOURNALY' as const;

export const DEFAULT_USER_INKS = 100 as const;

export const DEFAULT_JOURNAL_TITLE = 'My Yournal' as const;

export const MAX_PREVIEW_LENGTH = 100 as const;

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  skip: 0,
  take: 10,
  orderBy: { createdAt: 'desc' },
  sort: 'createdAt',
  order: 'desc',
} as const;

export const DEFAULT_USER_PREFERENCES = {
  defaultLanguage: 'en',
  defaultTone: 'original',
  defaultTargetLanguage: 'en',
  uiTheme: 'default',
} as const;

export const DEFAULT_AI_AGENT_PARAMS = {
  temperature: 0.2,
} as const;
