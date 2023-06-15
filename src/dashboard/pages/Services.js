import React from 'react';
import { servicesNames } from '../constants/ServicesNames';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';

const Services = () => {
  return (
    <>
      {' '}
      <Container sx={{ mt: 8 }} maxWidth="xl">
        <Grid container spacing={6}>
          <Grid xs={12} md={12}>
            <Typography variant="h3" fontFamily={'Times New Roman'}>
              Sub Services
            </Typography>
          </Grid>

          {servicesNames.map((item) => (
            <>
              <Grid mt={5} spacing={3} xs={6} sm={4} md={3}>
                <Paper elevation={4} sx={{ mr: 3 }}>
                  <Box
                    minHeight={100}
                    minWidth={60}
                    justifyContent={'center'}
                    alignItems={'center'}
                    display={'flex'}
                    overflow={'auto'}
                  >
                    <Typography
                      color={'darkslateblue'}
                      fontFamily={'"Trebuchet MS", Helvetica, sans-serif'}
                      variant="h6"
                    >
                      {item.toString()}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Services;
