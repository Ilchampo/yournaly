import type { ErrorBoundaryProps, ErrorBoundaryState } from '@interfaces/error.interface';
import type { ErrorInfo } from 'react';

import { ErrorService } from '@services/error.service';
import { AlertTriangleIcon, HomeIcon, RefreshCwIcon } from 'lucide-react';
import { Component } from 'react';

import ActionButton from '@components/common/ActionButton/ActionButton';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return {
			hasError: true,
			error,
			errorId: ErrorService.generateErrorId(),
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		const { onError } = this.props;

		this.setState({ errorInfo });

		if (onError) {
			onError(error, errorInfo);
		}

		ErrorService.reportUIError(error, errorInfo, {
			errorBoundary: true,
			errorId: this.state.errorId,
		});
	}

	private handleRetry = () => {
		this.setState({ hasError: false, error: undefined, errorInfo: undefined, errorId: undefined });
	};

	private handleGoHome = () => {
		this.setState({ hasError: false, error: undefined, errorInfo: undefined, errorId: undefined });
		window.location.href = '/home';
	};

	private handleReload = () => {
		window.location.reload();
	};

	render() {
		const { hasError, error, errorInfo, errorId } = this.state;
		const { children, fallback, showDetails = false } = this.props;

		if (hasError) {
			if (fallback) {
				return fallback;
			}

			return (
				<div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
					<div className="max-w-md w-full bg-surface-100 rounded-lg shadow-lg p-6 text-center">
						<div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
							<AlertTriangleIcon className="w-8 h-8 text-red-600" />
						</div>

						<h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>

						<p className="text-gray-600 mb-6">
							We encountered an unexpected error. Don't worry, your data is safe.
						</p>

						{showDetails && error && (
							<details className="mb-6 text-left">
								<summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
									Error Details
								</summary>
								<div className="mt-2 p-3 bg-gray-50 rounded text-xs font-mono text-gray-700 overflow-auto max-h-32">
									<p>
										<strong>Error:</strong> {error.message}
									</p>
									{errorId && (
										<p>
											<strong>Error ID:</strong> {errorId}
										</p>
									)}
									{errorInfo && (
										<p>
											<strong>Component Stack:</strong> {errorInfo.componentStack}
										</p>
									)}
								</div>
							</details>
						)}

						<div className="space-y-3">
							<ActionButton onClick={this.handleRetry} ariaLabel="Try again" primary className="w-full">
								<RefreshCwIcon className="w-4 h-4 mr-2" />
								Try Again
							</ActionButton>

							<ActionButton onClick={this.handleGoHome} ariaLabel="Go to home" className="w-full">
								<HomeIcon className="w-4 h-4 mr-2" />
								Go to Home
							</ActionButton>

							<ActionButton onClick={this.handleReload} ariaLabel="Reload page" className="w-full">
								<RefreshCwIcon className="w-4 h-4 mr-2" />
								Reload Page
							</ActionButton>
						</div>

						{errorId && <p className="mt-4 text-xs text-gray-500">Error ID: {errorId}</p>}
					</div>
				</div>
			);
		}

		return children;
	}
}

export default ErrorBoundary;
