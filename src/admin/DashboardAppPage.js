import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Grid, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import Iconify from '../components/iconify';
// sections
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getMssqlCumulative,
  getMssqlPgPlatformList,
  getMssqlTransactions,
  getMssqlUserDeviceList,
  getMysqlMobileUsers,
  getMysqlPgPlatform,
  getMysqlTotalCount,
} from 'src/redux/admin/AdminActions';
import AppMobileUsers from 'src/sections/@dashboard/app/AppMobileUsers';
import ServiceRingCharts from 'src/sections/@dashboard/app/ServiceRingCharts';
import CircularLoading from 'src/utils/CircularLoading';
import { AppConversionRates, AppWidgetSummary } from '../sections/@dashboard/app';

// import TodayTransactionsLiveChart from 'src/sections/@dashboard/app/TodayTransactionsLiveChart';
// const TodayTransactionsLiveChart = lazy(() => import('src/sections/@dashboard/app/TodayTransactionsLiveChart'));

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const data = useSelector((state) => state.admin);

  const {
    allTransactionServices,
    mobileUsers,
    pgPlatform,
    cumulative,
    totalCount,
    buttonLoading,
    userLists,
    totalPgname,
  } = data;

  console.log(data);

  // const totalCount = 0;

  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(getMysqlTotalCount());
    dispatch(getMssqlUserDeviceList());
    dispatch(getMysqlMobileUsers());
    dispatch(getMssqlPgPlatformList());
    dispatch(getMssqlCumulative());
    dispatch(getMssqlTransactions());
    dispatch(getMysqlPgPlatform());
  }, [refresh]);

  const getDepartmentWiseData = () => {
    navigate('/dashboard/alldept');
  };
  const getSubServiceWiseData = () => {
    navigate('/dashboard/subdept');
  };
  const getTotalTransactionData = () => {
    navigate('/dashboard/totaltrans');
  };
  const getCumulativeTransaction = () => {
    navigate('/dashboard/cumulative');
  };

  if (Object.keys(allTransactionServices).length === 0) {
    return (
      <>
        <CircularLoading />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | Payment Gateway </title>
        <link rel="canonical" href="http://example.com/example" />
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5}>
          {/* <Typography variant="h4" gutterBottom>
            Hi, Welcome back
          </Typography> */}
          <LoadingButton
            loadingIndicator="Loading..."
            loading={buttonLoading}
            onClick={() => setRefresh(!refresh)}
            variant="contained"
            startIcon={<Iconify icon="material-symbols:refresh" />}
          >
            Refresh
          </LoadingButton>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              info={true}
              infoClick={getDepartmentWiseData}
              title="Department"
              total={allTransactionServices?.allDept}
              icon={'pajamas:file-addition-solid'}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              title="Sub Services"
              total={allTransactionServices?.subDept}
              color="success"
              infoClick={getSubServiceWiseData}
              icon={'ep:success-filled'}
              info={true}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Transactions"
              total={allTransactionServices?.totalCount}
              color="warning"
              icon={'ic:outline-pending'}
              info={true}
              infoClick={getTotalTransactionData}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              title="Cumulative"
              total={cumulative?.total}
              color="error"
              icon={'ep:success-filled'}
              info={true}
              infoClick={getCumulativeTransaction}
            />
          </Grid>

          {/* <Grid item xs={12} md={4} lg={4}>
            <AppCurrentVisits
              title="Today Transactions"
              chartData={[
                // { label: 'Total', value: Number(dataCount?.allData) },
                { label: 'Success', value: Number(totalCount?.success ? totalCount?.success : 0) },
                { label: 'Pending', value: Number(totalCount?.pending ? totalCount?.pending : 0) },
                { label: 'Failed', value: Number(totalCount?.failure ? totalCount?.failure : 0) },
              ]}
              chartColors={[
                // theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid> */}

          <Grid item xs={12} md={4} lg={4}>
            <ServiceRingCharts
              marginy={4}
              title={'Total Users'}
              // subheader={'Today Transactions'}
              chartLabels={['Active', 'Inactive']}
              chartData={[
                userLists?.activeUsers ? userLists?.activeUsers : 0,
                userLists?.inactiveUsers ? userLists?.inactiveUsers : 0,
              ]}
              chartColors={['#00FF50', '#FF0025']}
            />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <AppMobileUsers
              title={'Using Devices'}
              // subheader={'Today Transactions'}
              chartLabels={['Android', 'IOS', 'Web']}
              chartData={[
                userLists?.android ? userLists?.android : 0,
                userLists?.ios ? userLists?.ios : 0,
                userLists?.web ? userLists?.web : 0,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <AppConversionRates
              title="PG Platform"
              subheader="Today transactions"
              chartData={[
                { label: 'ICICI_UPI', value: totalPgname?.icici_upi ? totalPgname?.icici_upi : 0 },
                { label: 'ICICI', value: totalPgname?.icici ? totalPgname?.icici : 0 },
                { label: 'Twallet', value: totalPgname?.t_wallet ? totalPgname?.t_wallet : 0 },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
