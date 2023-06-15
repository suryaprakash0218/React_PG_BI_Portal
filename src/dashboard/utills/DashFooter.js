import { Grid, Icon, Link, Stack, Typography } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';

const DashFooter = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6} md={4} alignItems={'center'} justifyContent={'center'}>
          <Stack direction={'column'} alignItems={'flex-start'} justifyContent={'center'} spacing={1}>
            <Typography mb={2} variant="h5">
              Help
            </Typography>
            <Link sx={{ textDecoration: 'none', cursor: 'pointer' }}>
              <Typography color={'gray'} variant="subtitle1">
                User Manual
              </Typography>
            </Link>
            <Link sx={{ textDecoration: 'none' }}>
              <Typography color={'gray'} variant="subtitle1">
                Privacy Policy
              </Typography>
            </Link>
            <Link sx={{ textDecoration: 'none' }}>
              <Typography color={'gray'} variant="subtitle1">
                Cancellation/Refund Policy
              </Typography>
            </Link>
            <Link sx={{ textDecoration: 'none' }}>
              <Typography color={'gray'} variant="subtitle1">
                FAQ
              </Typography>
            </Link>
            <Link sx={{ textDecoration: 'none' }}>
              <Typography color={'gray'} variant="subtitle1">
                Terms and Condition
              </Typography>
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={6} sm={6} md={4}>
          <Stack direction={'column'} alignItems={'flex-start'} spacing={1}>
            <Typography mb={2} variant="h5">
              Quick Links
            </Typography>
            <Link sx={{ textDecoration: 'none' }}>
              <Typography color={'gray'} variant="subtitle1">
                About us
              </Typography>
            </Link>
            <Link sx={{ textDecoration: 'none' }}>
              <Typography color={'gray'} variant="subtitle1">
                Dashboard
              </Typography>
            </Link>
            <Link sx={{ textDecoration: 'none' }}>
              <Typography color={'gray'} variant="subtitle1">
                Conact us
              </Typography>
            </Link>
            <Link sx={{ textDecoration: 'none' }}>
              <Typography color={'gray'} variant="subtitle1">
                Our Partners
              </Typography>
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={1}>
            {/* <Typography variant="h4">Powerd By</Typography> */}
            <Typography>
              <img src="https://transactionanalysts.com/wp-content/uploads/2019/10/ta_logo.png" />
            </Typography>

            <Typography color={'grey'}>© 2023 Transaction Analysts ,Benglore ,All Rights Reserved</Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default DashFooter;
