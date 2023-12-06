import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Services
import { setupAccount } from '../../Services/Reducers/UserReducer';
import { type AppDispatch } from '../../Services/store';

// Utils
import { isAPIActionRejected } from '../../Utils/helper';

// Assets
import phillyLogo from '../../Assets/Images/Phillys_Logo.png';

// Hooks
import { useAppSelector } from '../../Hooks/reduxHooks';

// Components
import Loader from '../../Layout/Loader';

// const isEmailValid = (email: string): boolean => {
// 	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// 	return emailRegex.test(email);
// };

export const isPasswordValid = (password: string): boolean => {
	const passwordRegex =
		/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	return passwordRegex.test(password);
};

const SetupAccount = (): React.JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

	const { loading } = useAppSelector((state) => state.user);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const userEmail = searchParams.get('email');
	const token = searchParams.get('token');

	const handleChange = (e: {
		target: { name: string; value: string };
	}): void => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault();
		const { password, confirmPassword } = formData;

		if (password === '') {
			toast.error('Please enter password');
			return;
		}

		// if (!isEmailValid(email)) {
		// 	toast.error('Please enter a valid email address');
		// 	return;
		// }

		if (!isPasswordValid(password)) {
			toast.error(
				'Password must be at least 8 characters and contain at least one uppercase, one lowercase, one number, and one special character',
			);
			return;
		}
		if (password.trim() !== confirmPassword.trim()) {
			toast.error('Password does not match');
			return;
		}

		if (token != null) {
			const requestBody = {
				token,
				email: userEmail ?? '',
				password,
			};

			const result = await dispatch(setupAccount(requestBody));
			if (!isAPIActionRejected(result.type)) {
				toast.success('Account setup successful');
				navigate('/login');
			}
		}
	};

	return (
		<>
			<Loader open={loading} />
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<img src={phillyLogo} />
					<Typography component="h1" variant="h4" sx={{ mt: 4 }}>
						Setup Account
					</Typography>
					<Box
						component="form"
						onSubmit={(e) => {
							void handleSubmit(e);
						}}
						noValidate
						sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							placeholder="Email"
							name="email"
							autoComplete="email"
							value={userEmail}
							disabled
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							type="password"
							id="password"
							placeholder="Password"
							autoComplete="current-password"
							value={formData.password}
							onChange={handleChange}
						/>

						<TextField
							margin="normal"
							required
							fullWidth
							name="confirmPassword"
							type="confirmPassword"
							id="confirmPassword"
							placeholder="Confirm Password"
							autoComplete="current-password"
							value={formData.confirmPassword}
							onChange={handleChange}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{
								mt: 3,
								mb: 2,
								backgroundColor: '#FF6347',
								color: '#fff',
								borderRadius: '31.5px',
								height: '40px',
								'&:hover': {
									backgroundColor: '#dc442e',
								},
							}}>
							Confirm
						</Button>
					</Box>
				</Box>
			</Container>
		</>
	);
};

export default SetupAccount;
