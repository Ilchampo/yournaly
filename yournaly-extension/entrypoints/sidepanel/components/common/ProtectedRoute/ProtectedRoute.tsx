import React from 'react';

import { Navigate } from 'react-router-dom';

import { useOrganizationBusinessPlan } from '@stores/organization.store';
import { useIsAuthenticated } from '@stores/user.store';

interface ProtectedRouteProps {
	onlyB2C?: boolean;
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = props => {
	const { children, onlyB2C } = props;
	const isAuthenticated = useIsAuthenticated();
	const businessPlan = useOrganizationBusinessPlan();

	if (!isAuthenticated) {
		return <Navigate to="/auth" replace />;
	}

	if (onlyB2C && businessPlan !== 'B2C') {
		return <Navigate to="/home" replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
