import React, { useState, useEffect } from 'react';
import {
	TextField,
	Typography,
	Box,
	Modal,
	InputLabel,
	Button,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { type File } from 'buffer';
import { useAppDispatch, useAppSelector } from '../../Hooks/reduxHooks';
import { toast } from 'react-toastify';

// Reducer
import {
	createBranch,
	fetchBranches,
	updateBranchById,
} from '../../Services/Reducers/BranchReducer';

// Helper
import { isAPIActionRejected } from '../../Utils/helper';

// Layout
import Loader from '../../Layout/Loader';

import { type BranchDetails } from './index';

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
	editBranchDetails: BranchDetails;
}
interface branchDataState {
	branchName: string;
	address: string;
	phoneNumber: string;
	image: null | unknown | File;
}

const initialBranchDataState = {
	branchName: '',
	address: '',
	phoneNumber: '',
	image: null,
};
const AddUpdateBranch = (props: AddUpdateBranchProps): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const { open, handleClose, editBranchDetails } = props;

	const { loading } = useAppSelector((state) => state.branch);

	const [branchData, setBranchData] = useState<branchDataState>(
		initialBranchDataState,
	);

	useEffect(() => {
		if (editBranchDetails.id !== '') {
			setBranchData({
				branchName: editBranchDetails.storeName ?? '',
				address: editBranchDetails.storeAddress ?? '',
				phoneNumber: editBranchDetails.phoneNumber ?? '',
				image: editBranchDetails.image,
			});
		} else {
			setBranchData(initialBranchDataState);
		}
	}, [editBranchDetails, open]);

	const handleInputChange = (field: string, value: string): void => {
		setBranchData((prevData: branchDataState) => ({
			...prevData,
			[field]: value,
		}));
	};

	//   const handleImageChange = (event: ChangeEventHandler<HTMLInputElement>): void => {
	//     const file = event.target.files[0];
	//     setBranchData((prevData) => ({ ...prevData, image: file }));
	//   };

	const handleCreateBranch = async (): Promise<void> => {
		if (branchData.branchName.trim() === '') {
			toast.error('Please enter branch name');
			return;
		}
		if (branchData.address.trim() === '') {
			toast.error('Please enter branch address');
			return;
		}
		const requestBody = {
			storeName: branchData.branchName,
			storeAddress: branchData.address,
			phoneNumber: parseInt(branchData.phoneNumber),
			// image: branchData.image,
		};
		const result = await dispatch(createBranch(requestBody));
		if (!isAPIActionRejected(result.type)) {
			toast.success('Branch Created Successfully');
			await dispatch(fetchBranches());
			handleClose();
		}
	};

	const handleUpdateBranch = async (): Promise<void> => {
		if (branchData.branchName.trim() === '') {
			toast.error('Please enter branch name');
			return;
		}
		if (branchData.address.trim() === '') {
			toast.error('Please enter branch address');
			return;
		}
		const requestBody = {
			storeName: branchData.branchName,
			storeAddress: branchData.address,
			phoneNumber: parseInt(branchData.phoneNumber),
			// image: branchData.image,
		};
		const result = await dispatch(
			updateBranchById({
				data: requestBody,
				branchId: editBranchDetails.id,
			}),
		);
		if (!isAPIActionRejected(result.type)) {
			toast.success('Branch Updated Successfully');
			await dispatch(fetchBranches());
			handleClose();
		}
	};

	return (
		<>
			<Loader open={loading} />
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
						{editBranchDetails.id !== ''
							? 'Edit Branch'
							: 'Add New Branch'}
					</Typography>
					<Box sx={{ width: '100%' }}>
						<Stack spacing={2} sx={{ mt: 2 }}>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Branch Name
								</InputLabel>
								<TextField
									sx={{ width: '65%' }}
									type="text"
									placeholder="Branch Name"
									value={branchData.branchName}
									onChange={(e) => {
										handleInputChange(
											'branchName',
											e.target.value,
										);
									}}
								/>
							</Box>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Address
								</InputLabel>
								<TextField
									sx={{ width: '65%' }}
									type="text"
									placeholder="Address"
									multiline
									rows={4}
									value={branchData.address}
									onChange={(e) => {
										handleInputChange(
											'address',
											e.target.value,
										);
									}}
								/>
							</Box>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Phone Number
								</InputLabel>
								<TextField
									sx={{ width: '65%' }}
									type="number"
									placeholder="Phone Number"
									value={branchData.phoneNumber}
									onChange={(e) => {
										handleInputChange(
											'phoneNumber',
											e.target.value,
										);
									}}
								/>
							</Box>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Upload Image
								</InputLabel>
								<Button
									variant="contained"
									component="label"
									sx={{ width: '65%' }}>
									Upload File
									<input
										type="file"
										accept="image/*"
										hidden
										// onChange={handleImageChange}
									/>
								</Button>
							</Box>
						</Stack>
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
						{editBranchDetails.id !== '' ? (
							<Button
								variant="contained"
								size="medium"
								onClick={() => {
									void handleUpdateBranch();
								}}>
								Update
							</Button>
						) : (
							<Button
								variant="contained"
								size="medium"
								onClick={() => {
									void handleCreateBranch();
								}}>
								Create Branch
							</Button>
						)}
					</Box>
				</Box>
			</Modal>
		</>
	);
};

export default AddUpdateBranch;
