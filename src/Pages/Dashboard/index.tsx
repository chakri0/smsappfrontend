import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
	Container,
	Grid,
	Paper,
	FormControl,
	Select,
	MenuItem,
	type SelectChangeEvent,
} from '@mui/material';
import { Copyright } from '@mui/icons-material';
import ItemsCharts from './chart';
// import ManageItems from './ManageItem';

// Hooks
import { useAppDispatch, useAppSelector } from '../../Hooks/reduxHooks';

//	Reducers
import { fetcDeshboardDetails } from '../../Services/Reducers/DashnoardReducer';
import { fetchBranches } from '../../Services/Reducers/BranchReducer';

import Loader from '../../Layout/Loader';
import WastedItem from './wastedItem';
import LowStocks from './LowStocks';
import RecentOrder from './RecentOrder';

const Dashboard = (): React.JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const { dasboardDetails } = useAppSelector((state) => state.dashboard);

	const { branches, loading } = useAppSelector((state) => state.branch);

	const [branch, setBranch] = React.useState('');

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				await dispatch(fetchBranches());
			} catch (error) {
				console.error('Error fetching branches:', error);
			}
		};

		void fetchData();
	}, [dispatch]);

	useEffect(() => {
		const defaultBranch = branches.length > 0 ? branches[0].id : '';
		setBranch(defaultBranch);
	}, [branches]);

	useEffect(() => {
		const storedUserInfo: string | null =
			localStorage.getItem('PhillyUser');
		if (storedUserInfo != null) {
			const userInfo = JSON.parse(storedUserInfo);
			if (userInfo === null && user === null) {
				navigate('/login');
			}
		} else {
			navigate('/login');
		}
	}, [user, navigate]);

	const getDashboardDetails = async (branchId: string): Promise<void> => {
		await dispatch(fetcDeshboardDetails(branchId));
	};

	useEffect(() => {
		if (branch.length > 0) {
			void getDashboardDetails(branch);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [branch]);

	const handleChange = (event: SelectChangeEvent): void => {
		setBranch(event.target.value);
	};

	return (
		<>
			<Loader open={loading} />
			<Box
				sx={{
					minHeight: 1,
					display: 'flex',
					flexDirection: { xs: 'column', lg: 'row' },
					background: '#EDEDED',
				}}>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						minHeight: 1,
						display: 'flex',
						flexDirection: 'column',
					}}>
					<Box sx={{ width: '100%' }}>
						<FormControl
							sx={{ mt: 0, mb: 0, mr: 3, minWidth: 120 }}>
							<Select
								value={branch}
								onChange={handleChange}
								autoWidth
								size="small">
								{branches.map((branchItem) => (
									<MenuItem
										key={branchItem.id}
										value={branchItem.id}>
										{branchItem.storeName}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>

					<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} key={branch}>
						<Grid container spacing={3}>
							{/* Chart */}
							<Grid item xs={12} md={4} lg={3}>
								<Paper
									sx={{
										p: 2,
										display: 'flex',
										flexDirection: 'column',
										height: 240,
									}}>
									<React.Fragment>
										<Typography
											component="h2"
											variant="h6"
											color="primary"
											gutterBottom>
											Total Items
										</Typography>
										<Typography component="p" variant="h4">
											{dasboardDetails.totalItems.count}
										</Typography>
									</React.Fragment>
								</Paper>
							</Grid>

							<Grid item xs={12} md={4} lg={3}>
								<Paper
									sx={{
										p: 2,
										display: 'flex',
										flexDirection: 'column',
										height: 240,
									}}>
									<React.Fragment>
										<Typography
											component="h2"
											variant="h6"
											color="primary"
											gutterBottom>
											Total Category
										</Typography>
										<Typography component="p" variant="h4">
											{
												dasboardDetails?.totalCategories
													.count
											}
										</Typography>
									</React.Fragment>
								</Paper>
							</Grid>

							<Grid item xs={12} md={4} lg={3}>
								<Paper
									sx={{
										p: 2,
										display: 'flex',
										flexDirection: 'column',
										height: 240,
									}}>
									<React.Fragment>
										<Typography
											component="h2"
											variant="h6"
											color="primary"
											gutterBottom>
											Quantity in hand
										</Typography>
										<Typography component="p" variant="h4">
											{
												dasboardDetails.totalQuantity
													.totalAvailableQuantity
											}
										</Typography>
									</React.Fragment>
								</Paper>
							</Grid>

							<Grid item xs={12} md={4} lg={3}>
								<Paper
									sx={{
										p: 2,
										display: 'flex',
										flexDirection: 'column',
										height: 240,
									}}>
									<React.Fragment>
										<Typography
											component="h2"
											variant="h6"
											color="primary"
											gutterBottom>
											Total Low Stocks
										</Typography>
										<Typography component="p" variant="h4">
											{dasboardDetails.lowStocks.length}
										</Typography>
									</React.Fragment>
								</Paper>
							</Grid>

							{/* <Grid
								item
								xs={12}
								md={4}
								lg={3}
								style={{ maxWidth: '50%' }}>
								<ManageItems />
								</Grid> */}
							<Grid item xs={6}>
								<Paper
									sx={{
										p: 2,
										display: 'flex',
										flexDirection: 'column',
									}}>
									<Typography
										component="h2"
										variant="h6"
										color="primary"
										gutterBottom>
										Items & Quantity & Health Score
									</Typography>
									{/* <Orders /> */}
									<ItemsCharts
										dasboardDetails={dasboardDetails}
										branch={branch}
									/>
								</Paper>
							</Grid>
							<Grid item xs={6}>
								<Paper
									sx={{
										p: 2,
										display: 'flex',
										flexDirection: 'column',
									}}>
									<Typography
										component="h2"
										variant="h6"
										color="primary"
										gutterBottom>
										Wasted Item
									</Typography>
									<WastedItem branch={branch} />
								</Paper>
							</Grid>
							<Grid item xs={6}>
								<Paper
									sx={{
										p: 2,
										display: 'flex',
										flexDirection: 'column',
									}}>
									<Typography
										component="h2"
										variant="h6"
										color="primary"
										gutterBottom>
										Recent Oders
									</Typography>
									<RecentOrder />
								</Paper>
							</Grid>
							<Grid item xs={6}>
								<Paper
									sx={{
										p: 2,
										display: 'flex',
										flexDirection: 'column',
									}}>
									<Typography
										component="h2"
										variant="h6"
										color="primary"
										gutterBottom>
										Low Stock
									</Typography>
									<LowStocks />
								</Paper>
							</Grid>
						</Grid>
						<Copyright sx={{ pt: 4 }} />
					</Container>
				</Box>
			</Box>
		</>
	);
};

export default Dashboard;
