import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../Hooks/reduxHooks';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { user } = useAppSelector((state) => state.user);

	if (user === null) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
