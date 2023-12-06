/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { type ChangeEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
	Button,
	Divider,
	Grid,
	TextField,
	Typography,
	IconButton,
	Badge,
	Avatar,
} from '@mui/material';

// Assets
import userProfileImage from '../../Assets/Images/userProfile.svg';

// Services
import { type AppDispatch } from '../../Services/store';
import { updateProfile } from '../../Services/Reducers/UserReducer';

// Utils
import { isAPIActionRejected } from '../../Utils/helper';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { uploadFile } from '../../Services/APIs/AwsService';
import { useAppSelector } from '../../Hooks/reduxHooks';

interface ProfileDetails {
	firstName?: string;
	lastName?: string;
	email: string;
	phoneNumber?: number;
	role: string;
	branch?: string;
	oldPassword?: string;
	newPassword?: string;
	confirmPassword?: string;
}

const ProfileSettings = (): React.JSX.Element => {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useAppSelector((state) => state.user);
	console.log(user);

	const [userProfileDetails, setUserProfileDetails] =
		useState<ProfileDetails>();
	const [avatarUrl, setAvatarUrl] = useState('');

	useEffect(() => {
		// const storedUserInfo: string | null =
		//	localStorage.getItem('PhillyUser');
		if (user != null) {
			// const userInfo = JSON.parse(storedUserInfo);
			const formattedUserDetails: ProfileDetails = {
				firstName: user.firstName,
				lastName: user.lastName ?? '',
				email: user.email,
				phoneNumber: user.phoneNumber,
				role: user.role.roleName,
				branch: user.branch?.storeName ?? '',
			};
			setUserProfileDetails(formattedUserDetails);
			setAvatarUrl(user?.avatar ?? '');
		}
	}, [user]);

	const handleInputChange = (field: string, value: string): void => {
		setUserProfileDetails((prevData: ProfileDetails) => ({
			...prevData,
			[field]: value,
		}));
	};

	const handleUpdateProfile = async (): Promise<void> => {
		if (userProfileDetails !== undefined) {
			if (userProfileDetails?.oldPassword !== '') {
				if (
					userProfileDetails?.newPassword?.trim() !==
					userProfileDetails?.confirmPassword?.trim()
				) {
					toast.error('Password does not match');
					return;
				}
			}

			const requestBody = {
				firstName: userProfileDetails.firstName,
				lastName: userProfileDetails.lastName,
				email: userProfileDetails.email,
				phoneNumber: userProfileDetails.phoneNumber,
				oldPassword: userProfileDetails.oldPassword,
				newPassword: userProfileDetails.newPassword,
				avatar: avatarUrl ?? null,
			};

			const result = await dispatch(updateProfile(requestBody));
			if (!isAPIActionRejected(result.type)) {
				toast.success('User profile updated successful');
			}
		}
	};

	const newFileName = (name: string): string =>
		`${new Date().getTime()}.${name.split('.').pop()}`;

	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		try {
			const file = event.target.files?.[0];
			if (file == null || file === undefined) return;
			const fileName = file.name;
			const fileType = file.type;
			const blob = file.slice(0, file.size, fileType);
			const newFile = new File([blob], newFileName(fileName), {
				type: fileType,
			});

			const awsResponse = await uploadFile(newFile);
			setAvatarUrl(awsResponse.location);
		} catch (error) {
			console.log(error, 'error');
		}
	};

	return (
		<>
			<Box id="Invite-User">
				<Stack spacing={2}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<Typography variant="h4">
								Profile Setting
							</Typography>
						</Grid>
					</Grid>
				</Stack>
				<Stack spacing={2} sx={{ m: 3 }}>
					<IconButton
						color="primary"
						className="AvatarIcon"
						style={{ width: '80px', height: '80px' }}>
						<input
							type="file"
							className="InputAvatar"
							accept=".jpg,.jpeg,.png"
							hidden
							onChange={handleFileUpload}
							id="avatar-upload-input"
						/>
						<label htmlFor="avatar-upload-input">
							<Badge
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
								className="AdvertBadge"
								badgeContent={
									<AddCircleIcon color="primary" />
								}>
								<Avatar
									className="AvatarImage"
									alt="Profile"
									src={avatarUrl ?? userProfileImage}
									style={{ width: '80px', height: '80px' }}
								/>
							</Badge>
						</label>
					</IconButton>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<TextField
							sx={{ width: '45%' }}
							type="text"
							placeholder="First Name"
							value={userProfileDetails?.firstName}
							onChange={(e) => {
								handleInputChange('firstName', e.target.value);
							}}
						/>

						<TextField
							sx={{ width: '45%' }}
							type="text"
							placeholder="Last Name"
							value={userProfileDetails?.lastName}
							onChange={(e) => {
								handleInputChange('lastName', e.target.value);
							}}
						/>
					</Box>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<TextField
							sx={{ width: '100%' }}
							type="email"
							placeholder="Email"
							value={userProfileDetails?.email}
							disabled={true}
						/>
					</Box>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<TextField
							sx={{ width: '100%' }}
							type="number"
							placeholder="Contact Number"
							value={userProfileDetails?.phoneNumber}
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
						}}>
						<TextField
							sx={{ width: '100%' }}
							type="text"
							placeholder="Role"
							disabled={true}
							value={userProfileDetails?.role}
						/>
					</Box>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<TextField
							sx={{ width: '100%' }}
							type="text"
							placeholder="Branch"
							disabled={true}
							value={userProfileDetails?.branch}
						/>
					</Box>

					<Divider />

					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							rowGap: '15px',
						}}>
						<Typography>Reset Password</Typography>
						<TextField
							sx={{ width: '45%' }}
							type="password"
							placeholder="Old Password"
							onChange={(e) => {
								handleInputChange(
									'oldPassword',
									e.target.value,
								);
							}}
						/>

						<TextField
							sx={{ width: '45%' }}
							type="password"
							placeholder="New Password"
							onChange={(e) => {
								handleInputChange(
									'newPassword',
									e.target.value,
								);
							}}
						/>
						<TextField
							sx={{ width: '45%' }}
							type="password"
							placeholder="Confirm New Password"
							onChange={(e) => {
								handleInputChange(
									'confirmPassword',
									e.target.value,
								);
							}}
						/>
					</Box>

					<Box>
						<Button
							variant="contained"
							size="large"
							onClick={handleUpdateProfile}>
							Update
						</Button>
					</Box>
				</Stack>
			</Box>
		</>
	);
};

export default ProfileSettings;
