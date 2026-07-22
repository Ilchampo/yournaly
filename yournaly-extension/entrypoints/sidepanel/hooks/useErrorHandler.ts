import { ErrorService } from '@services/error.service';
import { useCallback } from 'react';

export const useErrorHandler = () => {
	const reportError = useCallback((error: Error, context?: Record<string, unknown>) => {
		ErrorService.reportApiError(error, context);
	}, []);

	const reportCriticalError = useCallback((error: Error, context?: Record<string, unknown>) => {
		ErrorService.reportCriticalError(error, context);
	}, []);

	const handleAsyncError = useCallback(
		async <T>(
			asyncFn: () => Promise<T>,
			context?: Record<string, unknown>,
			onError?: (error: Error) => void,
		): Promise<T | null> => {
			try {
				return await asyncFn();
			} catch (error) {
				const errorObj = error instanceof Error ? error : new Error('Unknown async error');

				ErrorService.reportApiError(errorObj, context);

				if (onError) {
					onError(errorObj);
				}

				return null;
			}
		},
		[],
	);

	const wrapAsyncAction = useCallback(
		<T extends unknown[], R>(asyncFn: (...args: T) => Promise<R>, context?: Record<string, unknown>) => {
			return async (...args: T): Promise<R | null> => {
				try {
					return await asyncFn(...args);
				} catch (error) {
					const errorObj = error instanceof Error ? error : new Error('Unknown error in wrapped action');

					ErrorService.reportApiError(errorObj, {
						...context,
						functionName: asyncFn.name,
						arguments: args,
					});

					throw errorObj;
				}
			};
		},
		[],
	);

	return {
		reportError,
		reportCriticalError,
		handleAsyncError,
		wrapAsyncAction,
	};
};
