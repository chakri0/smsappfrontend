import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#FF6347',
			dark: '#dc442e',
		},
		secondary: { main: '#333333' },
		error: { main: '#8D0000' },
		warning: { main: '##FFD700' },
		info: { main: '##6296b7' },
		success: { main: '#12B76A', light: '#7FFF00' },
		background: {
			// default: '#FFF',
			default: '#ededed',
		},
	},
	typography: {
		h4: {
			color: '#333',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: '31.5px',
				},
				contained: {
					color: '#fff',
					textTransform: 'none',
					boxShadow: 'none',
					borderRadius: '31.5px',
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					color: '#333333',
					background: '#fff',
					borderRadius: '31.5px',
					border: 'none',
					fontSize: '18px',
					// padding: '5px 30px !important',
					margin: 0,
					borderColor: '#FF6347',
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					border: 'none',
					borderRadius: '30px',
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				select: {
					display: 'flex',
					width: '100%',
					alignItems: 'center',
					textAlign: 'left',
				},
			},
		},
	},
});

export default theme;
