import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	addBranch,
	listBranches,
	updateBranch,
	deleteBranch,
	type AddBranchRequestBodyParams,
	type UpdateBranchRequestBodyParams,
	type ListBranchesResponse,
} from '../APIs/BranchAPI';

export const fetchBranches = createAsyncThunk(
	'branches/fetchBranches',
	async () => {
		try {
			const response = await listBranches(); // Assuming listBranches returns data as needed
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export const createBranch = createAsyncThunk(
	'branches/createBranch',
	async (data: AddBranchRequestBodyParams) => {
		try {
			const response = await addBranch(data);
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export const updateBranchById = createAsyncThunk(
	'branches/updateBranchById',
	async ({
		data,
		branchId,
	}: {
		data: UpdateBranchRequestBodyParams;
		branchId: string;
	}) => {
		try {
			const response = await updateBranch(data, branchId);
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export const deleteBranchById = createAsyncThunk(
	'branches/deleteBranchById',
	async (branchId: string) => {
		try {
			const response = await deleteBranch(branchId);
			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
);

export interface BranchState {
	branches: ListBranchesResponse[];
	loading: boolean;
	error: string | undefined | null;
}

const initialState: BranchState = {
	branches: [],
	loading: false,
	error: null,
};

const branchesSlice = createSlice({
	name: 'branches',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// List Branches
			.addCase(fetchBranches.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchBranches.fulfilled, (state, action) => {
				state.loading = false;
				state.branches = action.payload;
			})
			.addCase(fetchBranches.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			// Create Branch
			.addCase(createBranch.pending, (state) => {
				state.loading = true;
			})
			.addCase(createBranch.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(createBranch.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			// Update Branch
			.addCase(updateBranchById.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateBranchById.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(updateBranchById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})

			// Delete Branch
			.addCase(deleteBranchById.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteBranchById.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(deleteBranchById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default branchesSlice.reducer;
