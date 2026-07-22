import type { GoogleTokenRequest } from '@/lib/schemas/auth.schemas';
import type { Request } from 'express';

import { googleOAuthService, verifyGoogleTokenService } from '@/services/auth.service';
import { createSuccessResponse } from '@/lib/utils/responseUtils';
import { asyncHandler } from '@/middlewares/error.middleware';

export const googleTokenController = asyncHandler(async (req: Request) => {
  const { token, organizationCode } = req.body as GoogleTokenRequest;

  const profile = await verifyGoogleTokenService(token);

  const serviceArgs = {
    profile,
    ...(organizationCode && { organizationCode }),
  };

  const result = await googleOAuthService(serviceArgs);

  return createSuccessResponse(result, 'Google authentication successful');
});
