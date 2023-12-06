import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BackArrow from '../../Assets/Icons/BackArrow';
import { isEmailValid } from '../Login';
import { useAppDispatch } from '../../Hooks/reduxHooks';
import { forgotUserPassword } from 'src/Services/Reducers/UserReducer';
import { isAPIActionRejected } from 'src/Utils/helper';

const ForgotPassword = (): React.JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const defaultTheme = createTheme();
	const [email, setemail] = useState('');

	const handleSubmit = async (): Promise<void> => {
		if (email === '') {
			toast.error('Please fill in all fields');
			return;
		}
		if (!isEmailValid(email)) {
			toast.error('Please enter a valid email address');
			return;
		}

		const result = await dispatch(forgotUserPassword(email));
		if (!isAPIActionRejected(result.type)) {
			toast.success(
				'Reset Password mail sent successfully. Please check your mail',
			);
			navigate('/login');
		}
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Button
				onClick={() => {
					navigate('/login');
				}}>
				<BackArrow />
			</Button>
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
						Forgot Password?
					</Typography>
					<Box
						component="form"
						// noValidate
						// onSubmit={() => {
						// 	void handleSubmit();
						// }}
						sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							// required
							fullWidth
							id="email"
							placeholder="Email"
							name="email"
							autoComplete="email"
							autoFocus
							sx={{
								backgroundColor: '#ededed',
								borderRadius: '31.5px',
								'& .MuiOutlinedInput-root': {
									border: 'none',
									borderRadius: '30px',
								},
								'& .MuiInput-underline:after': {
									borderBottom: 'none',
									borderColor: '#FF6347',
								},
								'& .MuiInputBase-input:focus': {
									borderColor: '#FF6347',
								},
							}}
							onChange={(e) => {
								setemail(e.target.value);
							}}
						/>

						<Button
							// type="submit"
							fullWidth
							variant="contained"
							onClick={() => {
								void handleSubmit();
							}}
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
							Reset Request
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default ForgotPassword;
