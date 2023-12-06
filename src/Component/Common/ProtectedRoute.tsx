import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useAppSelector } from '../../Hooks/reduxHooks';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const getUser = localStorage.getItem('PhillyUser');

	if (getUser === null) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
