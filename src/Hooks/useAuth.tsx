/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { type ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { profile } from '../Services/Reducers/UserReducer';
import { type AppDispatch } from '../Services/store';
import { getAccessToken } from '../Utils/helper';
import { login, type LoginRequest } from '../Services/APIs/UserAPI';

interface AuthContextProps {
	signIn: (data: LoginRequest) => Promise<void>;
	// logout: () => void;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = React.createContext<AuthContextProps | undefined>(
	undefined,
);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const verifyAccess = async () => {
			if (getAccessToken().length > 0) {
				const getUser = localStorage.getItem('PhillyUser');
				if (getUser != null) {
					await dispatch(profile());
				}
			}
		};

		void verifyAccess();
	}, [dispatch]);

	const signIn = async (data: LoginRequest) => {
		await login(data);
		await dispatch(profile());
	};

	// const logout = () => {
	//   navigate("/", { replace: true });
	// };

	return (
		<AuthContext.Provider value={{ signIn }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = React.useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth muse be withen and AuthProvider');
	}
	return context;
};

export { AuthProvider };

export default useAuth;
