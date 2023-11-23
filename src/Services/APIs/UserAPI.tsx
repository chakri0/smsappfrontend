import axios from 'axios';
import { type ListBranchesResponse } from './BranchAPI';
import { getAccessToken } from '../..//Utils/helper';

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
