import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps {
	open: boolean;
}

const Loader = (props: LoaderProps): React.JSX.Element => {
	const { open } = props;
	return (
		<Backdrop
			sx={{
				color: '#FF6347',
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
			open={open}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default Loader;
