import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

// Hooks
import { useAppDispatch, useAppSelector } from '../../Hooks/reduxHooks';

// Reducer
import { getBranchesUser } from '../../Services/Reducers/UserReducer';

// Component
import Loader from '../../Layout/Loader';

interface Column {
	id: 'firstName' | 'lastName' | 'email' | 'role' | 'branch' | 'action';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: string) => string;
}

const columns: readonly Column[] = [
	{ id: 'firstName', label: 'First Name', minWidth: 170 },
	{ id: 'lastName', label: 'Last Name', minWidth: 170 },
	{ id: 'email', label: 'Email', minWidth: 200 },
	{ id: 'role', label: 'Role', minWidth: 100 },
	{ id: 'branch', label: 'Branch', minWidth: 100 },
	{ id: 'action', label: 'Action', minWidth: 100 },
];

interface TableProps {
	branchId: string;
}

export default function StickyHeadTable(props: TableProps): React.JSX.Element {
	const dispatch = useAppDispatch();

	const { branchId } = props;

	const { branchUsersList, loading } = useAppSelector((state) => state.user);

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	useEffect(() => {
		if (branchId !== '') {
			void fetchBranches();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [branchId, dispatch]);

	async function fetchBranches(): Promise<void> {
		await dispatch(getBranchesUser(branchId));
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
				{branchUsersList.length > 0 ? (
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
									{branchUsersList
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
														const roleName =
															row.role.roleName;
														const branchName =
															row.branch
																.storeName;
														console.log(
															'value',
															row[column.id],
														);
														return (
															<TableCell
																key={column.id}
																align={
																	column.align
																}>
																{column.id ===
																'role'
																	? roleName
																	: column.id ===
																	  'branch'
																	? branchName
																	: value?.toString()}
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
							count={branchUsersList.length}
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
		</>
	);
}
