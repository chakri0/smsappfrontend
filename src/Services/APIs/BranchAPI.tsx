import axios from 'axios';
import { getAccessToken } from '../../Utils/helper';

export interface AddBranchRequestBodyParams {
	storeName: string;
	storeAddress: string;
	phoneNumber?: number;
	image?: string;
}

export interface UpdateBranchRequestBodyParams {
	storeName?: string;
	storeAddress?: string;
	phoneNumber?: number;
	image?: string;
}

export interface ListBranchesResponse {
	id: string;
	storeName: string;
	storeAddress: string;
	phoneNumber: string | null;
	image: null | string;
	createdAt: string;
	updatedAt: string;
}

const baseAPIURL = process.env.API_URL;

export const addBranch = async (
	data: AddBranchRequestBodyParams,
): Promise<boolean> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.post(`${baseAPIURL}/branch/add`, data, AuthHeader)
		.then(function (response) {
			return response.status === 201;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const listBranches = async (): Promise<ListBranchesResponse[]> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.get(`${baseAPIURL}/branch/list`, AuthHeader)
		.then(function (response) {
			return response.data.branches;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const updateBranch = async (
	data: UpdateBranchRequestBodyParams,
	branchId: string,
): Promise<boolean> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.put(`${baseAPIURL}/branch/update/${branchId}`, data, AuthHeader)
		.then(function (response) {
			return response.status === 201;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const deleteBranch = async (branchId: string): Promise<boolean> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.delete(`${baseAPIURL}/branch/delete/${branchId}`, AuthHeader)
		.then(function (response) {
			return response.status === 201;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};
