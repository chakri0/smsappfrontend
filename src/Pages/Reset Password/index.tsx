import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ResetPassword = (): React.JSX.Element => {
	// TODO remove, this demo shouldn't need to reset the theme.
	const defaultTheme = createTheme();

	const handleSubmit = (): void => {};

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
						onSubmit={handleSubmit}
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
							name="confirm-password"
							type="password"
							id="password"
							placeholder="Confirm Password"
							autoComplete="current-password"
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
