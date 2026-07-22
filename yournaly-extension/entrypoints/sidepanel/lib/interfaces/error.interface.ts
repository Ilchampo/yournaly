import type { ErrorInfo, ReactNode } from 'react';

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
	errorInfo?: ErrorInfo;
	errorId?: string;
}

export interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
	showDetails?: boolean;
}

export interface ErrorReport {
	message: string;
	stack?: string;
	componentStack?: string;
	errorId: string;
	timestamp: string;
	userAgent: string;
	url: string;
	userId?: string;
	severity: ErrorSeverity;
	context?: Record<string, unknown>;
}

export interface ErrorServiceConfig {
	enableConsoleLogging: boolean;
	enableRemoteLogging: boolean;
	apiEndpoint?: string;
	maxRetries: number;
}
