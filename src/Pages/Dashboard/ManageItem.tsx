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
import { useAppSelector } from '../../Hooks/reduxHooks';

interface Column {
	id:
		| 'itemName'
		| 'category'
		| 'weeklyThreshold'
		| 'overallThreshold'
		| 'dailyThreshold'
		| 'dailyConsumption';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number | null) => string;
}

const columns: readonly Column[] = [
	{ id: 'itemName', label: 'Item', minWidth: 100 },
	{ id: 'category', label: 'Category', minWidth: 80 },
	{ id: 'dailyConsumption', label: 'Daily Consumption', minWidth: 60 },
	{ id: 'dailyThreshold', label: 'Daily Threshold', minWidth: 60 },
	{ id: 'weeklyThreshold', label: 'Weekly Threshold', minWidth: 60 },
	{ id: 'overallThreshold', label: 'Overall Threshold', minWidth: 60 },
];

export default function StickyHeadTable(): React.JSX.Element {
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
			<Typography
				component="h2"
				variant="h6"
				color="primary"
				gutterBottom>
				Manage Item
			</Typography>

			<Paper sx={{ width: '100%', overflow: 'hidden' }}>
				<TableContainer sx={{ maxHeight: 310 }}>
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
							{dasboardDetails.itemsWithTotalStock
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
											key={`item-${index}-${row.itemName}`}>
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
					count={dasboardDetails.itemsWithTotalStock.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</>
	);
}
