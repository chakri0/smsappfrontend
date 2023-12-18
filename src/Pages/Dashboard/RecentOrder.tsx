import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useAppSelector } from '../../Hooks/reduxHooks';

//     "id": "39a8341d-ab6d-42fb-b516-8ceeb8a42a47

interface Column {
	id:
		| 'item'
		// | 'category'
		| 'quantity'
		| 'availableQuantity'
		| 'expireDate'
		| 'status'
		| 'addedBy';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: 'item', label: 'Items', minWidth: 90 },
	// { id: 'category', label: 'Category', minWidth: 100 },
	{ id: 'quantity', label: 'Quantity', minWidth: 90 },
	{ id: 'availableQuantity', label: 'Available Quantity', minWidth: 90 },
	{ id: 'expireDate', label: 'Expire Date', minWidth: 90 },
	{ id: 'status', label: 'Status', minWidth: 90 },
	{ id: 'addedBy', label: 'Added By', minWidth: 90 },
];

export default function RecentOrder(): React.JSX.Element {
	const { dasboardDetails } = useAppSelector((state) => state.dashboard);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number): void => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<>
			<Paper sx={{ width: '100%', overflow: 'hidden' }}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{dasboardDetails.recentOrders
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
											key={`item-${index}-${row.item.id}`}>
											{columns.map((column) => {
												const value = row[
													column.id
												] as string;
												const item = row?.item?.name;
												const addedBy =
													row.addedBy?.firstName ??
													row.addedBy?.email;
												return (
													<TableCell
														key={column.id}
														align={column.align}>
														{column.id === 'item' &&
															item}
														{column.id ===
															'addedBy' &&
															addedBy}

														{column.id !== 'item' &&
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
					count={dasboardDetails.recentOrders.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</>
	);
}
