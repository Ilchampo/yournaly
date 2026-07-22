import type { ErrorReport, ErrorServiceConfig } from '@interfaces/error.interface';
import type { ErrorInfo } from 'react';

export class ErrorService {
	private static config: ErrorServiceConfig = {
		enableConsoleLogging: true,
		enableRemoteLogging: false,
		maxRetries: 3,
	};

	static configure(config: Partial<ErrorServiceConfig>) {
		this.config = { ...this.config, ...config };
	}

	static generateErrorId(): string {
		return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	static createErrorReport(
		error: Error,
		errorInfo?: ErrorInfo,
		context?: Record<string, unknown>,
		severity: ErrorReport['severity'] = 'medium',
	): ErrorReport {
		return {
			message: error.message,
			stack: error.stack,
			componentStack: errorInfo?.componentStack ?? undefined,
			errorId: this.generateErrorId(),
			timestamp: new Date().toISOString(),
			userAgent: navigator.userAgent,
			url: window.location.href,
			severity,
			context,
		};
	}

	static async reportError(errorReport: ErrorReport): Promise<void> {
		if (this.config.enableConsoleLogging) {
			console.error('Error Report:', errorReport);
		}

		if (this.config.enableRemoteLogging && this.config.apiEndpoint) {
			try {
				await this.sendToRemoteService(errorReport);
			} catch (remoteError) {
				console.error('Failed to send error to remote service:', remoteError);
			}
		}

		this.storeErrorLocally(errorReport);
	}

	private static async sendToRemoteService(errorReport: ErrorReport): Promise<void> {
		if (!this.config.apiEndpoint) {
			return;
		}

		const response = await fetch(`${this.config.apiEndpoint}/errors`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(errorReport),
		});

		if (!response.ok) {
			throw new Error(`Failed to send error report: ${response.status}`);
		}
	}

	private static storeErrorLocally(errorReport: ErrorReport): void {
		try {
			const errors = this.getStoredErrors();
			errors.push(errorReport);

			const recentErrors = errors.slice(-10);
			localStorage.setItem('wxt_errors', JSON.stringify(recentErrors));
		} catch (storageError) {
			console.error('Failed to store error locally:', storageError);
		}
	}

	static getStoredErrors(): ErrorReport[] {
		try {
			const stored = localStorage.getItem('yournaly_errors');

			return stored ? JSON.parse(stored) : [];
		} catch {
			return [];
		}
	}

	static clearStoredErrors(): void {
		try {
			localStorage.removeItem('yournaly_errors');
		} catch (error) {
			console.error('Failed to clear stored errors:', error);
		}
	}

	static reportApiError(error: Error, context?: Record<string, unknown>): void {
		const errorReport = this.createErrorReport(error, undefined, context, 'high');
		this.reportError(errorReport);
	}

	static reportUIError(error: Error, errorInfo: ErrorInfo, context?: Record<string, unknown>): void {
		const errorReport = this.createErrorReport(error, errorInfo, context, 'medium');
		this.reportError(errorReport);
	}

	static reportCriticalError(error: Error, context?: Record<string, unknown>): void {
		const errorReport = this.createErrorReport(error, undefined, context, 'critical');
		this.reportError(errorReport);
	}
}
