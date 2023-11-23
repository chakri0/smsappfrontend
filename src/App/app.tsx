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

function App(): React.JSX.Element {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					<NavigationScroll>
						<Router />
						<ToastContainer />
					</NavigationScroll>
				</BrowserRouter>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}
export default App;
