import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	type LoginRequest,
	login,
	listByBranch,
	type ListUserByBranchResponse,
	invite,
	type InviteRequest,
	setup,
	type SetupRequest,
} from '../APIs/UserAPI';

export interface UserState {
	user: string | null;
	loading: boolean;
	error: string | null;
	branchUsersList: ListUserByBranchResponse[];
}

const initialState: UserState = {
	user: null,
	loading: false,
	error: null,
	branchUsersList: [],
};

export const userLogin = createAsyncThunk(
	'loginUser/status',
	async (data: LoginRequest) => {
		const response = await login(data);
		return response;
	},
);

export const getBranchesUser = createAsyncThunk(
	'branchUsers/status',
	async (branchId: string) => {
		const response = await listByBranch(branchId);
		return response;
	},
);

export const inviteUser = createAsyncThunk(
	'inviteUser/status',
	async (data: InviteRequest) => {
		const response = await invite(data);
		return response;
	},
);

export const setupAccount = createAsyncThunk(
	'setupAccount/status',
	async (data: SetupRequest) => {
		const response = await setup(data);
		return response;
	},
);

export const createUserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			localStorage.removeItem('PhillyUser');
		},
	},
	extraReducers: (builder) => {
		// Login
		builder.addCase(userLogin.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(userLogin.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload;
		});
		builder.addCase(userLogin.rejected, (state, action) => {
			state.loading = false;
		});

		// Get Branch Users
		builder.addCase(getBranchesUser.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getBranchesUser.fulfilled, (state, action) => {
			state.loading = false;
			state.branchUsersList = action.payload;
		});
		builder.addCase(getBranchesUser.rejected, (state, action) => {
			state.loading = false;
		});

		// Invite Users
		builder.addCase(inviteUser.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(inviteUser.fulfilled, (state, action) => {
			state.loading = false;
		});
		builder.addCase(inviteUser.rejected, (state, action) => {
			state.loading = false;
		});

		// Setup Account
		builder.addCase(setupAccount.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(setupAccount.fulfilled, (state, action) => {
			state.loading = false;
		});
		builder.addCase(setupAccount.rejected, (state, action) => {
			state.loading = false;
		});
	},
});

export const { logout } = createUserSlice.actions;
export default createUserSlice.reducer;
