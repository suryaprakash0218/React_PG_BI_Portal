import PropTypes from 'prop-types';
// @mui
import { AppBar, Box, Divider, Hidden, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import AccountPopover from './AccountPopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  padding: 5,
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const ImageResponssive = styled('div')({
  width: '100%',
  height: 'auto',
});

const ImageLogoResponssive = styled('div')(({ theme }) => ({
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

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        {/* <Searchbar /> */}

        <Stack direction="row" alignItems="center">
          {/* <Stack>
            <img src="https://www.telangana.gov.in/Style%20Library/GoT/Content/img/logo.png" height={75} />
          </Stack> */}
          <Stack>
            <ImageLogoResponssive>
              <img src={require('../../dash/header/MicrosoftTeams-image (5).png')} />
            </ImageLogoResponssive>
          </Stack>
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
          <ImageResponssive>
            <Stack direction="row" spacing={3} sx={{ marginRight: '10px !important' }}>
              <Hidden mdDown>
                <img src="https://amritmahotsav.nic.in/writereaddata/portal/images/g-20-logo.png" />

                <img src="https://amritmahotsav.nic.in/writereaddata/portal/images/logo-black.png" />
              </Hidden>
            </Stack>
          </ImageResponssive>

          <Stack>
            <Divider light={false} flexItem={true} orientation="vertical" />
          </Stack>
          {/* <LanguagePopover />
          <NotificationsPopover /> */}
          <Stack ml={3}>
            <AccountPopover />
          </Stack>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
