import * as React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom/client';

import App from './App/app';
import store from './Services/store';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);
