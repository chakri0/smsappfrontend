import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
	Button,
	Container,
	Grid,
	Typography,
	type SelectChangeEvent,
	MenuItem,
	Select,
	FormControl,
} from '@mui/material';

// Components
import AddInventoryItem from './AddInventoryItem';
import InventoryItemTable from './InventoryItemTable';

// Hooks
import { useAppDispatch, useAppSelector } from '../../Hooks/reduxHooks';

// Reducers
import { fetchBranches } from '../../Services/Reducers/BranchReducer';

// Layout
import Loader from '../../Layout/Loader';

const tobeEditItem = null;

const InvetoryItem = (): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const { branches, loading } = useAppSelector((state) => state.branch);

	const [openItemModal, setOpenItemModal] = useState(false);
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
		if (branches.length > 0) {
			setBranch(branches[0].id);
		}
	}, [branches]);

	const handleOpen = (): void => {
		setOpenItemModal(true);
	};
	const handleClose = (): void => {
		setOpenItemModal(false);
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
							<Typography variant="h4">
								Manage Inventory
							</Typography>
						</Grid>
						<Grid item xs={12} md={8}>
							<Container className="right-menu-items">
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
								<Button
									variant="contained"
									size="large"
									onClick={handleOpen}>
									Add Order
								</Button>
							</Container>
						</Grid>
					</Grid>
				</Stack>

				<Stack spacing={2} sx={{ mt: 3 }}>
					<InventoryItemTable selectedBranch={branch} />
				</Stack>
			</Box>

			<AddInventoryItem
				open={openItemModal}
				handleClose={handleClose}
				toBeEditedItemDetails={tobeEditItem}
				selectedBranch={branch}
			/>
		</>
	);
};

export default InvetoryItem;
