import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import userProfileImage from '../../Assets/Images/userProfile.svg';

interface ProfileDetails {
	firstName: string;
	lastName?: string;
	email: string;
	mobileNumber?: number;
	role: string;
	branch?: string;
}

const ProfileSettings = (): React.JSX.Element => {
	const [userProfileDetails, setUserProfileDetails] =
		useState<ProfileDetails>();

	useEffect(() => {
		const storedUserInfo: string | null =
			localStorage.getItem('PhillyUser');
		if (storedUserInfo != null) {
			const userInfo = JSON.parse(storedUserInfo);
			const formattedUserDetails: ProfileDetails = {
				firstName: userInfo.user.user.firstName,
				lastName: userInfo.user.user.lastName ?? '',
				email: userInfo.user.user.email,
				mobileNumber: userInfo.user.user.phoneNumber,
				role: userInfo.user.user.role.roleName,
				branch: userInfo.user.user.branch.storeName ?? '',
			};
			setUserProfileDetails(formattedUserDetails);
		}
	}, []);

	const handleInputChange = (field: string, value: string): void => {
		setUserProfileDetails((prevData: ProfileDetails) => ({
			...prevData,
			[field]: value,
		}));
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
					<Box>
						<img height={80} width={80} src={userProfileImage} />
					</Box>

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
							value={userProfileDetails?.mobileNumber}
							onChange={(e) => {
								handleInputChange(
									'mobileNumber',
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
						/>
						<TextField
							sx={{ width: '45%' }}
							type="password"
							placeholder="New Password"
						/>
						<TextField
							sx={{ width: '45%' }}
							type="password"
							placeholder="Confirm New Password"
						/>
					</Box>

					<Box>
						<Button variant="contained" size="large">
							Update
						</Button>
					</Box>
				</Stack>
			</Box>
		</>
	);
};

export default ProfileSettings;
