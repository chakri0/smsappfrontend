import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		background: {
			default: '#ededed',
		},
		primary: {
			main: '#FF6347',
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
				contained: {
					color: '#fff',
					textTransform: 'none',
					boxShadow: 'none',
				},
			},
		},
	},
});

export default theme;
