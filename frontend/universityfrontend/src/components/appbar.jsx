import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DegreeDropdown from './degreedropdown';
import CohortDropdown from './cohortdropdownbutton';
import ModuleDropdown from './moduledropdown';
import StudentDropdown from './studentdropdown';
import { Link } from 'react-router-dom';

const drawerWidth = 240;
const navItems = ['Cohorts', 'Degrees', 'Modules', 'Students'];
const navLinks = ['/cohort', '/degrees', '/modules', '/students'];

export default function DrawerAppBar(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};
	// small screen
	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				University System
			</Typography>
			<Divider />
			<List>
				{navItems.map((item, i) => (
					<ListItem key={item} disablePadding>
						<ListItemButton href={navLinks[i]} sx={{ textAlign: 'center' }}>
							<ListItemText primary={item} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar component="nav" sx={{color: 'black', background: 'linear-gradient(to bottom left, #ee0979, #ff6a00)', boxShadow: "none"}}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Button
						align="left"
						variant="h6"
						component={Link}
						to="/"
						sx={{ flexGrow: 1, display: { fontWeight: 'bold', xs: 'none', sm: 'block' } }}
					>
						University System
					</Button>
					<CohortDropdown />
					<DegreeDropdown />
					<ModuleDropdown />
					<StudentDropdown />
				</Toolbar>
			</AppBar>
			<Box component="nav">
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
			</Box>
			<Box component="main">
				<Toolbar />
			</Box>
		</Box>
	);
}
