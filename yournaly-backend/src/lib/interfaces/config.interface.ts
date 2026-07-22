import type { Prisma } from '@/generated/prisma';

export interface AppConfig {
  port: number;
  env: string;
  corsOrigins: string[];
  version: string;
}

export interface AuthGoogle {
  clientId: string;
  userInfoUrl: string;
  tokenInfoUrl: string;
}

export interface JWTConfig {
  secret: string;
  expiresIn: string;
  refreshExpiresIn: string;
}

export interface AuthConfig {
  google: AuthGoogle;
  jwt: JWTConfig;
  sessionSecret: string;
  cookieSecure: boolean;
  cookieHttpOnly: boolean;
  cookieMaxAge: number;
}

export interface DatabaseConfig {
  url: string;
  logLevel: Prisma.LogLevel[];
  connectionLimit: number;
  acquireTimeout: number;
  timeout: number;
}

export interface OpenAIConfig {
  apiKey: string;
  model: string;
  baseURL: string;
  httpReferer: string;
  appTitle: string;
}
