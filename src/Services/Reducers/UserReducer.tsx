import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	login,
	listByBranch,
	invite,
	setup,
	userProfile,
	updateMyProfile,
	forgotPassword,
	resetPassword,
	updateUserProfile,
	type LoginRequest,
	type ListUserByBranchResponse,
	type InviteRequest,
	type SetupRequest,
	type UpdateRequest,
	type UserRoleResponse,
	type UpdateUserRequest,
	type ResetPasswordRequest,
	deleteUser,
} from '../APIs/UserAPI';
import { type ListBranchesResponse } from '../APIs/BranchAPI';

export interface User {
	id: string;
	email: string;
	firstName: string | undefined;
	lastName: string | undefined;
	avatar: string | undefined;
	phoneNumber: number | undefined;
	role: UserRoleResponse;
	branch?: ListBranchesResponse;
}

export interface UserState {
	user: User | null;
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

export const updateProfile = createAsyncThunk(
	'updateProfile/state',
	async (data: UpdateRequest) => {
		const response = await updateMyProfile(data);
		return response;
	},
);

export const updateUser = createAsyncThunk(
	'updateUser/state',
	async (data: UpdateUserRequest) => {
		const response = await updateUserProfile(data);
		return response;
	},
);

export const removeUser = createAsyncThunk(
	'removeUser/state',
	async (userId: string) => {
		const response = await deleteUser(userId);
		return response;
	},
);

export const profile = createAsyncThunk('profile/status', async () => {
	const response = await userProfile();
	return response;
});

export const forgotUserPassword = createAsyncThunk(
	'user/forgortPassword',
	async (email: string) => {
		const response = await forgotPassword(email);
		return response;
	},
);

export const resetUserPassword = createAsyncThunk(
	'user/resetPassword',
	async (data: ResetPasswordRequest) => {
		const response = await resetPassword(data);
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
			// state.user = action.payload;
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

		// Update My Profile
		builder.addCase(updateProfile.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(updateProfile.fulfilled, (state, action) => {
			state.loading = false;
		});
		builder.addCase(updateProfile.rejected, (state, action) => {
			state.loading = false;
		});

		// Update User Profile
		builder.addCase(updateUser.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(updateUser.fulfilled, (state, action) => {
			state.loading = false;
		});
		builder.addCase(updateUser.rejected, (state, action) => {
			state.loading = false;
		});

		// Remove User
		builder.addCase(removeUser.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(removeUser.fulfilled, (state, action) => {
			state.loading = false;
		});
		builder.addCase(removeUser.rejected, (state, action) => {
			state.loading = false;
		});

		// Profile
		builder.addCase(profile.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(profile.fulfilled, (state, action) => {
			state.user = action.payload;
			state.loading = false;
		});
		builder.addCase(profile.rejected, (state, action) => {
			state.loading = false;
		});

		// Forgot Password
		builder.addCase(forgotUserPassword.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(forgotUserPassword.fulfilled, (state, action) => {
			state.loading = false;
		});
		builder.addCase(forgotUserPassword.rejected, (state, action) => {
			state.loading = false;
		});

		// Reset Password
		builder.addCase(resetUserPassword.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(resetUserPassword.fulfilled, (state, action) => {
			state.loading = false;
		});
		builder.addCase(resetUserPassword.rejected, (state, action) => {
			state.loading = false;
		});
	},
});

export const { logout } = createUserSlice.actions;
export default createUserSlice.reducer;
