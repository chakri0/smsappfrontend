import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Services
import { userLogin } from '../../Services/Reducers/UserReducer';
import { type AppDispatch } from '../../Services/store';

// Utils
import { isAPIActionRejected } from '../../Utils/helper';

// Assets
import phillyLogo from '../../Assets/Images/Phillys_Logo.png';
import { useAppSelector } from 'src/Hooks/reduxHooks';
import Loader from 'src/Layout/Loader';

const isEmailValid = (email: string): boolean => {
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	return emailRegex.test(email);
};

const isPasswordValid = (password: string): boolean => {
	const passwordRegex =
		/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	return passwordRegex.test(password);
};

const Login = (): React.JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const { loading } = useAppSelector((state) => state.user);

	const [formData, setFormData] = useState({ email: '', password: '' });

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
		const { email, password } = formData;

		if (email === '' || password === '') {
			toast.error('Please fill in all fields');
			return;
		}

		if (!isEmailValid(email)) {
			toast.error('Please enter a valid email address');
			return;
		}

		if (!isPasswordValid(password)) {
			toast.error(
				'Password must be at least 8 characters and contain at least one uppercase, one lowercase, one number, and one special character',
			);
			return;
		}

		const requestBody = {
			email,
			password,
		};

		const result = await dispatch(userLogin(requestBody));
		if (!isAPIActionRejected(result.type)) {
			toast.success('Login Successful');
			navigate('/');
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
						Log in to your account
					</Typography>
					<Typography
						component="h5"
						variant="h6"
						sx={{ color: '#5c5c5c' }}>
						Welcome back! Please enter your details.
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
							value={formData.email}
							onChange={handleChange}
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
							inputProps={{
								sx: {
									color: '#5c5c5c',
									marginLeft: '10px',
								},
							}}
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
							inputProps={{
								sx: {
									color: '#5c5c5c',
									marginLeft: '10px',
								},
							}}
						/>

						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									<FormControlLabel
										control={
											<Checkbox
												value="remember"
												color="error"
											/>
										}
										label="Remember me"
										sx={{ color: '#FF6347' }}
									/>
								</Link>
							</Grid>
							<Grid item>
								<Link
									href="#"
									variant="body2"
									sx={{
										color: '#FF6347',
										textDecoration: 'none',
									}}
									onClick={() => {
										navigate('/forgot-password');
									}}>
									Forgot Password?
								</Link>
							</Grid>
						</Grid>

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
							Sign In
						</Button>
					</Box>
				</Box>
			</Container>
		</>
	);
};

export default Login;
