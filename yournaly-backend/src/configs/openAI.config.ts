import type { OpenAIConfig } from '@/lib/interfaces/config.interface';

import { DEFAULT_OPENAI_CONFIG } from '@/lib/constants/defaultValues';
import { config } from 'dotenv';

config();

const apiKey = process.env['OPENAI_API_KEY'] ?? DEFAULT_OPENAI_CONFIG.apiKey;

if (!apiKey) {
  throw new Error('OPENAI_API_KEY is required');
}

export const openAIConfig: OpenAIConfig = {
  apiKey,
  model: process.env['OPENAI_MODEL'] ?? DEFAULT_OPENAI_CONFIG.model,
  baseURL: process.env['OPENAI_BASE_URL'] ?? DEFAULT_OPENAI_CONFIG.baseURL,
  httpReferer: process.env['OPENAI_HTTP_REFERER'] ?? DEFAULT_OPENAI_CONFIG.httpReferer,
  appTitle: process.env['OPENAI_APP_TITLE'] ?? DEFAULT_OPENAI_CONFIG.appTitle,
};
