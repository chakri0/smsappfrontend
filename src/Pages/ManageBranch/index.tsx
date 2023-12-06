import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
	Button,
	CardActions,
	Container,
	Grid,
	Typography,
} from '@mui/material';
import { toast } from 'react-toastify';

// Asset
import phillysLogo from '../../Assets/Images/Phillys_Logo.png';
import AddUpdateBranch from './AddUpdateBranch';

// Hooks
import { useAppDispatch, useAppSelector } from '../../Hooks/reduxHooks';

// Reducer
import {
	deleteBranchById,
	fetchBranches,
} from '../../Services/Reducers/BranchReducer';

// Layout
import Loader from '../../Layout/Loader';
import { isAPIActionRejected } from '../../Utils/helper';

export interface BranchDetails {
	id: string;
	storeName?: string;
	storeAddress?: string;
	phoneNumber?: string | null;
	image?: null | string;
	createdAt?: string;
	updatedAt?: string;
}

const ManageBranch = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const { branches, loading } = useAppSelector((state) => state.branch);

	const [open, setOpen] = React.useState(false);
	const [editBranch, setEditBranch] = React.useState<BranchDetails>({
		id: '',
	});

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

	const handleOpen = (): void => {
		setOpen(true);
	};
	const handleClose = (): void => {
		setOpen(false);
		setEditBranch({ id: '' });
	};

	const handleBranchDelete = async (branchId: string): Promise<void> => {
		const result = await dispatch(deleteBranchById(branchId));
		if (!isAPIActionRejected(result.type)) {
			toast.success('Branch deleted Successfully');
			await dispatch(fetchBranches());
		}
	};

	const handleEditBranch = (branch: BranchDetails): void => {
		handleOpen();
		setEditBranch(branch);
	};

	return (
		<>
			<Loader open={loading} />
			<Box id="Invite-User" sx={{ p: 3 }}>
				<Stack spacing={2}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<Typography variant="h4">Manage Branch</Typography>
						</Grid>
						<Grid item xs={12} md={8}>
							<Container className="right-menu-items">
								<Button
									variant="contained"
									size="large"
									onClick={handleOpen}>
									Add Branch
								</Button>
							</Container>
						</Grid>
					</Grid>
				</Stack>

				<Stack spacing={2} sx={{ mt: 3, ml: 2, mr: 2 }}>
					{branches.map((branch) => (
						<Card
							key={branch.id}
							sx={{
								display: 'flex',
								boxShadow: 'none',
								border: '1px solid #FF6347',
							}}>
							<CardMedia
								component="img"
								sx={{
									width: 200,
									height: 130,
									objectFit: 'fill',
								}}
								image={branch.image ?? phillysLogo}
								alt={'Branch image'}
							/>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
								}}>
								<CardContent sx={{ flex: '1 0 auto' }}>
									<Typography component="div" variant="h5">
										{branch.storeName}
									</Typography>
									<Typography
										variant="subtitle1"
										color="text.secondary"
										component="div">
										{branch.storeAddress}
									</Typography>
									{branch.phoneNumber != null && (
										<Typography
											variant="subtitle1"
											color="text.secondary"
											component="div">
											{branch.phoneNumber}
										</Typography>
									)}
								</CardContent>
							</Box>

							<CardActions
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignSelf: 'center',
									marginLeft: 'auto',
									gap: '10px',
								}}>
								<Button
									size="small"
									color="primary"
									variant="outlined"
									onClick={() => {
										handleEditBranch(branch);
									}}>
									Edit
								</Button>
								<Button
									size="small"
									color="primary"
									variant="outlined"
									onClick={() => {
										void handleBranchDelete(branch.id);
									}}>
									Delete
								</Button>
							</CardActions>
						</Card>
					))}

					{branches.length === 0 && (
						<Typography variant="h5">
							No Branches Present
						</Typography>
					)}
				</Stack>
			</Box>

			<AddUpdateBranch
				open={open}
				handleClose={handleClose}
				editBranchDetails={editBranch}
			/>
		</>
	);
};

export default ManageBranch;
