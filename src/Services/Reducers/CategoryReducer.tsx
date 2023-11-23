import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	type AddCategoryRequestBodyParams,
	addCategory,
	listCategories,
	type ListCategoryResponse,
} from '../APIs/CategoryAPI';

export const fetchCategories = createAsyncThunk(
	'category/fetchCategories',
	async () => {
		try {
			const response = await listCategories();
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export const createCategory = createAsyncThunk(
	'category/createCategory',
	async (data: AddCategoryRequestBodyParams) => {
		try {
			const response = await addCategory(data);
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export interface CategoryState {
	categories: ListCategoryResponse[];
	loading: boolean;
	error: string | undefined | null;
}

const initialState: CategoryState = {
	categories: [],
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
			.addCase(fetchCategories.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.loading = false;
				state.categories = action.payload;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			// Create Category
			.addCase(createCategory.pending, (state) => {
				state.loading = true;
			})
			.addCase(createCategory.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(createCategory.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default categorySlice.reducer;
