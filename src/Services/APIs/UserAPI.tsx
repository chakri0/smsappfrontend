import axios from 'axios';
import { type ListBranchesResponse } from './BranchAPI';
import { getAccessToken } from '../../Utils/helper';
import { type User } from '../Reducers/UserReducer';

export interface LoginRequest {
	email: string;
	password: string;
}

export interface InviteRequest {
	firstName: string;
	email: string;
	role: string;
	branchId: string;
}

export interface SetupRequest {
	token: string;
	email: string;
	password: string;
}
export interface UserRoleResponse {
	id: string;
	roleName: string;
	isVerified: number;
	isActivated: number;
	createdAt?: string | null;
	updatedAt?: string | null;
}

export interface UpdateRequest {
	firstName?: string;
	lastName?: string;
	email: string;
	phoneNumber?: number;
	oldPassword?: string;
	newPassword?: string;
	avatar?: string | null;
}

export interface UpdateUserRequest {
	userId: string;
	firstName: string;
	role: string;
	branch: string;
}

export interface ListUserByBranchResponse {
	id: string;
	email: string;
	firstName: string | undefined;
	lastName: string | undefined;
	avatar: string | undefined;
	phoneNumber: number | undefined;
	role: UserRoleResponse;
	branch: ListBranchesResponse;
	action?: string;
}

interface UserProfileResponse {
	user: {
		id: string;
		email: string;
		firstName?: string;
		lastName?: string;
		avatar?: string;
		phoneNumber?: number;
		role: UserRoleResponse;
		branch?: ListBranchesResponse;
	};
}
const formatProfileResponse = (user: UserProfileResponse): User => {
	const formattedUser: User = {
		id: user.user.id,
		email: user.user.email,
		firstName: user.user.firstName,
		lastName: user.user.lastName,
		avatar: user.user.avatar,
		phoneNumber: user.user.phoneNumber,
		role: user.user.role,
		branch: user.user.branch,
	};
	return formattedUser;
};

export interface ResetPasswordRequest {
	email: string;
	password: string;
	token: string;
}

const baseAPIURL = process.env.API_URL;

export const login = async (data: LoginRequest): Promise<string> => {
	const response = axios
		.post(`${baseAPIURL}/user/login`, data)
		.then(function (response) {
			localStorage.setItem('PhillyUser', JSON.stringify(response.data));
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const invite = async (data: InviteRequest): Promise<string> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.post(`${baseAPIURL}/user/invite`, data, AuthHeader)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const listByBranch = async (
	branchId: string,
): Promise<ListUserByBranchResponse[]> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.get(`${baseAPIURL}/user/listByBranch/${branchId}`, AuthHeader)
		.then(function (response) {
			return response.data.usersList;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const setup = async (data: SetupRequest): Promise<string> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.post(`${baseAPIURL}/user/setup`, data, AuthHeader)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const updateMyProfile = async (data: UpdateRequest): Promise<string> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.put(`${baseAPIURL}/user/updateProfile`, data, AuthHeader)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const userProfile = async (): Promise<User> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};

	const user = axios
		.get(`${baseAPIURL}/user/me`, AuthHeader)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return formatProfileResponse(await user);
};

export const forgotPassword = async (email: string): Promise<string> => {
	const data = { email };
	const response = axios
		.post(`${baseAPIURL}/user/forgotPassword`, data)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const resetPassword = async (
	data: ResetPasswordRequest,
): Promise<string> => {
	const response = axios
		.post(`${baseAPIURL}/user/resetPassword`, data)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const updateUserProfile = async (
	data: UpdateUserRequest,
): Promise<boolean> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};

	const response = axios
		.put(`${baseAPIURL}/user/updateUser`, data, AuthHeader)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const deleteUser = async (userId: string): Promise<boolean> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};

	const response = axios
		.delete(`${baseAPIURL}/user/deleteUser/${userId}`, AuthHeader)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};
