import { idSchema } from '@/lib/schemas/common.schemas';
import { createValidationSchema } from '@/middlewares/validation.middleware';
import { z } from 'zod';

export const generateJournalReviewAiSchema = createValidationSchema({
  body: z.object({
    organizationId: idSchema,
    originalText: z.string().min(1, 'Original text is required').max(10000, 'Text too long'),
    params: z.object({
      tone: z.enum(['original', 'formal', 'playful', 'academic', 'professional']),
      improveReadability: z.boolean(),
      targetLanguage: z.enum(['en', 'es', 'it', 'fr', 'pt']),
      reviewLanguage: z.enum(['en', 'es', 'it', 'fr', 'pt']),
      estimatedInks: z.number().int().min(1).optional(),
      advancedOptions: z
        .object({
          textLength: z.enum(['shorten', 'extend', 'none']).default('none'),
          minCharacters: z.number().int().min(0).nullable(),
          maxCharacters: z.number().int().min(0).nullable(),
        })
        .nullable(),
    }),
  }),
});

export const getJournalsSummarySchema = createValidationSchema({
  query: z.object({
    organizationId: idSchema,
    page: z.coerce.number().int().min(1).default(1).optional(),
    limit: z.coerce.number().int().min(1).max(10).default(10).optional(),
    sort: z.enum(['createdAt', 'score', 'inksUsed']).default('createdAt').optional(),
    order: z.enum(['asc', 'desc']).default('desc').optional(),
  }),
});

export const getJournalByIdSchema = createValidationSchema({
  params: z.object({
    id: idSchema,
  }),
  query: z.object({
    organizationId: idSchema,
  }),
});

export const softDeleteJournalSchema = createValidationSchema({
  params: z.object({
    id: idSchema,
  }),
  body: z.object({
    organizationId: idSchema,
  }),
});

export const updateJournalTitleSchema = createValidationSchema({
  params: z.object({
    id: idSchema,
  }),
  body: z.object({
    organizationId: idSchema,
    title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  }),
});

export type GenerateJournalReviewAiRequest = z.infer<typeof generateJournalReviewAiSchema.body>;

export type GetJournalsSummaryRequest = z.infer<typeof getJournalsSummarySchema.query>;

export type GetJournalByIdRequest = z.infer<typeof getJournalByIdSchema.params> &
  z.infer<typeof getJournalByIdSchema.query>;
