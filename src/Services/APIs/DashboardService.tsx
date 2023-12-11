import axios from 'axios';
import { getAccessToken } from '../../Utils/helper';

const baseAPIURL = process.env.API_URL;

export interface DashboardDetails {
	totalItems: {
		count: string;
	};
	totalCategories: {
		count: string;
	};
	itemsWithTotalStock: ItemWithTotalStock[];
}

interface ItemWithTotalStock {
	itemName: string;
	availableQuantity: string;
	dailyConsumption: string;
	dailyThreshold: string;
	weeklyThreshold: string;
	overallThreshold: string;
	category: string;
	healthScore: number;
}

export interface DashboardResponse {
	dasboardDetails: DashboardDetails;
}

/* const data: DashboardResponse = {
	dasboardDetails: {
		totalItems: {
			count: '2',
		},
		totalCategories: {
			count: '3',
		},
		itemsWithTotalStock: [
			{
				itemName: 'Coke',
				availableQuantity: '10',
				dailyConsumption: '0',
				dailyThreshold: '10',
				weeklyThreshold: '20',
				overallThreshold: '30',
				category: 'Beverages',
				healthScore: 80,
			},
			{
				itemName: 'Tomato Pizza',
				availableQuantity: '27',
				dailyConsumption: '13',
				dailyThreshold: '10',
				weeklyThreshold: '30',
				overallThreshold: '20',
				category: 'Pizza',
				healthScore: 19.5,
			},
			{
				itemName: 'Sprit',
				availableQuantity: '10',
				dailyConsumption: '0',
				dailyThreshold: '10',
				weeklyThreshold: '20',
				overallThreshold: '30',
				category: 'Beverages',
				healthScore: 80,
			},
			{
				itemName: 'Burgur',
				availableQuantity: '27',
				dailyConsumption: '13',
				dailyThreshold: '10',
				weeklyThreshold: '30',
				overallThreshold: '20',
				category: 'Pizza',
				healthScore: 19.5,
			},
		],
	},
}; */

export const getDeshboardDetails = async (): Promise<DashboardDetails> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.get(`${baseAPIURL}/dashboard/getDetails`, AuthHeader)
		.then(function (response) {
			return response.data.dasboardDetails;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};
