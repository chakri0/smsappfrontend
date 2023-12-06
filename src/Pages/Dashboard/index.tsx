import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container, Grid, Paper } from '@mui/material';
import { Copyright } from '@mui/icons-material';
import ItemsCharts from './chart';
import ManageItems from './ManageItem';

// Hooks
import { useAppDispatch, useAppSelector } from '../../Hooks/reduxHooks';
import { fetcDeshboardDetails } from '../../Services/Reducers/DashnoardReducer';

const Dashboard = (): React.JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const { dasboardDetails } = useAppSelector((state) => state.dashboard);

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

	const getDashboardDetails = async (): Promise<void> => {
		await dispatch(fetcDeshboardDetails());
	};

	useEffect(() => {
		void getDashboardDetails();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log(dasboardDetails, '/dasboardDetails');

	return (
		<>
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
					<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
										{/* <Typography
								color="text.secondary"
								sx={{ flex: 1 }}>
								Quantity in hand
							</Typography> */}
									</React.Fragment>
								</Paper>
							</Grid>
							{/* Recent Deposits */}
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
										{/* <Typography
								color="text.secondary"
								sx={{ flex: 1 }}>
								Quantity received this month
							</Typography> */}
									</React.Fragment>
								</Paper>
							</Grid>
							<Grid
								item
								xs={12}
								md={4}
								lg={3}
								style={{ maxWidth: '50%' }}>
								<ManageItems />
							</Grid>
							<Grid item xs={12}>
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
									<ItemsCharts />
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
