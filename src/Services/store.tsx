import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Services/Reducers/UserReducer';
import BranchReducer from './Reducers/BranchReducer';
import CategoryReducer from './Reducers/CategoryReducer';
import ItemReducer from './Reducers/ItemReducer';

const store = configureStore({
	reducer: {
		user: userReducer,
		branch: BranchReducer,
		category: CategoryReducer,
		item: ItemReducer,
	},
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
