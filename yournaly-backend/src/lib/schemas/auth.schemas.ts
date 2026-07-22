import { createValidationSchema } from '@/middlewares/validation.middleware';
import { z } from 'zod';

export const googleTokenSchema = createValidationSchema({
  body: z.object({
    token: z.string().min(1, 'Google token is required'),
    organizationCode: z.string().optional(),
  }),
});

export type GoogleTokenRequest = z.infer<typeof googleTokenSchema.body>;
