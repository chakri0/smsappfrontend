import axios from 'axios';
import { getAccessToken } from '../../Utils/helper';

const baseAPIURL = process.env.API_URL;

export interface AddCategoryRequestBodyParams {
	name: string;
}

export interface ListCategoryResponse {
	id: string;
	name: string;
	createdAt?: string;
	updatedAt?: string;
}

export const addCategory = async (
	data: AddCategoryRequestBodyParams,
): Promise<boolean> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.post(`${baseAPIURL}/category/add`, data, AuthHeader)
		.then(function (response) {
			return response.status === 201;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};

export const listCategories = async (): Promise<ListCategoryResponse[]> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.get(`${baseAPIURL}/category/list`, AuthHeader)
		.then(function (response) {
			return response.data.categoryList;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};
