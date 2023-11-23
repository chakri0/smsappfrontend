import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiAppBar, {
	type AppBarProps as MuiAppBarProps,
} from '@mui/material/AppBar';

const drawerWidth = 256;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

interface HeaderProps {
	open: boolean;
	handleOpen: (status: boolean) => void;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...((open ?? false) && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Header: React.FC<HeaderProps> = (props) => {
	const { open, handleOpen } = props;

	const handleDrawerOpen = (): void => {
		handleOpen(!open);
	};

	return (
		<AppBar
			position="fixed"
			open={open}
			sx={{ bgcolor: '#fff', boxShadow: 'none' }}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{
						marginRight: 5,
						// ...(open && { display: 'none' }),
						color: '#DC442E',
					}}>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap component="div">
					Philly&apos;s Best Pizza
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
