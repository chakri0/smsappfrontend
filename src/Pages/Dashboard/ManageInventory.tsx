import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

interface Column {
	id:
		| 'item'
		| 'category'
		| 'quantity'
		| 'availableQuantity'
		| 'expiryDate'
		| 'status';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{ id: 'item', label: 'Items', minWidth: 170 },
	{ id: 'category', label: 'Category', minWidth: 100 },
	{ id: 'quantity', label: 'Quantity', minWidth: 100 },
	{ id: 'availableQuantity', label: 'Available Quantity', minWidth: 100 },
	{ id: 'expiryDate', label: 'Expiry Date', minWidth: 100 },
	{ id: 'status', label: 'Status', minWidth: 100 },
];

interface Data {
	item: string;
	category: string;
	quantity: number;
	availableQuantity: number;
	expiryDate: number;
	status: string;
}

function createData(
	item: string,
	category: string,
	quantity: number,
	availableQuantity: number,
	expiryDate: number,
	status: string,
): Data {
	//   const density = population / size;
	return { item, category, quantity, availableQuantity, expiryDate, status };
}

const rows = [
	createData('Macaroni Pizza', 'Pizza', 40, 20, 2023, 'In-stock'),
	createData('Coke', 'Beverage', 2, 50, 2023, 'In-stock'),
	createData('Bun', 'Bakery', 5, 100, 2023, 'In-stock'),
	createData('Caesar Salad', 'Salad', 8, 30, 2023, 'In-stock'),
	createData('Spaghetti Bolognese', 'Pasta', 12, 25, 2023, 'In-stock'),
	createData('Chicken Burger', 'Burger', 6, 40, 2023, 'In-stock'),
	createData('French Fries', 'Appetizer', 4, 60, 2023, 'In-stock'),
	createData('Coffee', 'Beverage', 3, 45, 2023, 'In-stock'),
	createData('Vanilla Ice Cream', 'Dessert', 7, 15, 2023, 'In-stock'),
];

export default function StickyHeadTable(): React.JSX.Element {
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
			<Typography variant="h3" component="h3">
				Inventory Management
			</Typography>

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
							{rows
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
											key={`item-${index}-${row.item}`}>
											{columns.map((column) => {
												const value = row[column.id];
												return (
													<TableCell
														key={column.id}
														align={column.align}>
														{column.format !=
															null &&
														typeof value ===
															'number'
															? column.format(
																	value,
															  )
															: value}
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
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</>
	);
}
