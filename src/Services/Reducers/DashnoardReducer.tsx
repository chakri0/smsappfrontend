import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	getDeshboardDetails,
	type DashboardDetails,
} from '../APIs/DashboardService';

const initialDashboardDetails: DashboardDetails = {
	totalItems: {
		count: '0',
	},
	totalCategories: {
		count: '0',
	},
	totalQuantity: {
		totalAvailableQuantity: '0',
	},
	totalWastedItems: {
		count: '0',
	},
	recentOrders: [],
	lowStocks: [],
	itemsWithTotalStock: [],
	wastedItemsList: [],
};

export const fetcDeshboardDetails = createAsyncThunk(
	'dashboard/fetcDeshboardDetails',
	async (branchId: string) => {
		try {
			const response = await getDeshboardDetails(branchId);
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export interface DashboardState {
	dasboardDetails: DashboardDetails;
	loading: boolean;
	error: string | undefined | null;
}

const initialState: DashboardState = {
	dasboardDetails: initialDashboardDetails,
	loading: false,
	error: null,
};

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// List Categories
			.addCase(fetcDeshboardDetails.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetcDeshboardDetails.fulfilled, (state, action) => {
				state.loading = false;
				state.dasboardDetails = action.payload;
			})
			.addCase(fetcDeshboardDetails.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default categorySlice.reducer;
