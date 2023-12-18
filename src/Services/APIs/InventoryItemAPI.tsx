import axios from 'axios';
import { getAccessToken } from '../../Utils/helper';
import { type ListItemResponse } from './ItemAPI';
import { type ListBranchesResponse } from './BranchAPI';

export interface AddInventoryItemRequest {
	itemId: string;
	quantity: string;
	availableQuantity: string;
	// status: string;
	expireDate: string;
	updatedAt: string;
	branchId: string;
}

interface User {
	id: string;
	email: string;
	firstName: string | null;
	lastName: string | null;
}

export interface InventoryItem {
	id: string;
	quantity: string;
	availableQuantity: string;
	status: string;
	expireDate: string;
	addedAt: string;
	updatedAt: string;
	item: ListItemResponse;
	addedBy: User;
	name: string;
	category: string;
	branch: ListBranchesResponse;
	action?: string;
}

const baseAPIURL = process.env.API_URL;

export const addInventoryItem = async (
	data: AddInventoryItemRequest,
): Promise<boolean> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.post(`${baseAPIURL}/inventory/item/add`, data, AuthHeader)
		.then(function (response) {
			return response.status === 201;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const listInventroyItems = async (): Promise<InventoryItem[]> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.get(`${baseAPIURL}/inventory/item/list`, AuthHeader)
		.then(function (response) {
			return response.data.inventoryItemList;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const updateInventoryItem = async (
	data: AddInventoryItemRequest,
	inventoryItemId: string,
): Promise<boolean> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.put(
			`${baseAPIURL}/inventory/item/update/${inventoryItemId}`,
			data,
			AuthHeader,
		)
		.then(function (response) {
			return response.status === 200;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const deleteInventoryItem = async (
	inventoryItemId: string,
): Promise<boolean> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.delete(
			`${baseAPIURL}/inventory/item/delete/${inventoryItemId}`,
			AuthHeader,
		)
		.then(function (response) {
			return response.status === 200;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const listInventoryItemsByBranch = async (
	branchId: string,
): Promise<InventoryItem[]> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.get(
			`${baseAPIURL}/inventory/item/listByBranch/${branchId}`,
			AuthHeader,
		)
		.then(function (response) {
			console.log(
				' response.data.inventoryItemsList',
				response.data.inventoryItemsList,
			);
			return response.data.inventoryItemsList;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};
