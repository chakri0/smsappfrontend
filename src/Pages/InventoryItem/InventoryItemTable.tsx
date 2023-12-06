import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';

// Hooks
import { useAppDispatch, useAppSelector } from '../../Hooks/reduxHooks';

// Component
import Loader from '../../Layout/Loader';
import UpdateItem from './AddInventoryItem';

// Reducer

// Services
import {
	deleteInventoryItemById,
	fetchInventoryItems,
} from '../../Services/Reducers/InventoryItemReducer';
import { type InventoryItem } from '../../Services/APIs/InventoryItemAPI';
import { fetchItems } from 'src/Services/Reducers/ItemReducer';

// Utils
import { isAPIActionRejected } from '../../Utils/helper';

interface Column {
	id:
		| 'name'
		| 'category'
		| 'quantity'
		| 'availableQuantity'
		| 'status'
		| 'addedAt'
		| 'updatedAt'
		| 'addedBy'
		| 'action';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: string) => string;
}

const columns: readonly Column[] = [
	{ id: 'name', label: 'Item', minWidth: 170 },
	{ id: 'category', label: 'Category', minWidth: 170 },
	{ id: 'quantity', label: 'Quantity', minWidth: 200 },
	{ id: 'availableQuantity', label: 'Available Qunatity', minWidth: 100 },
	{ id: 'status', label: 'Status', minWidth: 200 },
	{ id: 'addedAt', label: 'Added At', minWidth: 200 },
	{ id: 'updatedAt', label: 'Updated At', minWidth: 200 },
	{ id: 'addedBy', label: 'Added By', minWidth: 200 },
	{ id: 'action', label: 'Action', minWidth: 100 },
];

export default function StickyHeadTable(): React.JSX.Element {
	const dispatch = useAppDispatch();

	const { InventoryItems, loading } = useAppSelector(
		(state) => state.inventoryItem,
	);

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [openEditModal, setOpenEditModal] = React.useState(false);
	const [tobeEditedItemDetails, setTobeEditedItemDetails] =
		React.useState<InventoryItem | null>(null);

	useEffect(() => {
		void getInventoryItems();
		void getItems();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	const handleEditModalOpen = (row: InventoryItem): void => {
		setTobeEditedItemDetails(row);
		setOpenEditModal(true);
	};
	const handleEditModalClose = (): void => {
		setOpenEditModal(false);
		setTobeEditedItemDetails(null);
	};

	async function getInventoryItems(): Promise<void> {
		await dispatch(fetchInventoryItems());
	}

	async function getItems(): Promise<void> {
		await dispatch(fetchItems());
	}

	const handleChangePage = (event: unknown, newPage: number): void => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleItemDelete = async (
		itemDetails: InventoryItem,
	): Promise<void> => {
		const result = await dispatch(deleteInventoryItemById(itemDetails.id));
		if (!isAPIActionRejected(result.type)) {
			toast.success('Inventory Item details removed Successfully');
			await dispatch(fetchInventoryItems());
		}
	};

	return (
		<>
			<Loader open={loading} />
			<Paper
				sx={{
					width: '100%',
					overflow: 'hidden',
					boxShadow: 'none',
					borderRadius: '0',
				}}>
				{InventoryItems.length > 0 ? (
					<>
						<TableContainer sx={{ maxHeight: 440 }}>
							<Table
								aria-label="sticky table"
								sx={{ background: '#fff' }}>
								<TableHead>
									<TableRow>
										{columns.map((column) => (
											<TableCell
												key={column.id}
												align={column.align}
												style={{
													minWidth: column.minWidth,
												}}>
												{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{InventoryItems.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage,
									).map((row, index) => {
										return (
											<TableRow
												hover
												role="checkbox"
												tabIndex={-1}
												key={`item-${index}-${row.id}`}>
												{columns.map((column) => {
													const value =
														row[column.id];
													const item = row.item.name;
													const category =
														row.item.category.name;
													const addedBy =
														row.addedBy.firstName ??
														row.addedBy.email;
													return (
														<TableCell
															key={column.id}
															align={
																column.align
															}>
															{column.id ===
																'category' &&
																category}
															{column.id ===
																'name' && item}
															{column.id ===
																'addedBy' &&
																addedBy}
															{column.id ===
																'action' && (
																<>
																	<Button
																		onClick={() => {
																			handleEditModalOpen(
																				row,
																			);
																		}}>
																		Edit
																	</Button>
																	<Button
																		onClick={() => {
																			void handleItemDelete(
																				row,
																			);
																		}}>
																		Delete
																	</Button>
																</>
															)}
															{column.id !==
																'category' &&
																column.id !==
																	'name' &&
																column.id !==
																	'addedBy' &&
																value?.toString()}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[10, 25, 100]}
							component="div"
							count={InventoryItems.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</>
				) : (
					<Typography>No Inventory item found</Typography>
				)}
			</Paper>

			<UpdateItem
				open={openEditModal}
				handleClose={handleEditModalClose}
				toBeEditedItemDetails={tobeEditedItemDetails}
			/>
		</>
	);
}
