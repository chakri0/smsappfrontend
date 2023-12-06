import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { resetUserPassword } from 'src/Services/Reducers/UserReducer';
import { isAPIActionRejected } from 'src/Utils/helper';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../Services/store';
import { isPasswordValid } from '../Setup';

const ResetPassword = (): React.JSX.Element => {
	// TODO remove, this demo shouldn't need to reset the theme.
	const defaultTheme = createTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const userEmail = searchParams.get('email');
	const token = searchParams.get('token');

	const [formData, setFormData] = useState({
		password: '',
		confirmPassword: '',
	});

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
		if (token != null && userEmail !== null) {
			const requestBody = {
				email: userEmail,
				password,
				token,
			};

			const result = await dispatch(resetUserPassword(requestBody));
			if (!isAPIActionRejected(result.type)) {
				toast.success('Password reset successful');
				navigate('/login');
			}
		}
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<img src="/img/Phillys_Logo.png" />
					<Typography component="h1" variant="h4" sx={{ mt: 4 }}>
						Reset Password
					</Typography>
					<Typography
						component="h5"
						variant="h6"
						sx={{ color: '#5c5c5c' }}>
						Enter your new password
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
							id="password"
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
							Reset Password
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default ResetPassword;
