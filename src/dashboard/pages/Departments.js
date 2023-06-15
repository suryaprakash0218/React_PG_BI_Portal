import { Box, Card, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import DashCards from '../utills/DashCards';
import { departmentNames } from '../constants/DepartmentNames';

const Departments = () => {
  return (
    <>
      <Container sx={{ mt: 8 }} minWidth="lg" maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Typography variant="h3" fontFamily={'Times New Roman'}>
              Departments
            </Typography>
          </Grid>

          {departmentNames.map((item) => (
            <>
              <Grid item mt={5} spacing={3} xs={6} sm={6} md={3}>
                <Card
                  sx={{
                    maxWidth: 250,
                    minHeight: 180,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                  }}
                >
                  <Box maxWidth={200} justifyContent={'center'} alignItems={'center'} display={'flex'}>
                    <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
                      <Box
                        width={100}
                        height={100}
                        mb={2}
                        alignItems={'center'}
                        justifyContent={'center'}
                        display={'flex'}
                      >
                        <img src={item.image}></img>
                      </Box>

                      <Typography
                        color={'darkslateblue'}
                        fontFamily={'"Trebuchet MS", Helvetica, sans-serif'}
                        variant="h6"
                      >
                        {item.name.toString().toLocaleUpperCase()}
                      </Typography>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            </>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Departments;
