import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '@/lib/interfaces/auth.interface';

import { TokenExpiredError, TokenInvalidError } from '@/lib/handlers/authError.handler';
import { ResponseCodes } from '@/lib/constants/responseCodes';
import { verifyToken } from '@/lib/utils/jwtUtils';

export const authenticateJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new TokenInvalidError('No authorization header');
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

    if (!token) {
      throw new TokenInvalidError('No token provided');
    }

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(ResponseCodes.UNAUTHORIZED).json({
        error: 'Token expired',
        message: error.message,
        type: 'TOKEN_EXPIRED',
      });

      return;
    }

    if (error instanceof TokenInvalidError) {
      res.status(ResponseCodes.UNAUTHORIZED).json({
        error: 'Invalid token',
        message: error.message,
        type: 'TOKEN_INVALID',
      });

      return;
    }

    res.status(ResponseCodes.UNAUTHORIZED).json({
      error: 'Authentication failed',
      message: 'Invalid or expired token',
      type: 'AUTHENTICATION_FAILED',
    });
  }
};
