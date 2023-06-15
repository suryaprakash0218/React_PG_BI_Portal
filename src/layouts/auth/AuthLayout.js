import { Height } from '@mui/icons-material';
import { Container, Grid, Hidden, styled } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

const StyledLogin = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
}));

const ImageResponssive = styled('div')({
  width: '100%',
  height: 'auto',
});

const ColorComponent = styled('div')({
  // width: '100%',
  // height: 'auto',
  backgroundColor: 'white',
});

const AuthLayout = () => {
  return (
    <>
      <Helmet bodyAttributes={{ style: 'background-color : white' }} />

      <Container maxWidth={'xl'}>
        <Grid
          container
          // spacing={2}
          mt={2}
          alignItems="center"
          justifyContent="center"
          display={'flex'}
          spacing={4}
          // style={{ minHeight: '100vh', backgroundColor: 'white' }}
        >
          <Hidden lgDown>
            <Grid item md={6} alignItems="end" justifyContent="end">
              <ImageResponssive>
                <img
                  src="https://transactionanalysts.com/wp-content/uploads/2022/07/ta-twallet.png"
                  // width={1550}
                  // height={887}
                ></img>
              </ImageResponssive>
            </Grid>
          </Hidden>

          <Grid item md={6} sm={12} alignItems="center" justifyContent="center" display={'flex'}>
            <StyledLogin>
              <Outlet />
            </StyledLogin>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AuthLayout;
