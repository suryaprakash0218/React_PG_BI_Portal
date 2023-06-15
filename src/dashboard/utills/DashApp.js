import { Image } from '@mui/icons-material';
import { Box, Grid, Hidden, Link, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

const DashApp = () => {
  return (
    <>
      <Grid container spacing={3} justifyContent={'center'} alignItems={'center'}>
        <Hidden mdDown>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box
              justifyContent={'center'}
              alignItems={'center'}
              component="img"
              height="auto"
              sx={{ maxWidth: { sm: 600 } }}
              alt="The house from the offer."
              src="https://play-lh.googleusercontent.com/KGiMLoU-mUQ3Xcy71dUnOthKwTMD_yQlWdwJ4geUHVzNaAtev8M9wp2-ClZ-7pa7ds0=w600-h300-pc0xffffff-pd"
            />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={12} md={6} lg={6} mt={{ xs: 5 }} alignItems={'center'} justifyContent={'center'}>
          <Typography variant="h2">Experience TApp on Android and IOS devices</Typography>
          <Typography variant="subtitle1">
            Tapp is a single unified app to access major e-government services anytime, anywhere on your mobile phone
          </Typography>
          <Stack direction={'row'} mt={3} alignItems={'center'} justifyContent={'center'} spacing={4}>
            <Link
              sx={{
                ':hover': {
                  boxShadow: 6,
                },
              }}
              href="https://play.google.com/store/apps/details?id=com.tfolio.telangana.gov&hl=en_IN&gl=US"
            >
              <Typography>
                <img src="https://media.umangapp.in/cdn/landing/theme/icons/google-play-store.svg" />
              </Typography>
            </Link>
            <Link
              sx={{
                ':hover': {
                  boxShadow: 6,
                },
              }}
              href="https://apps.apple.com/in/app/t-app-folio/id1255052471"
            >
              <Typography>
                <img src="https://media.umangapp.in/cdn/landing/theme/icons/app-store.svg" />
              </Typography>
            </Link>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default DashApp;
