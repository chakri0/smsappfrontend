import React from 'react';
import { Typography, Box, Modal, Button } from '@mui/material';
// import Stack from '@mui/material/Stack';
// import WarningIcon from '@mui/icons-material/Warning';
import { useAppDispatch } from '../../Hooks/reduxHooks';
import { toast } from 'react-toastify';

// Reducer
import {
	deleteBranchById,
	fetchBranches,
} from '../../Services/Reducers/BranchReducer';

// Helper
import { isAPIActionRejected } from '../../Utils/helper';

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	textAlign: 'center',
	bgcolor: 'background.paper',
	border: '1px solid #5C5C5C',
	borderRadius: '8px',
	boxShadow: 24,
	p: 4,
};

interface AddUpdateBranchProps {
	open: boolean;
	handleClose: () => void;
	branchId: string;
}

const DeleteBranch = (props: AddUpdateBranchProps): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const { open, handleClose, branchId } = props;

	const handleBranchDelete = async (): Promise<void> => {
		const result = await dispatch(deleteBranchById(branchId));
		if (!isAPIActionRejected(result.type)) {
			toast.success('Branch deleted Successfully');
			handleClose();
			await dispatch(fetchBranches());
		}
	};

	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h4"
						component="h2">
						Are you sure you want to delete this branch?
					</Typography>
					<Box sx={{ width: '100%' }}>
						{/* <WarningIcon /> */}
						{/* <Stack spacing={2} sx={{ mt: 2 }}> */}
						<Typography color="error" variant="h6" component="h6">
							This action will permanently delete the branch and
							all its associated data. This action cannot be
							undone.
						</Typography>
						{/* </Stack> */}
					</Box>

					<Box
						sx={{
							width: '100%',
							mt: 5,
							display: 'flex',
							justifyContent: 'space-around',
						}}>
						<Button
							variant="outlined"
							size="medium"
							onClick={handleClose}>
							Cancel
						</Button>
						<Button
							variant="contained"
							size="medium"
							onClick={() => {
								void handleBranchDelete();
							}}>
							Confirm Delete
						</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
};

export default DeleteBranch;
