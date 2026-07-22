import { openAIConfig } from '@/configs/openAI.config';

import OpenAI from 'openai';

class OpenAIAgent {
  private static instance: OpenAI;

  private constructor() {}

  public static getInstance(): OpenAI {
    if (!OpenAIAgent.instance) {
      OpenAIAgent.instance = new OpenAI({
        baseURL: openAIConfig.baseURL,
        apiKey: openAIConfig.apiKey,
        defaultHeaders: {
          'HTTP-Referer': openAIConfig.httpReferer,
          'X-Title': openAIConfig.appTitle,
        },
      });
    }

    return OpenAIAgent.instance;
  }
}

export const openAIAgent = OpenAIAgent.getInstance();

export { OpenAIAgent };
