import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	addInventoryItem,
	listInventroyItems,
	type AddInventoryItemRequest,
	type InventoryItem,
	updateInventoryItem,
	deleteInventoryItem,
	listInventoryItemsByBranch,
} from '../APIs/InventoryItemAPI';

export const fetchInventoryItems = createAsyncThunk(
	'inventoryItem/list',
	async () => {
		try {
			const response = await listInventroyItems();
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export const createInventoryItem = createAsyncThunk(
	'inventoryItem/create',
	async (data: AddInventoryItemRequest) => {
		try {
			const response = await addInventoryItem(data);
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export const updateInventoryItemById = createAsyncThunk(
	'inventoryItem/update',
	async ({
		data,
		inventoryItemId,
	}: {
		data: AddInventoryItemRequest;
		inventoryItemId: string;
	}) => {
		try {
			const response = await updateInventoryItem(data, inventoryItemId);
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export const deleteInventoryItemById = createAsyncThunk(
	'inventoryItem/delete',
	async (inventoryItemId: string) => {
		try {
			const response = await deleteInventoryItem(inventoryItemId);
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export const fetchInventoryItemsByBranch = createAsyncThunk(
	'item/fetchInventoryItemsByBranch',
	async (branchId: string) => {
		try {
			const response = await listInventoryItemsByBranch(branchId);
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export interface ItemState {
	InventoryItems: InventoryItem[];
	branchInventoryItems: InventoryItem[];
	loading: boolean;
	error: string | undefined | null;
}

const initialState: ItemState = {
	InventoryItems: [],
	branchInventoryItems: [],
	loading: false,
	error: null,
};

const inventoryItemSlice = createSlice({
	name: 'inventoryItem',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// List items
			.addCase(fetchInventoryItems.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchInventoryItems.fulfilled, (state, action) => {
				state.loading = false;
				state.InventoryItems = action.payload;
			})
			.addCase(fetchInventoryItems.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			// Create Item
			.addCase(createInventoryItem.pending, (state) => {
				state.loading = true;
			})
			.addCase(createInventoryItem.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(createInventoryItem.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			// Update Item
			.addCase(updateInventoryItemById.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateInventoryItemById.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(updateInventoryItemById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			// Delete Item
			.addCase(deleteInventoryItemById.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteInventoryItemById.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(deleteInventoryItemById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			// List items
			.addCase(fetchInventoryItemsByBranch.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchInventoryItemsByBranch.fulfilled, (state, action) => {
				state.loading = false;
				console.log('action.payload', action.payload);
				state.branchInventoryItems = action.payload;
			})
			.addCase(fetchInventoryItemsByBranch.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default inventoryItemSlice.reducer;
