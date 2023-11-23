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
	id: 'item' | 'category' | 'weeklyThreshold' | 'overallThreshold' | 'action';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number | null) => string;
}

const columns: readonly Column[] = [
	{ id: 'item', label: 'Item', minWidth: 170 },
	{ id: 'category', label: 'Category', minWidth: 100 },
	{ id: 'weeklyThreshold', label: 'Weekly Threshold', minWidth: 100 },
	{ id: 'overallThreshold', label: 'Overall Threshold', minWidth: 100 },
	{ id: 'action', label: 'Action', minWidth: 100 },
];

interface Data {
	item: string;
	category: string;
	weeklyThreshold: number | null;
	overallThreshold: number | null;
	action: string;
}

function createData(
	item: string,
	category: string,
	weeklyThreshold: number | null,
	overallThreshold: number | null,
	action: string,
): Data {
	return { item, category, weeklyThreshold, overallThreshold, action };
}

const rows = [
	createData('Macaroni Pizza', 'Pizza', 40, 20, 'Update'),
	createData('Coke', 'Beverage', 2, 50, 'Update'),
	createData('Bun', 'Bakery', 5, 100, 'Update'),
	createData('Caesar Salad', 'Salad', 8, 30, 'Update'),
	createData('Spaghetti Bolognese', 'Pasta', 12, 25, 'Update'),
	createData('Chicken Burger', 'Burger', 6, 40, 'Update'),
	createData('French Fries', 'Appetizer', 4, 60, 'Update'),
	createData('Coffee', 'Beverage', 3, 45, 'Update'),
	createData('Vanilla Ice Cream', 'Dessert', 7, 15, 'Update'),
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
				Manage Item
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
