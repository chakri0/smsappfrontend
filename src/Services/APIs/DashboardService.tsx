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
	totalQuantity: {
		totalAvailableQuantity: string;
	};
	totalWastedItems: {
		count: string;
	};
	recentOrders: StockItem[];
	lowStocks: StockItem[];
	itemsWithTotalStock: ItemWithTotalStock[];
	wastedItemsList: wastedItem[];
}

interface StockItem {
	id: string;
	quantity: string;
	availableQuantity: string;
	status: string;
	expireDate: string;
	addedAt: string;
	updatedAt: string;
	item: StockItemItem;
	branch: StockItemBranch;
	addedBy: StockItemUser;
}

interface StockItemItem {
	id: string;
	name: string;
}

interface StockItemBranch {
	id: string;
	storeName: string;
}

interface StockItemUser {
	id: string;
	email: string;
	firstName: string;
	lastName: string | null;
}

interface wastedItem {
	itemName: string;
	wastedQuantity: string;
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

export const getDeshboardDetails = async (
	branchId: string,
): Promise<DashboardDetails> => {
	const AuthHeader = {
		headers: {
			Authorization: `${getAccessToken()}`,
		},
	};
	const response = axios
		.get(`${baseAPIURL}/dashboard/getDetails/${branchId}`, AuthHeader)
		.then(function (response) {
			return response.data.dasboardDetails;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};
