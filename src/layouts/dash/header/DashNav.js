import MenuIcon from '@mui/icons-material/Menu';
import { Stack, styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { DashNavItem } from './DashNavItem';

// import { dsd } from '../../../../public/assets/images/dashlogo.png';

// import sasd from './dashlogo.png'

const drawerWidth = 240;

const HEADER_MOBILE = 60;

const HEADER_DESKTOP = 92;

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const ImageResponssive = styled('div')(({ theme }) => ({
  width: 600,
  [theme.breakpoints.down('xl')]: {
    width: 500,
  },
  [theme.breakpoints.down('md')]: {
    width: 400,
  },
  [theme.breakpoints.down('sm')]: {
    width: 200,
  },
  [theme.breakpoints.down('xs')]: {
    width: 200,
  },
}));

const ActiveLink = ({ to, activeClassName, ...rest }) => {
  return <NavLink to={to} activeClassName={activeClassName} {...rest} />;
};

const StyledActiveLink = styled(ActiveLink)(({ theme }) => ({
  fontWeight: 'bold',
  textDecoration: 'none',
  color: 'black',
  '&.active': {
    position: 'relative',
    '&::after': {
      content: "''",
      position: 'absolute',
      left: 0,
      bottom: '-2px', // Adjust the value to control the gap
      width: '100%',
      height: '2px',
      background: theme.palette.primary.main,
    },
  },
}));

function DashNav(props) {
  // const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // const isSmallScreen = useMediaQuery('(max-width:600px)');
  // const fontSize = isSmallScreen ? '5px' : '20px';

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MENU
      </Typography>
      <Divider />
      <List>
        {DashNavItem.map((nav, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => navigate(nav.path)}>
              <ListItemText primary={nav.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <Button sx={{ fontSize: 16 }} onClick={() => navigate('/auth/login')} variant="contained" size="large">
          Login
        </Button>
      </List>
    </Box>
  );

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar component="nav" sx={{ maxHeight: 120, backgroundColor: 'white', color: 'black' }}>
          <StyledToolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* <Searchbar /> */}

            <Stack direction="row" alignItems="center">
              {/* <Stack>
                <img src="https://www.telangana.gov.in/Style%20Library/GoT/Content/img/logo.png" height={75} />
              </Stack> */}
              {/* <Hidden mdDown> */}
              <Stack>
                {/* <Typography fontFamily={'Helvetica'} ml={1} color={'black'} variant="h4">
                  Government of Telangana
                </Typography>
                <Typography fontFamily={'Helvetica'} ml={1} color={'black'} variant="subtitle1">
                  Information Technology, Electronics and Communications Department
                </Typography> */}
                <Stack>
                  <ImageResponssive>
                    <img src={require('./MicrosoftTeams-image (5).png')} />
                  </ImageResponssive>
                </Stack>
              </Stack>
              {/* </Hidden> */}
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Stack
              direction="row"
              alignItems="center"
              spacing={{
                xs: 0.5,
                sm: 1,
              }}
            >
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Stack direction="row" alignItems={'center'} spacing={3}>
                  {DashNavItem.map((nav, index) => (
                    <StyledActiveLink key={index} to={nav.path} exact activeClassName="active">
                      {nav.name}
                    </StyledActiveLink>
                  ))}
                  <Button
                    sx={{ fontSize: 16 }}
                    onClick={() => navigate('/auth/login')}
                    variant="contained"
                    size="large"
                  >
                    Login
                  </Button>
                </Stack>
              </Box>
              <Stack>
                <Divider light={false} flexItem={true} orientation="vertical" />
              </Stack>
              {/* <LanguagePopover />
          <NotificationsPopover /> */}
            </Stack>
          </StyledToolbar>
        </AppBar>

        <Box component="nav">
          <Drawer
            // container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              // display: { xl: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
}

DashNav.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DashNav;
