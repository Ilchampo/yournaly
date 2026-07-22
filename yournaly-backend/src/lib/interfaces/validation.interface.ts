import type { AnyZodObject } from 'zod';

export interface ValidationSchema {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}
