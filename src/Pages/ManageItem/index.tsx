import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button, Container, Grid, Typography } from '@mui/material';
import AddItem from './AddItemModal';
import ItemTable from './ItemTable';

const tobeEditItem = { id: '' };

const ManageItems = (): React.JSX.Element => {
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
							<Typography variant="h4">Manage Items</Typography>
						</Grid>
						<Grid item xs={12} md={8}>
							<Container className="right-menu-items">
								<Button
									variant="contained"
									size="small"
									onClick={handleOpen}>
									Add Item
								</Button>
							</Container>
						</Grid>
					</Grid>
				</Stack>

				<Stack spacing={2} sx={{ mt: 3 }}>
					<ItemTable />
				</Stack>
			</Box>

			<AddItem
				open={openItemModal}
				handleClose={handleClose}
				toBeEditedItemDetails={tobeEditItem}
			/>
		</>
	);
};

export default ManageItems;
