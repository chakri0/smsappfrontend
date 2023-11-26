import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../Hooks/reduxHooks';

interface GuestRouteProps {
	children: React.ReactNode;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
	const { user } = useAppSelector((state) => state.user);

	if (user !== null) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};

export default GuestRoute;
