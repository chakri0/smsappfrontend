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
import UpdateItem from './AddItemModal';

// Reducer
import {
	deleteItemById,
	fetchItems,
} from '../../Services/Reducers/ItemReducer';

// Services
import { type ListItemResponse } from '../../Services/APIs/ItemAPI';

// Utils
import { isAPIActionRejected } from '../../Utils/helper';

interface Column {
	id:
		| 'name'
		| 'category'
		| 'description'
		| 'weeklyThreshold'
		| 'overallThreshold'
		| 'action';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: string) => string;
}

const columns: readonly Column[] = [
	{ id: 'name', label: 'Item', minWidth: 170 },
	{ id: 'category', label: 'Category', minWidth: 170 },
	{ id: 'weeklyThreshold', label: 'Weekly Threshold', minWidth: 200 },
	{ id: 'overallThreshold', label: 'Overall Threshold', minWidth: 100 },
	{ id: 'action', label: 'Action', minWidth: 100 },
];

export default function StickyHeadTable(): React.JSX.Element {
	const dispatch = useAppDispatch();

	const { items, loading } = useAppSelector((state) => state.item);

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [openEditModal, setOpenEditModal] = React.useState(false);
	const [tobeEditedItemDetails, setTobeEditedItemDetails] = React.useState({
		id: '',
	});

	useEffect(() => {
		void getItems();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	const handleEditModalOpen = (row: ListItemResponse): void => {
		setTobeEditedItemDetails(row);
		setOpenEditModal(true);
	};
	const handleEditModalClose = (): void => {
		setOpenEditModal(false);
		setTobeEditedItemDetails({ id: '' });
	};

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
		itemDetails: ListItemResponse,
	): Promise<void> => {
		const result = await dispatch(deleteItemById(itemDetails.id));
		if (!isAPIActionRejected(result.type)) {
			toast.success('Item removed Successfully');
			await dispatch(fetchItems());
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
				{items.length > 0 ? (
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
									{items
										.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage,
										)
										.map((row, index) => {
											return (
												<TableRow
													hover
													role="checkbox"
													tabIndex={-1}
													key={`item-${index}-${row.id}`}>
													{columns.map((column) => {
														const value =
															row[column.id];
														const category =
															row.category.name;
														return (
															<TableCell
																key={column.id}
																align={
																	column.align
																}>
																{column.id ===
																'category' ? (
																	category
																) : column.id ===
																  'action' ? (
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
																) : (
																	value?.toString()
																)}
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
							count={items.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</>
				) : (
					<Typography>No Users found for this branch</Typography>
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
