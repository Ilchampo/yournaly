import { openAIConfig } from '@/configs/openAI.config';
import { openAIAgent } from '@/openAI';

export const requestOpenAIService = async (prompt: string) => {
  const response = await openAIAgent.responses.create({
    model: openAIConfig.model,
    input: prompt,
    text: { format: { type: 'json_object' } },
  });

  return response.output_text;
};
