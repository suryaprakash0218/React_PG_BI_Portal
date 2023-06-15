import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessIcon from '@mui/icons-material/Business';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Container, Divider, Grid, Stack, Typography } from '@mui/material';
import DashApp from './utills/DashApp';
import DashCardCarousel from './utills/DashCardCarousel';
import DashCards from './utills/DashCards';
import DashCarousel from './utills/DashCarousel';
import { newServiceitems } from './constants/NewServiceItem';
import { popularServiceItem } from './constants/PopularServiceItem';
import DashFooter from './utills/DashFooter';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMSSQLuserAndTrans } from 'src/redux/dashboard/dashboardActions';

const hover = {
  height: 60,
  width: 60,
  transition: 'transform 0.15s ease-in-out',

  ':hover': {
    transform: 'scale3d(1.05, 1.05, 1)',
  },
};

const Dashboard = () => {
  const stateData = useSelector((state) => state.dashboard);

  const { allTrans } = stateData;

  console.log(stateData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMSSQLuserAndTrans());
    // Cookies.remove('Role');
  }, []);

  const departmentClick = () => {
    navigate('/sample/departments');
  };

  const servicesClick = () => {
    navigate('/sample/services');
  };

  return (
    <>
      <Helmet>
        <title> Dashboard | Payment Gateway </title>
        <link rel="canonical" href="http://example.com/example" />
      </Helmet>
      <DashCarousel />
      <Container sx={{ mt: 3 }} maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <DashCards
              title={'Departments'}
              count={13}
              icon={<BusinessIcon sx={{ ...hover }} />}
              onClick={departmentClick}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <DashCards
              title={'Services'}
              count={149}
              icon={<ReceiptLongIcon sx={{ ...hover }} />}
              onClick={servicesClick}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <DashCards
              title={'Registrations'}
              count={allTrans.userList ? allTrans.userList : 0}
              icon={<HowToRegIcon sx={{ ...hover }} />}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <DashCards
              title={'Transactions'}
              count={allTrans.totalTransactions ? allTrans.totalTransactions : 0}
              icon={<AccountBalanceIcon sx={{ ...hover }} />}
            />
          </Grid>
          <Grid item xs={12} mt={8}>
            <Typography variant="h2">What's New</Typography>
            <Typography mb={2} variant="subtitle1">
              Citizens may explore the newly added services on Tapp
            </Typography>
            <DashCardCarousel showData={newServiceitems} />
          </Grid>
          <Grid item mt={8} xs={12}>
            <Typography variant="h2">Popular Services</Typography>
            <Typography mb={2} variant="subtitle1">
              Explore the popularly used government services
            </Typography>
            <DashCardCarousel showData={popularServiceItem} />
          </Grid>
          <Grid item mt={{ md: 20, sm: 10 }} mb={{ md: 20, sm: 5, xs: 5 }}>
            <DashApp />
          </Grid>
        </Grid>
      </Container>
      <Divider orientation="horizontal" />
      <Container maxWidth={'xl'}>
        <Grid container mt={10}>
          <Grid item sm={12}>
            <DashFooter />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
