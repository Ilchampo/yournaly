import React from 'react';

import { useUserStore } from '@stores/user.store';
import { useState } from 'react';

import PrivacyPolicy from '@components/PrivacyPolicy/PrivacyPolicy';
import TermsService from '@components/TermsService/TermsService';
import ActionButton from '@components/common/ActionButton/ActionButton';
import Modal from '@components/common/Modal/Modal';
import Toast from '@components/common/Toast/Toast';

const DISABLE_APPLE_LOGIN = true;

const AuthPage: React.FC = () => {
	const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState<boolean>(false);
	const [isTermsServiceOpen, setIsTermsServiceOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const { loginWithGoogle } = useUserStore();

	const handleGoogleLogin = async () => {
		setIsLoading(true);
		setError(null);

		try {
			await loginWithGoogle();
		} catch (error) {
			console.error('Google authentication failed:', error);
			setError('Authentication failed. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center w-full h-full space-y-8 relative z-10">
			{error && <Toast message={error} type="error" />}
			<div className="flex flex-col items-center justify-center max-w-md h-full space-y-8 relative z-10 p-4">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-amber-800 mb-6">Yournaly.</h1>
					<h2 className="text-xl font-semibold text-amber-800">Welcome to your personal journal</h2>
					<p className="mt-2 text-sm text-amber-700">Let your creativity flow while you learn</p>
				</div>
				<div className="mt-8 space-y-3 flex flex-col items-center justify-center w-full">
					<ActionButton
						onClick={handleGoogleLogin}
						ariaLabel="Continue with Google"
						loading={isLoading}
						disabled={isLoading}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 488 512"
							fill="currentColor"
							className="w-5 h-5 mr-3"
						>
							<path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
						</svg>
						<span className="text-amber-800 font-medium">Continue with Google</span>
					</ActionButton>
					{!DISABLE_APPLE_LOGIN && (
						<ActionButton onClick={() => undefined} ariaLabel="Continue with Apple" disabled primary>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 384 512"
								fill="currentColor"
								className="w-6 h-6 mr-3"
							>
								<path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
							</svg>
							<span className="font-medium">Continue with Apple</span>
						</ActionButton>
					)}
				</div>
				<div className="mt-8 text-center">
					<p className="text-xs text-amber-700">
						By continuing, you agree to our{' '}
						<button
							onClick={() => setIsTermsServiceOpen(true)}
							className="text-amber-800 hover:text-amber-900 underline"
							type="button"
							aria-label="Terms of Service"
						>
							Terms of Service
						</button>{' '}
						and{' '}
						<button
							onClick={() => setIsPrivacyPolicyOpen(true)}
							className="text-amber-800 hover:text-amber-900 underline"
							type="button"
							aria-label="Privacy Policy"
						>
							Privacy Policy
						</button>
					</p>
				</div>
			</div>
			<Modal isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)} title="Privacy Policy">
				<PrivacyPolicy />
			</Modal>
			<Modal isOpen={isTermsServiceOpen} onClose={() => setIsTermsServiceOpen(false)} title="Terms of Service">
				<TermsService />
			</Modal>
		</div>
	);
};

export default AuthPage;
