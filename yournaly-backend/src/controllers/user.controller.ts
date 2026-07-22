import type { Request } from 'express';

import { createSuccessResponse } from '@/lib/utils/responseUtils';
import { asyncHandler } from '@/middlewares/error.middleware';
import { updateUserPreferencesService } from '@/services/user.service';

export const updateUserPreferencesController = asyncHandler(async (req: Request) => {
  const { organizationId, defaultLanguage, defaultTone, defaultTarget, theme } = req.body;

  const userId = (req as unknown as { user: { userId: string } }).user?.userId;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const updatedPreferences = await updateUserPreferencesService({
    userId,
    organizationId,
    defaultLanguage,
    defaultTone,
    defaultTarget,
    theme,
  });

  return createSuccessResponse(updatedPreferences, 'User preferences updated successfully');
});
