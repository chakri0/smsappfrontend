import React, { useState } from 'react';
import { type ReactNode } from 'react';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Sidebar from './Sidebar';
import Header from './Header';
import Loader from './Loader';

// Hooks
import { useAppSelector } from '../Hooks/reduxHooks';

interface CommonLayoutProps {
	children: ReactNode;
}
const CommonLayout = ({ children }: CommonLayoutProps): React.JSX.Element => {
	const { loading } = useAppSelector((state) => state.user);

	const [open, setOpen] = useState<boolean>(true);

	const handleOpen = (status: boolean): void => {
		setOpen(status);
	};
	return (
		<>
			<Loader open={loading} />
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Header open={open} handleOpen={handleOpen} />
				<Sidebar open={open} handleOpen={handleOpen} />
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						p: 3,
						marginLeft: open ? '260px' : '50px',
						marginTop: '50px',
					}}>
					{children}
				</Box>
			</Box>
		</>
	);
};

export default CommonLayout;
