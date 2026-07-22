export interface ErrorResponse {
  error: string;
  message: string;
  type?: string | undefined;
  code?: number;
  stack?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  statusCode: number;
  data: T;
  message?: string;
}
