/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ApiResponse } from '@/lib/interfaces/response.interface';

import { ResponseCodes } from '@/lib/constants/responseCodes';

export const createResponse = <T = any>(statusCode: number, data: T, message?: string): ApiResponse<T> => {
  return {
    statusCode,
    data,
    ...(message && { message }),
  };
};

export const createSuccessResponse = <T = any>(data: T, message?: string): ApiResponse<T> => {
  return createResponse(ResponseCodes.SUCCESS, data, message);
};

export const createCreatedResponse = <T = any>(data: T, message?: string): ApiResponse<T> => {
  return createResponse(ResponseCodes.CREATED, data, message);
};

export const createNoContentResponse = (message?: string): ApiResponse<null> => {
  return createResponse(ResponseCodes.NO_CONTENT, null, message);
};

export const createBadRequestResponse = (message: string): ApiResponse<null> => {
  return createResponse(ResponseCodes.BAD_REQUEST, null, message);
};

export const createUnauthorizedResponse = (message: string): ApiResponse<null> => {
  return createResponse(ResponseCodes.UNAUTHORIZED, null, message);
};

export const createForbiddenResponse = (message: string): ApiResponse<null> => {
  return createResponse(ResponseCodes.FORBIDDEN, null, message);
};

export const createNotFoundResponse = (message: string): ApiResponse<null> => {
  return createResponse(ResponseCodes.NOT_FOUND, null, message);
};

export const createInternalErrorResponse = (message: string): ApiResponse<null> => {
  return createResponse(ResponseCodes.INTERNAL_SERVER_ERROR, null, message);
};
