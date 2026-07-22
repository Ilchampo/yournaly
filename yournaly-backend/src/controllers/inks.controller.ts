import type { Request } from 'express';

import { createSuccessResponse } from '@/lib/utils/responseUtils';
import { asyncHandler } from '@/middlewares/error.middleware';
import { getInkPackagesService } from '@/services/inks.service';

export const getInkPackagesController = asyncHandler(async (_req: Request) => {
  const packages = await getInkPackagesService();

  return createSuccessResponse(packages, 'Ink packages retrieved successfully');
});
