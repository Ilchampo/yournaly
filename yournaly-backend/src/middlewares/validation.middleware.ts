import type { Request, Response, NextFunction, RequestHandler } from 'express';
import type { ValidationSchema, ValidationError } from '@/lib/interfaces/validation.interface';

import { ResponseCodes } from '@/lib/constants/responseCodes';
import { ZodError } from 'zod';

export class ValidationErrorResponse {
  public readonly statusCode: number = ResponseCodes.BAD_REQUEST;
  public readonly message: string = 'Validation failed';
  public readonly errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    this.errors = errors;
  }
}

export const validateRequest = (schema: ValidationSchema): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }

      if (schema.query) {
        await schema.query.parseAsync(req.query);
      }

      if (schema.params) {
        req.params = await schema.params.parseAsync(req.params);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors: ValidationError[] = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        }));

        const validationResponse = new ValidationErrorResponse(validationErrors);

        res.status(validationResponse.statusCode).json({
          success: false,
          message: validationResponse.message,
          errors: validationResponse.errors,
        });
        return;
      }

      next(error);
    }
  };
};

export const createValidationSchema = <T extends ValidationSchema>(schema: T): T => {
  return schema;
};
