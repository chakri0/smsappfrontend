import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Services/Reducers/UserReducer';
import BranchReducer from './Reducers/BranchReducer';
import CategoryReducer from './Reducers/CategoryReducer';
import ItemReducer from './Reducers/ItemReducer';
import InventoryItemReducer from './Reducers/InventoryItemReducer';

const store = configureStore({
	reducer: {
		user: userReducer,
		branch: BranchReducer,
		category: CategoryReducer,
		item: ItemReducer,
		inventoryItem: InventoryItemReducer,
	},
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
