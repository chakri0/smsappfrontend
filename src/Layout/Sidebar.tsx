import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';

// Hooks
import { useAppDispatch } from '../Hooks/reduxHooks';

// Services
import { logout } from '../Services/Reducers/UserReducer';

// Assets
import phillyLogo from '../Assets/Images/Phillys_Logo.png';
import DashboardIcon from '../Assets/Icons/DashboardIcon';
import ManageItemsIcon from '../Assets/Icons/ManageItems';
import InviteUserIcon from '../Assets/Icons/InviteUserIcon';
import ProfileIcon from '../Assets/Icons/ProfileIcon';
import BranchIcon from '../Assets/Icons/BranchIcon';
import LogoutIcon from '../Assets/Icons/LogoutIcon';

interface SidebarRoutesDetails {
	name: string;
	icon: React.JSX.Element;
	route: string;
}
const sideBarMenuItems: SidebarRoutesDetails[] = [
	{
		name: 'Dashboard',
		icon: <DashboardIcon />,
		route: '/',
	},
	{
		name: 'Manage Items',
		icon: <ManageItemsIcon />,
		route: '/manage-item',
	},
	{
		name: 'Invite Users',
		icon: <InviteUserIcon />,
		route: '/invite-user',
	},
	{
		name: 'Profile',
		icon: <ProfileIcon />,
		route: '/profile',
	},
	{
		name: 'Manage Stores',
		icon: <BranchIcon />,
		route: '/manage-branch',
	},
];

interface SidebarProps {
	open: boolean;
	handleOpen: (status: boolean) => void;
}

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Sidebar: React.FC<SidebarProps> = (props) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const location = useLocation();
	const theme = useTheme();

	const { pathname } = location;
	const { open } = props;

	const handleDrawerClick = (): void => {
		navigate('/');
	};

	const handleLogout = (): void => {
		dispatch(logout());
		navigate('/login');
	};

	return (
		<Drawer
			variant="permanent"
			open={open}
			className={!open ? 'main-drawer-closed' : 'main-drawer-open'}
			sx={{ borderRight: 'none' }}>
			<DrawerHeader sx={{ justifyContent: 'center' }}>
				<IconButton onClick={handleDrawerClick}>
					{theme.direction === 'rtl' ? (
						<ChevronRightIcon />
					) : (
						<img src={phillyLogo} width="150" />
					)}
				</IconButton>
			</DrawerHeader>

			<List>
				{sideBarMenuItems.map((sidebarItem) => (
					<ListItem
						key={sidebarItem.name}
						disablePadding
						sx={{
							display: 'block',
							color:
								sidebarItem.route === pathname
									? '#DC442E'
									: '#5C5C5C',
						}}
						onClick={() => {
							navigate(sidebarItem.route);
						}}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
									stroke:
										sidebarItem.route === pathname
											? '#DC442E'
											: '#5C5C5C',
								}}>
								{sidebarItem.icon}
							</ListItemIcon>
							{open && (
								<ListItemText
									primary={sidebarItem.name}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							)}
						</ListItemButton>
					</ListItem>
				))}

				<ListItem
					key="Logout"
					disablePadding
					sx={{ display: 'block' }}
					onClick={handleLogout}>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? 'initial' : 'center',
							px: 2.5,
						}}>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : 'auto',
								justifyContent: 'center',
							}}>
							<LogoutIcon />
						</ListItemIcon>
						{open && (
							<ListItemText
								primary="Logout"
								sx={{ opacity: open ? 1 : 0 }}
							/>
						)}
					</ListItemButton>
				</ListItem>
			</List>
		</Drawer>
	);
};

export default Sidebar;
