import React, { useState, useEffect } from 'react';
import {
	TextField,
	Typography,
	Box,
	Modal,
	InputLabel,
	Button,
	MenuItem,
	Select,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';

// Reducer
import {
	createItem,
	fetchItemsByBranch,
	updateItemById,
} from '../../Services/Reducers/ItemReducer';
import {
	createCategory,
	fetchCategories,
} from '../../Services/Reducers/CategoryReducer';

// Hooks
import { useAppDispatch, useAppSelector } from '../../Hooks/reduxHooks';

// Utils
import { isAPIActionRejected } from '../../Utils/helper';

// Services
import { type ListCategoryResponse } from '../../Services/APIs/CategoryAPI';

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	textAlign: 'center',
	bgcolor: 'background.paper',
	border: '1px solid #5C5C5C',
	borderRadius: '8px',
	boxShadow: 24,
	p: 4,
};

interface ItemDataState {
	name: string;
	description: string;
	category: string;
	image: string;
	overallThreshold: string;
	weeklyThreshold: string;
	branchId: object;
}

export interface ToBeEditedItem {
	id: string;
	name?: string;
	description?: string;
	image?: null | string;
	dailyThreshold?: string;
	weeklyThreshold?: string;
	overallThreshold?: string;
	createdAt?: string;
	updatedAt?: string;
	action?: string;
	category?: ListCategoryResponse;
	branchId: { id: string };
}

const initialItemData = {
	name: '',
	description: '',
	category: 'Select Category',
	image: '',
	overallThreshold: '',
	weeklyThreshold: '',
	branchId: { id: '' },
};

interface AddItemProps {
	open: boolean;
	handleClose: () => void;
	toBeEditedItemDetails: ToBeEditedItem;
	selectedBranch: string;
}

