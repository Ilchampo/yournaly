import type { Request, Response, NextFunction, RequestHandler } from 'express';
import type { ErrorResponse } from '@/lib/interfaces/response.interface';
import type { ApiResponse } from '@/lib/interfaces/response.interface';

import { AuthenticationError } from '@/lib/handlers/authError.handler';
import { ResponseCodes } from '@/lib/constants/responseCodes';
import { appConfig } from '@/configs/app.config';

export const errorHandler = (error: Error, req: Request, res: Response, _next: NextFunction): void => {
  const errorResponse: ErrorResponse = {
    error: 'Internal Server Error',
    message: 'Something went wrong',
    code: ResponseCodes.INTERNAL_SERVER_ERROR,
  };

  switch (true) {
    case error instanceof AuthenticationError:
      errorResponse.error = error.name;
      errorResponse.message = error.message;
      if (error.type) {
        errorResponse.type = error.type;
      }
      errorResponse.code = error.code;
      break;

    case error.name === 'JsonWebTokenError':
      errorResponse.error = 'Invalid Token';
      errorResponse.message = 'The provided token is invalid';
      errorResponse.type = 'TOKEN_INVALID';
      errorResponse.code = ResponseCodes.UNAUTHORIZED;
      break;

    case error.name === 'TokenExpiredError':
      errorResponse.error = 'Token Expired';
      errorResponse.message = 'The provided token has expired';
      errorResponse.type = 'TOKEN_EXPIRED';
      errorResponse.code = ResponseCodes.UNAUTHORIZED;
      break;

    case error.name === 'ValidationError':
      errorResponse.error = 'Validation Error';
      errorResponse.message = error.message;
      errorResponse.type = 'VALIDATION_ERROR';
      errorResponse.code = ResponseCodes.BAD_REQUEST;
      break;

    case error.name === 'PrismaClientKnownRequestError':
      errorResponse.error = 'Database Error';
      errorResponse.message = 'A database operation failed';
      errorResponse.type = 'DATABASE_ERROR';
      errorResponse.code = ResponseCodes.INTERNAL_SERVER_ERROR;
      break;

    case !!error.message:
      errorResponse.error = error.name ?? 'Error';
      errorResponse.message = error.message;
      break;
  }

  if (appConfig.env === 'development') {
    errorResponse.stack = error.stack;
  }

  console.error('Error occurred:', {
    name: error.name,
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  res.status(errorResponse.code ?? ResponseCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
};

export const notFoundHandler = (req: Request, res: Response, _next: NextFunction): void => {
  res.status(ResponseCodes.NOT_FOUND).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`,
    type: 'NOT_FOUND',
    code: ResponseCodes.NOT_FOUND,
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asyncHandler = <T = any>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<ApiResponse<T> | void>
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next))
      .then(result => {
        if (result && typeof result === 'object' && 'statusCode' in result && 'data' in result) {
          const apiResponse = result as ApiResponse;

          res.status(apiResponse.statusCode).json({
            statusCode: apiResponse.statusCode,
            data: apiResponse.data,
            ...(apiResponse.message && { message: apiResponse.message }),
          });
        }
      })
      .catch(next);
  };
};
