import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import '../Styles/SCSS/main.scss';
import 'react-toastify/dist/ReactToastify.css';

import theme from '../Styles/Theme';

import NavigationScroll from '../Layout/NavigationScroll';

import Router from '../Routes';
import { AuthProvider } from '../Hooks/useAuth';

function App(): React.JSX.Element {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AuthProvider>
					<BrowserRouter>
						<NavigationScroll>
							<Router />
							<ToastContainer />
						</NavigationScroll>
					</BrowserRouter>
				</AuthProvider>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}
export default App;
