import axios from 'axios';
import { getAccessToken } from '../../Utils/helper';
import { type ListCategoryResponse } from './CategoryAPI';
import { type ListBranchesResponse } from './BranchAPI';

const baseAPIURL = process.env.API_URL;

export interface AddItemRequestBodyParams {
	categoryId: string;
	name: string;
	description: string;
	dailyThreshold: string;
	weeklyThreshold: string;
	overallThreshold: string;
	branchId: string;
}

export interface ListItemResponse {
	id: string;
	name: string;
	description: string;
	image?: null | string;
	dailyThreshold: string;
	weeklyThreshold: string;
	overallThreshold: string;
	createdAt?: string;
	updatedAt?: string;
	action?: string;
	category: ListCategoryResponse;
	branch: ListBranchesResponse;
}

export interface UpdateItemRequestBodyParams {
	categoryId: string;
	name: string;
	description?: string;
	image?: string;
	dailyThreshold?: string;
	weeklyThreshold?: string;
	overallThreshold?: string;
	branchId: string;
}

export const addItem = async (
	data: AddItemRequestBodyParams,
): Promise<boolean> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.post(`${baseAPIURL}/item/add`, data, AuthHeader)
		.then(function (response) {
			return response.status === 201;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const listItems = async (): Promise<ListItemResponse[]> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.get(`${baseAPIURL}/item/list`, AuthHeader)
		.then(function (response) {
			return response.data.itemList;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const updateItem = async (
	data: UpdateItemRequestBodyParams,
	itemId: string,
): Promise<boolean> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.put(`${baseAPIURL}/item/update/${itemId}`, data, AuthHeader)
		.then(function (response) {
			return response.status === 201;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const deleteItem = async (itemId: string): Promise<boolean> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.delete(`${baseAPIURL}/item/delete/${itemId}`, AuthHeader)
		.then(function (response) {
			return response.status === 201;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const listItemsByBranch = async (
	branchId: string,
): Promise<ListItemResponse[]> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.get(`${baseAPIURL}/item/listByBranch/${branchId}`, AuthHeader)
		.then(function (response) {
			return response.data.itemsList;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};
