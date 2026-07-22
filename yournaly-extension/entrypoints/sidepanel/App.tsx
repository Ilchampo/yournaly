import React from 'react';

import { config } from '@lib/config';
import { useIsAuthenticated, useUserStore } from '@stores/user.store';
import { useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import BackgroundWrapper from '@components/common/BackgroundWrapper/BackgroundWrapper';
import ErrorBoundary from '@components/common/ErrorBoundary/ErrorBoundary';
import ProtectedRoute from '@components/common/ProtectedRoute/ProtectedRoute';

import AboutPage from '@pages/AboutPage/AboutPage';
import AuthPage from '@pages/AuthPage/AuthPage';
import JournalReviewPage from '@pages/JournalReviewPage/JournalReviewPage';
import JournalsPage from '@pages/JournalsPage/JournalsPage';
import MainPage from '@pages/MainPage/MainPage';
import PreferencePage from '@pages/PreferencePage/PreferencePage';
import PurchasePage from '@pages/PurchasePage/PurchasePage';

const AuthRoute: React.FC = () => {
	const isAuthenticated = useIsAuthenticated();

	return isAuthenticated ? <Navigate to="/home" replace /> : <AuthPage />;
};

function App() {
	const { loadFromChromeStorage } = useUserStore();

	useEffect(() => {
		loadFromChromeStorage();
	}, [loadFromChromeStorage]);

	return (
		<ErrorBoundary showDetails={config.app.environment === 'development'}>
			<div className="w-screen h-screen flex flex-col items-center justify-center relative">
				<BackgroundWrapper>
					<Router>
						<Routes>
							<Route path="/auth" element={<AuthRoute />} />
							<Route
								path="/home"
								element={
									<ProtectedRoute>
										<MainPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/purchase"
								element={
									<ProtectedRoute onlyB2C>
										<PurchasePage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/journals/:id"
								element={
									<ProtectedRoute>
										<JournalReviewPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/journals"
								element={
									<ProtectedRoute>
										<JournalsPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/preferences"
								element={
									<ProtectedRoute>
										<PreferencePage />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/about"
								element={
									<ProtectedRoute>
										<AboutPage />
									</ProtectedRoute>
								}
							/>
							<Route path="/" element={<Navigate to="/auth" replace />} />
							<Route path="*" element={<Navigate to="/auth" replace />} />
						</Routes>
					</Router>
				</BackgroundWrapper>
			</div>
		</ErrorBoundary>
	);
}

export default App;
