import { idSchema } from '@/lib/schemas/common.schemas';
import { createValidationSchema } from '@/middlewares/validation.middleware';
import { z } from 'zod';

export const updateUserPreferencesSchema = createValidationSchema({
  body: z.object({
    organizationId: idSchema,
    defaultLanguage: z.enum(['en', 'es', 'it', 'fr', 'pt']),
    defaultTone: z.enum(['original', 'formal', 'playful', 'academic', 'professional']),
    defaultTarget: z.enum(['en', 'es', 'it', 'fr', 'pt']),
    theme: z.enum(['default']),
  }),
});
