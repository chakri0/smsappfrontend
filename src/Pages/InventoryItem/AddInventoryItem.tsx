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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Reducer
import { fetchItems } from '../../Services/Reducers/ItemReducer';

// Hooks
import { useAppDispatch, useAppSelector } from '../../Hooks/reduxHooks';

// Utils
import { checkNullUndefiend, isAPIActionRejected } from '../../Utils/helper';

// Services
import { type ListCategoryResponse } from '../../Services/APIs/CategoryAPI';
import dayjs, { type Dayjs } from 'dayjs';
import {
	createInventoryItem,
	fetchInventoryItems,
	updateInventoryItemById,
} from '../../Services/Reducers/InventoryItemReducer';
import { type InventoryItem } from 'src/Services/APIs/InventoryItemAPI';

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

interface InventoryItemDataState {
	quantity: string;
	availableQuantity: string;
	// status: string;
	expireDate: string;
	item: string;
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
}

const initialItemData = {
	quantity: '',
	availableQuantity: '',
	status: 'Select Status',
	expireDate: '',
	item: 'Select Item',
};

interface AddItemProps {
	open: boolean;
	handleClose: () => void;
	toBeEditedItemDetails: InventoryItem | null;
}

/* const StatusType = [
	{
		id: 'InStock',
		name: 'In Stock',
	},
	{
		id: 'consumed',
		name: 'Consumed',
	},
]; */

const AddInventoryItem = (props: AddItemProps): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const { open, handleClose, toBeEditedItemDetails } = props;
	const { items } = useAppSelector((state) => state.item);

	const [itemDetails, setItemDetails] =
		useState<InventoryItemDataState>(initialItemData);
	const [date, setDate] = React.useState<Dayjs>();

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				await dispatch(fetchItems());
			} catch (error) {
				console.error('Error fetching Items:', error);
			}
		};

		void fetchData();
		if (toBeEditedItemDetails !== null) {
			setItemDetails({
				item: toBeEditedItemDetails.item.id ?? 'Select Item',
				quantity: toBeEditedItemDetails.quantity ?? '',
				availableQuantity:
					toBeEditedItemDetails.availableQuantity ?? '',
				// status: toBeEditedItemDetails.status ?? '',
				expireDate: toBeEditedItemDetails.expireDate ?? '',
			});
			setDate(dayjs(toBeEditedItemDetails.expireDate));
		} else {
			setItemDetails(initialItemData);
		}
	}, [dispatch, open, toBeEditedItemDetails]);

	const validateItemDetails = (): boolean => {
		if (itemDetails.item === 'Select Item') {
			toast.error('Please Select Item');
			return false;
		}
		if (checkNullUndefiend(itemDetails.quantity)) {
			toast.error('Please Enter Quantity');
			return false;
		}
		if (checkNullUndefiend(itemDetails.availableQuantity)) {
			toast.error('Please Enter Available Quantity');
			return false;
		}
		/* if (itemDetails.status === 'Select Status') {
			toast.error('Please Select Status');
			return false;
		} */
		if (checkNullUndefiend(itemDetails.expireDate.trim())) {
			toast.error('Please Enter Expire Date');
			return false;
		}
		return true;
	};

	const handleInputChange = (field: string, value: string): void => {
		setItemDetails((prevData: InventoryItemDataState) => ({
			...prevData,
			[field]: value,
		}));
	};

	const handleCreateItem = async (): Promise<void> => {
		if (!validateItemDetails()) {
			return;
		}

		const requestBody = {
			itemId: itemDetails.item,
			quantity: itemDetails.quantity,
			availableQuantity: itemDetails.availableQuantity,
			// status: itemDetails.status,
			expireDate: itemDetails.expireDate,
		};

		const result = await dispatch(createInventoryItem(requestBody));
		if (!isAPIActionRejected(result.type)) {
			toast.success('Inventory Item Created Successfully');
			await dispatch(fetchInventoryItems());
			handleClose();
		}
	};

	const handleUpdateItem = async (): Promise<void> => {
		if (!validateItemDetails()) {
			return;
		}

		const requestBody = {
			itemId: itemDetails.item,
			quantity: itemDetails.quantity,
			availableQuantity: itemDetails.availableQuantity,
			// status: itemDetails.status,
			expireDate: itemDetails.expireDate,
		};

		const inventoryItemId = toBeEditedItemDetails?.id;
		if (inventoryItemId !== undefined) {
			const result = await dispatch(
				updateInventoryItemById({ data: requestBody, inventoryItemId }),
			);
			if (!isAPIActionRejected(result.type)) {
				toast.success('Inventory item updated successfully');
				await dispatch(fetchInventoryItems());
				handleClose();
			}
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
									Items
								</InputLabel>

								<Select
									sx={{ width: '65%' }}
									value={itemDetails.item}
									onChange={(e: {
										target: { value: string };
									}) => {
										handleInputChange(
											'item',
											e.target.value,
										);
									}}
									autoWidth
									size="small">
									<MenuItem
										key="select-item-default-1"
										value="Select Item">
										Select Item
									</MenuItem>
									{items.map((item) => (
										<MenuItem key={item.id} value={item.id}>
											{item.name}
										</MenuItem>
									))}
								</Select>
							</Box>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Quantity
								</InputLabel>
								<TextField
									sx={{ width: '65%' }}
									type="number"
									size="small"
									placeholder="Quantity"
									name="quantity"
									value={itemDetails.quantity}
									onChange={(e) => {
										handleInputChange(
											'quantity',
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
									Avalible Quantity
								</InputLabel>
								<TextField
									sx={{ width: '65%' }}
									type="number"
									size="small"
									placeholder="Avalible Quantity"
									value={itemDetails.availableQuantity}
									onChange={(e) => {
										handleInputChange(
											'availableQuantity',
											e.target.value,
										);
									}}
								/>
							</Box>
							{/* <Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Status
								</InputLabel>

								<Select
									sx={{ width: '65%' }}
									value={itemDetails.status}
									onChange={(e: {
										target: { value: string };
									}) => {
										handleInputChange(
											'status',
											e.target.value,
										);
									}}
									autoWidth
									size="small">
										<MenuItem
										key="select-status-default-1"
										value="Select Status">
										Select Status
									</MenuItem>
									{StatusType.map((status) => (
										<MenuItem
											key={status.id}
											value={status.id}>
											{status.name}
										</MenuItem>
									))}
								</Select>
							</Box> */}
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Expire Date
								</InputLabel>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}>
									<DemoContainer
										sx={{ width: '65%' }}
										components={['DatePicker']}>
										<DatePicker
											sx={{ width: '100%' }}
											value={date}
											onChange={(newValue) => {
												if (newValue !== null) {
													handleInputChange(
														'expireDate',
														newValue?.format(
															'YYYY/MM/DD',
														),
													);
													setDate(newValue);
												}
											}}
										/>
									</DemoContainer>
								</LocalizationProvider>
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
							size="medium"
							onClick={handleClose}>
							Cancel
						</Button>

						{toBeEditedItemDetails !== null ? (
							<Button
								variant="contained"
								size="medium"
								type="submit"
								onClick={() => {
									void handleUpdateItem();
								}}>
								Update Item
							</Button>
						) : (
							<Button
								variant="contained"
								size="medium"
								type="submit"
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

export default AddInventoryItem;
