import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
	Typography,
} from '@mui/material';

// Component
import UserTable from './UserTable';
import InviteUserModal from './InviteUserModal';

// Hooks
import { useAppDispatch, useAppSelector } from '../../Hooks/reduxHooks';

// Reducer
import { fetchBranches } from '../../Services/Reducers/BranchReducer';
import Loader from 'src/Layout/Loader';

const InviteUser = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const { branches, loading } = useAppSelector((state) => state.branch);

	const [branch, setBranch] = React.useState('');
	const [openInviteModal, setOpenInviteModal] = React.useState(false);

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

	const handleOpen = (): void => {
		setOpenInviteModal(true);
	};
	const handleClose = (): void => {
		setOpenInviteModal(false);
	};

	const handleChange = (event: SelectChangeEvent): void => {
		setBranch(event.target.value);
	};
	return (
		<>
			<Loader open={loading} />
			<Box id="Invite-User">
				<Stack spacing={2}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<Typography variant="h4">Invite User</Typography>
						</Grid>
						<Grid item xs={12} md={8}>
							<Container className="right-menu-items">
								<FormControl
									sx={{ mt: 0, mb: 0, mr: 3, minWidth: 105 }}>
									<InputLabel id="branch-select-autowidth-label">
										Branch
									</InputLabel>
									<Select
										labelId="branch-select-autowidth-label"
										id="branch-select-autowidth"
										value={branch}
										onChange={handleChange}
										autoWidth
										label="Branch"
										size="small">
										{branches.map((branchItem) => (
											<MenuItem
												key={branchItem.id}
												value={branchItem.id}>
												{branchItem.storeName}
											</MenuItem>
										))}
										{/* <MenuItem value={10}>Columbia</MenuItem>
										<MenuItem value={21}>Elkridge</MenuItem> */}
									</Select>
								</FormControl>
								<Button
									variant="contained"
									size="small"
									onClick={handleOpen}>
									Invite User
								</Button>
							</Container>
						</Grid>
					</Grid>
				</Stack>

				<Stack spacing={2} sx={{ mt: 3 }}>
					<UserTable branchId={branch} />
				</Stack>
			</Box>

			<InviteUserModal open={openInviteModal} handleClose={handleClose} />
		</>
	);
};

export default InviteUser;
