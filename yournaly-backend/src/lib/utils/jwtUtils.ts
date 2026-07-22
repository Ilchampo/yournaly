import type { JWTPayload } from '@/lib/interfaces/auth.interface';

import { authConfig } from '@/configs/auth.config';

import jwt from 'jsonwebtoken';

export const generateToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
  try {
    const secret = authConfig.jwt.secret;
    const options: jwt.SignOptions = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expiresIn: authConfig.jwt.expiresIn as any,
    };

    return jwt.sign(payload, secret, options);
  } catch (error) {
    throw new Error(`Failed to generate JWT token: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const generateRefreshToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
  try {
    const secret = authConfig.jwt.secret;

    const options: jwt.SignOptions = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expiresIn: authConfig.jwt.refreshExpiresIn as any,
    };

    return jwt.sign(payload, secret, options);
  } catch (error) {
    throw new Error(`Failed to generate refresh token: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    const secret = authConfig.jwt.secret;
    const decoded = jwt.verify(token, secret) as JWTPayload;

    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token has expired');
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }

    throw new Error(`Token verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  try {
    const secret = authConfig.jwt.secret;
    const decoded = jwt.verify(token, secret) as JWTPayload;

    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Refresh token has expired');
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid refresh token');
    }

    throw new Error(`Refresh token verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
