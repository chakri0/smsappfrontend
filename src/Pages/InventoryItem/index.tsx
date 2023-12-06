import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button, Container, Grid, Typography } from '@mui/material';
import AddInventoryItem from './AddInventoryItem';
import InventoryItemTable from './InventoryItemTable';

const tobeEditItem = null;

const InvetoryItem = (): React.JSX.Element => {
	const [openItemModal, setOpenItemModal] = useState(false);

	const handleOpen = (): void => {
		setOpenItemModal(true);
	};
	const handleClose = (): void => {
		setOpenItemModal(false);
	};

	return (
		<>
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
								<Button
									variant="contained"
									size="large"
									onClick={handleOpen}>
									Add Inventory Item
								</Button>
							</Container>
						</Grid>
					</Grid>
				</Stack>

				<Stack spacing={2} sx={{ mt: 3 }}>
					<InventoryItemTable />
				</Stack>
			</Box>

			<AddInventoryItem
				open={openItemModal}
				handleClose={handleClose}
				toBeEditedItemDetails={tobeEditItem}
			/>
		</>
	);
};

export default InvetoryItem;
