import type { AuthError } from '@/lib/interfaces/auth.interface';

import { ResponseCodes } from '@/lib/constants/responseCodes';
import { AuthErrorType } from '@/lib/interfaces/auth.interface';

export class AuthenticationError extends Error {
  public readonly type: AuthErrorType;
  public readonly code: number;
  public readonly isOperational: boolean;

  constructor(error: AuthError) {
    super(error.message);
    this.name = 'AuthenticationError';
    this.type = error.type;
    this.code = error.code ?? ResponseCodes.UNAUTHORIZED;
    this.isOperational = true;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthenticationError);
    }
  }
}

export class InvalidCredentialsError extends AuthenticationError {
  constructor(message = 'Invalid credentials') {
    super({
      type: AuthErrorType.INVALID_CREDENTIALS,
      message,
      code: ResponseCodes.UNAUTHORIZED,
    });

    this.name = 'InvalidCredentialsError';
  }
}

export class UserNotFoundError extends AuthenticationError {
  constructor(message = 'User not found') {
    super({
      type: AuthErrorType.USER_NOT_FOUND,
      message,
      code: ResponseCodes.NOT_FOUND,
    });

    this.name = 'UserNotFoundError';
  }
}

export class EmailNotVerifiedError extends AuthenticationError {
  constructor(message = 'Email not verified') {
    super({
      type: AuthErrorType.EMAIL_NOT_VERIFIED,
      message,
      code: ResponseCodes.FORBIDDEN,
    });

    this.name = 'EmailNotVerifiedError';
  }
}

export class OAuthError extends AuthenticationError {
  constructor(message = 'OAuth authentication failed') {
    super({
      type: AuthErrorType.OAUTH_ERROR,
      message,
      code: ResponseCodes.INTERNAL_SERVER_ERROR,
    });

    this.name = 'OAuthError';
  }
}

export class TokenExpiredError extends AuthenticationError {
  constructor(message = 'Token has expired') {
    super({
      type: AuthErrorType.TOKEN_EXPIRED,
      message,
      code: ResponseCodes.UNAUTHORIZED,
    });

    this.name = 'TokenExpiredError';
  }
}

export class TokenInvalidError extends AuthenticationError {
  constructor(message = 'Invalid token') {
    super({
      type: AuthErrorType.TOKEN_INVALID,
      message,
      code: ResponseCodes.UNAUTHORIZED,
    });

    this.name = 'TokenInvalidError';
  }
}

export class InsufficientPermissionsError extends AuthenticationError {
  constructor(message = 'Insufficient permissions') {
    super({
      type: AuthErrorType.INSUFFICIENT_PERMISSIONS,
      message,
      code: ResponseCodes.FORBIDDEN,
    });

    this.name = 'InsufficientPermissionsError';
  }
}

export class OrganizationNotFoundError extends AuthenticationError {
  constructor(message = 'Organization not found') {
    super({
      type: AuthErrorType.ORGANIZATION_NOT_FOUND,
      message,
      code: ResponseCodes.NOT_FOUND,
    });

    this.name = 'OrganizationNotFoundError';
  }
}

export class OrganizationInactiveError extends AuthenticationError {
  constructor(message = 'Organization is inactive') {
    super({
      type: AuthErrorType.ORGANIZATION_INACTIVE,
      message,
      code: ResponseCodes.FORBIDDEN,
    });

    this.name = 'OrganizationInactiveError';
  }
}

export const createAuthError = (type: AuthErrorType, message?: string): AuthenticationError => {
  const errorMap = {
    [AuthErrorType.INVALID_CREDENTIALS]: InvalidCredentialsError,
    [AuthErrorType.USER_NOT_FOUND]: UserNotFoundError,
    [AuthErrorType.EMAIL_NOT_VERIFIED]: EmailNotVerifiedError,
    [AuthErrorType.OAUTH_ERROR]: OAuthError,
    [AuthErrorType.TOKEN_EXPIRED]: TokenExpiredError,
    [AuthErrorType.TOKEN_INVALID]: TokenInvalidError,
    [AuthErrorType.INSUFFICIENT_PERMISSIONS]: InsufficientPermissionsError,
    [AuthErrorType.ORGANIZATION_NOT_FOUND]: OrganizationNotFoundError,
    [AuthErrorType.ORGANIZATION_INACTIVE]: OrganizationInactiveError,
  };

  const ErrorClass = errorMap[type];

  return new ErrorClass(message);
};