const AddItem = (props: AddItemProps): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const { open, handleClose, toBeEditedItemDetails, selectedBranch } = props;

	const { categories } = useAppSelector((state) => state.category);

	const [itemDetails, setItemDetails] =
		useState<ItemDataState>(initialItemData);
	const [showAddCategoryOption, setShowAddCategoryOption] =
		useState<boolean>(false);
	const [newCategoryName, setNewCategoryName] = useState('');

	useEffect(() => {
		const getCategories = async (): Promise<void> => {
			await dispatch(fetchCategories());
		};

		void getCategories();
	}, [dispatch]);

	useEffect(() => {
		setItemDetails(
			toBeEditedItemDetails.id !== ''
				? {
						name: toBeEditedItemDetails.name ?? '',
						description: toBeEditedItemDetails.description ?? '',
						category:
							toBeEditedItemDetails?.category?.id ??
							'Select Category',
						image: toBeEditedItemDetails.image ?? '',
						overallThreshold:
							toBeEditedItemDetails.overallThreshold ?? '',
						weeklyThreshold:
							toBeEditedItemDetails.weeklyThreshold ?? '',
						branchId: toBeEditedItemDetails.branchId ?? '',
				  }
				: initialItemData,
		);

		setShowAddCategoryOption(false);
		setNewCategoryName('');
	}, [open, toBeEditedItemDetails]);

	const validateItemDetails = (): boolean => {
		if (itemDetails.name.trim() === '') {
			toast.error('Please enter item name');
			return false;
		}
		if (itemDetails.category.trim() === 'Select Category') {
			toast.error('Please select item category');
			return false;
		}
		if (itemDetails.overallThreshold.trim() === '') {
			toast.error('Please enter item overall threshold');
			return false;
		}
		if (itemDetails.weeklyThreshold.trim() === '') {
			toast.error('Please enter item weekly threshold');
			return false;
		}
		return true;
	};

	const handleInputChange = (field: string, value: string): void => {
		setItemDetails((prevData: ItemDataState) => ({
			...prevData,
			[field]: value,
		}));
	};

	const handleCreateItem = async (): Promise<void> => {
		if (!validateItemDetails()) {
			return;
		}

		const requestBody = {
			categoryId: itemDetails.category,
			name: itemDetails.name,
			description: itemDetails.description ?? '',
			dailyThreshold: '',
			weeklyThreshold: itemDetails.weeklyThreshold,
			overallThreshold: itemDetails.overallThreshold,
			branchId: selectedBranch,
		};

		const result = await dispatch(createItem(requestBody));
		if (!isAPIActionRejected(result.type)) {
			toast.success('Item Created Successfully');
			await dispatch(fetchItemsByBranch(selectedBranch));
			handleClose();
		}
	};

	const handleUpdateItem = async (): Promise<void> => {
		if (!validateItemDetails()) {
			return;
		}

		const requestBody = {
			categoryId: itemDetails.category,
			name: itemDetails.name,
			description: itemDetails.description ?? '',
			dailyThreshold: '',
			weeklyThreshold: itemDetails.weeklyThreshold,
			overallThreshold: itemDetails.overallThreshold,
			branchId: selectedBranch,
		};
		const itemId = toBeEditedItemDetails.id;

		const result = await dispatch(
			updateItemById({ data: requestBody, itemId }),
		);
		if (!isAPIActionRejected(result.type)) {
			toast.success('Item updated Successfully');
			await dispatch(fetchItemsByBranch(selectedBranch));
			handleClose();
		}
	};

	const handleCreateCategory = async (): Promise<void> => {
		if (newCategoryName.trim() === '') {
			toast.error('Please enter Category name to be created');
			return;
		}
		const requestBody = {
			name: newCategoryName.trim(),
		};
		const result = await dispatch(createCategory(requestBody));
		if (!isAPIActionRejected(result.type)) {
			toast.success('Category Created Successfully');
			setNewCategoryName('');
			await dispatch(fetchCategories());
		}
	};

	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h4"
						component="h2">
						Add New Item
					</Typography>
					<Box sx={{ width: '100%' }}>
						<Stack spacing={2} sx={{ mt: 2 }}>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Item Name
								</InputLabel>
								<TextField
									sx={{ width: '65%' }}
									size="small"
									type="text"
									placeholder="Name"
									value={itemDetails.name}
									onChange={(e) => {
										handleInputChange(
											'name',
											e.target.value,
										);
									}}
								/>
							</Box>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Item Description
								</InputLabel>
								<TextField
									sx={{ width: '65%' }}
									size="small"
									type="text"
									placeholder="Item Description"
									multiline
									rows={4}
									value={itemDetails.description}
									onChange={(e) => {
										handleInputChange(
											'description',
											e.target.value,
										);
									}}
								/>
							</Box>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Item Category
								</InputLabel>

								<Select
									sx={{ width: '65%' }}
									value={itemDetails.category}
									onChange={(e: {
										target: { value: string };
									}) => {
										handleInputChange(
											'category',
											e.target.value,
										);
									}}
									autoWidth
									size="small">
									<MenuItem
										key="select-category-default-key"
										value="Select Category">
										Select Category
									</MenuItem>
									{categories.map((category) => (
										<MenuItem
											key={category.id}
											value={category.id}>
											{category.name}
										</MenuItem>
									))}
								</Select>
							</Box>

							<Box sx={{ textAlign: 'end' }}>
								<Button
									size="small"
									variant="outlined"
									onClick={() => {
										setShowAddCategoryOption(true);
									}}>
									Add New Category
								</Button>
								<Button
									size="small"
									variant="outlined"
									onClick={() => {
										setShowAddCategoryOption(false);
									}}>
									Hide
								</Button>
								{showAddCategoryOption && (
									<Box
										sx={{
											display: 'flex',
											mt: 2,
											justifyContent: 'end',
										}}>
										<TextField
											sx={{ width: '50%' }}
											size="small"
											type="text"
											placeholder="Enter new Category"
											value={newCategoryName}
											onChange={(e) => {
												setNewCategoryName(
													e.target.value,
												);
											}}
										/>
										<Button
											onClick={() => {
												void handleCreateCategory();
											}}>
											Create
										</Button>
									</Box>
								)}
							</Box>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Overall Threshold
								</InputLabel>
								<TextField
									sx={{ width: '65%' }}
									size="small"
									type="number"
									placeholder="Overall Threshold"
									value={itemDetails.overallThreshold}
									onChange={(e) => {
										handleInputChange(
											'overallThreshold',
											e.target.value,
										);
									}}
								/>
							</Box>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Weekly Threshold
								</InputLabel>
								<TextField
									sx={{ width: '65%' }}
									size="small"
									type="number"
									placeholder="Weekly Threshold"
									value={itemDetails.weeklyThreshold}
									onChange={(e) => {
										handleInputChange(
											'weeklyThreshold',
											e.target.value,
										);
									}}
								/>
							</Box>
						</Stack>
					</Box>

					<Box
						sx={{
							width: '100%',
							mt: 5,
							display: 'flex',
							justifyContent: 'space-around',
						}}>
						<Button
							variant="outlined"
							size="large"
							onClick={handleClose}>
							Cancel
						</Button>

						{toBeEditedItemDetails.id !== '' ? (
							<Button
								variant="contained"
								size="large"
								onClick={() => {
									void handleUpdateItem();
								}}>
								Update Item
							</Button>
						) : (
							<Button
								variant="contained"
								size="medium"
								onClick={() => {
									void handleCreateItem();
								}}>
								Create Item
							</Button>
						)}
					</Box>
				</Box>
			</Modal>
		</>
	);
};

export default AddItem;
