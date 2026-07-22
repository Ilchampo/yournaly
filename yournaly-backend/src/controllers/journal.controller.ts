import type { Request } from 'express';
import type { GetJournalsSummaryServiceArgs } from '@/lib/interfaces/journal.interface';
import type { JournalSortField, JournalSortOrder } from '@/lib/_types';

import { createSuccessResponse } from '@/lib/utils/responseUtils';
import { asyncHandler } from '@/middlewares/error.middleware';
import {
  generateJournalReviewAiService,
  getJournalsSummaryService,
  getJournalByIdService,
  softDeleteJournalService,
  updateJournalTitleService,
} from '@/services/journal.service';

export const generateJournalReviewAiController = asyncHandler(async (req: Request) => {
  const { organizationId, originalText, params } = req.body;

  const userId = (req as unknown as { user: { userId: string } }).user?.userId;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const review = await generateJournalReviewAiService({
    userId,
    organizationId,
    originalText,
    params,
  });

  return createSuccessResponse(review, 'Journal review generated successfully');
});

export const getJournalsSummaryController = asyncHandler(async (req: Request) => {
  const { organizationId, page, limit, sort, order } = req.query;

  const userId = (req as unknown as { user: { userId: string } }).user?.userId;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const serviceArgs: GetJournalsSummaryServiceArgs = {
    organizationId: organizationId as string,
    userId,
  };

  if (page) {
    serviceArgs.page = Number(page);
  }

  if (limit) {
    serviceArgs.limit = Number(limit);
  }

  if (sort) {
    serviceArgs.sort = sort as JournalSortField;
  }

  if (order) {
    serviceArgs.order = order as JournalSortOrder;
  }

  const result = await getJournalsSummaryService(serviceArgs);

  return createSuccessResponse(result, 'Journal summary retrieved successfully');
});

export const getJournalByIdController = asyncHandler(async (req: Request) => {
  const { id } = req.params;
  const { organizationId } = req.query;

  const userId = (req as unknown as { user: { userId: string } }).user?.userId;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  if (!id || typeof id !== 'string') {
    throw new Error('Journal ID is required');
  }

  if (!organizationId || typeof organizationId !== 'string') {
    throw new Error('Organization ID is required');
  }

  const journal = await getJournalByIdService({
    journalId: id,
    userId,
    organizationId,
  });

  return createSuccessResponse(journal, 'Journal retrieved successfully');
});

export const softDeleteJournalController = asyncHandler(async (req: Request) => {
  const { id } = req.params;
  const { organizationId } = req.body;

  const userId = (req as unknown as { user: { userId: string } }).user?.userId;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  if (!id || typeof id !== 'string') {
    throw new Error('Journal ID is required');
  }

  if (!organizationId || typeof organizationId !== 'string') {
    throw new Error('Organization ID is required');
  }

  const result = await softDeleteJournalService({
    userId,
    organizationId,
    journalId: id,
  });

  return createSuccessResponse(result, result.message);
});

export const updateJournalTitleController = asyncHandler(async (req: Request) => {
  const { id } = req.params;
  const { organizationId, title } = req.body;

  const userId = (req as unknown as { user: { userId: string } }).user?.userId;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  if (!id || typeof id !== 'string') {
    throw new Error('Journal ID is required');
  }

  if (!organizationId || typeof organizationId !== 'string') {
    throw new Error('Organization ID is required');
  }

  if (!title || typeof title !== 'string') {
    throw new Error('Title is required');
  }

  const result = await updateJournalTitleService({
    userId,
    organizationId,
    journalId: id,
    title,
  });

  return createSuccessResponse(result, 'Journal title updated successfully');
});
