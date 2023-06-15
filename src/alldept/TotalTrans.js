import { Button, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import { AppConversionRates, AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from 'src/sections/@dashboard/app';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import { useDispatch, useSelector } from 'react-redux';
import {
  getMssqGOTtransTotal,
  getMssqPaymentTransTotal,
  getMssqlDiffFromGOT,
  getMssqlDiffFromPaymentTrans,
  getMssqlMonthlyCount,
  getMysqYesterdaySuccesTotal,
  getMysqlMobileUsers,
  getMysqlPgPlatform,
  getMysqlTotalCount,
} from 'src/redux/admin/AdminActions';
import { lazy } from 'react';
import { Suspense } from 'react';
import { LoadingButton } from '@mui/lab';
import CircularLoading from 'src/utils/CircularLoading';
import AppMobileUsers from 'src/sections/@dashboard/app/AppMobileUsers';

// const TodayTransactionsLiveChart = lazy(() => import('../sections/@dashboard/app/TodayTransactionsLiveChart'));

const TotalTrans = () => {
  const {
    totalCount,
    paymentTransSucces,
    gotSuccess,
    mysqlYesterdaySuccess,
    gotYesterdaySuccess,
    paymentTransYesterdaySucces,
    monthlyCount,
    data,
    buttonLoading,
    mobileUsers,
    pgPlatform,
  } = useSelector((state) => state.admin);
  const allData = useSelector((state) => state.admin);

  console.log(allData);

  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [date, setDate] = useState([]);
  const [success, setSuccess] = useState([]);
  const [failure, setFailure] = useState([]);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    dispatch(getMysqlTotalCount());

    dispatch(getMssqGOTtransTotal());
    dispatch(getMssqPaymentTransTotal());
    dispatch(getMysqYesterdaySuccesTotal());
    dispatch(getMssqlMonthlyCount());
    dispatch(getMysqlMobileUsers());
    dispatch(getMysqlPgPlatform());
    setSuccess([]);
    setFailure([]);
    setPending([]);
    setDate([]);
  }, [refresh]);

  useMemo(() => {
    monthlyCount?.success?.map((x) => {
      setSuccess((oldvalue) => [...oldvalue, x.count]);
      setDate((oldvalue) => [...oldvalue, x.date]);
    });
    monthlyCount?.failure?.map((x) => {
      setFailure((oldvalue) => [...oldvalue, x.count]);
    });
    monthlyCount?.pending?.map((x) => {
      setPending((oldvalue) => [...oldvalue, x.count]);
    });
  }, [monthlyCount]);

  // console.log(date);

  const getDiffFrompaymentTrans = () => {
    dispatch(getMssqlDiffFromPaymentTrans());
    setIsLoading(true);
    navigate('/dashboard/difftrans');
    setIsLoading(false);
  };

  const getDiffFromgotpayments = () => {
    dispatch(getMssqlDiffFromGOT());
    setIsLoading(true);
    navigate('/dashboard/diffgot');
    setIsLoading(false);
  };

  if (Object.keys(totalCount).length === 0) {
    return (
      <>
        <CircularLoading />
      </>
    );
  }
  return (
    <>
      <Container maxWidth="xl">
        <Stack mb={2} direction={'row'} alignItems={'flex-start'}>
          <IconButton onClick={() => navigate(-1)} aria-label="back">
            <KeyboardBackspaceIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Today Transactions
          </Typography>
          <LoadingButton
            sx={{ whiteSpace: 'nowrap', minWidth: 'auto' }}
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
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="All Transacton"
              total={Number(totalCount?.allData)}
              icon={'pajamas:file-addition-solid'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Success Transactions"
              total={Number(totalCount?.success)}
              color="success"
              icon={'ep:success-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Pending Transactions"
              total={Number(totalCount?.pending)}
              color="warning"
              icon={'ic:outline-pending'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Failure Transactions"
              total={Number(totalCount?.failure)}
              color="error"
              icon={'icon-park-outline:folder-failed'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="MySQL Success"
              total={Number(mysqlYesterdaySuccess?.success)}
              color="success"
              icon={'ep:success-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="GOT Payments - Bio Trans"
              total={gotYesterdaySuccess?.paymentdepsuccesdepartsuccess}
              color={
                gotYesterdaySuccess?.paymentdepsuccesdepartsuccess === paymentTransYesterdaySucces?.success
                  ? 'success'
                  : gotYesterdaySuccess?.paymentdepsuccesdepartsuccess > paymentTransYesterdaySucces?.success
                  ? 'error'
                  : 'success'
              }
              icon={
                gotYesterdaySuccess?.paymentdepsuccesdepartsuccess === paymentTransYesterdaySucces?.success
                  ? 'ep:success-filled'
                  : gotYesterdaySuccess?.paymentdepsuccesdepartsuccess < paymentTransYesterdaySucces?.success
                  ? 'ep:success-filled'
                  : 'icon-park-outline:folder-failed'
              }
              button={
                gotYesterdaySuccess?.paymentdepsuccesdepartsuccess === paymentTransYesterdaySucces?.success
                  ? false
                  : gotYesterdaySuccess?.paymentdepsuccesdepartsuccess > paymentTransYesterdaySucces?.success
                  ? true
                  : false
              }
              buttonLoading={isLoading}
              buttonName="details"
              onClick={getDiffFromgotpayments}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Payment Trans"
              total={paymentTransYesterdaySucces?.success}
              color={
                gotYesterdaySuccess?.paymentdepsuccesdepartsuccess === paymentTransYesterdaySucces?.success
                  ? 'success'
                  : gotYesterdaySuccess?.paymentdepsuccesdepartsuccess < paymentTransYesterdaySucces?.success
                  ? 'error'
                  : 'success'
              }
              icon={
                gotYesterdaySuccess?.paymentdepsuccesdepartsuccess === paymentTransYesterdaySucces?.success
                  ? 'ep:success-filled'
                  : gotYesterdaySuccess?.paymentdepsuccesdepartsuccess < paymentTransYesterdaySucces?.success
                  ? 'icon-park-outline:folder-failed'
                  : 'ep:success-filled'
              }
              button={
                gotYesterdaySuccess?.paymentdepsuccesdepartsuccess === paymentTransYesterdaySucces?.success
                  ? false
                  : gotYesterdaySuccess?.paymentdepsuccesdepartsuccess < paymentTransYesterdaySucces?.success
                  ? true
                  : false
              }
              buttonName="details"
              onClick={getDiffFrompaymentTrans}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4}>
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
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="PG Platform"
              subheader="Today transactions"
              chartData={[
                { label: 'ICICI_UPI', value: pgPlatform?.icici_upi ? pgPlatform?.icici_upi : 0 },
                { label: 'ICICI', value: pgPlatform?.icici ? pgPlatform?.icici : 0 },
                { label: 'Twallet', value: pgPlatform?.t_wallet ? pgPlatform?.t_wallet : 0 },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppMobileUsers
              title={'Mobile Users'}
              subheader={'Today Transactions'}
              chartLabels={['Android', 'IOS']}
              chartData={[mobileUsers?.android ? mobileUsers?.android : 0, mobileUsers?.ios ? mobileUsers?.ios : 0]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Monthly Transactions"
              // subheader="(+43%) than last year"
              chartLabels={date}
              chartData={[
                {
                  name: 'Success',
                  type: 'column',
                  fill: 'solid',
                  data: success,
                },
                {
                  name: 'Pending',
                  type: 'area',
                  fill: 'gradient',
                  data: pending,
                },
                {
                  name: 'Failure',
                  type: 'line',
                  fill: 'solid',
                  data: failure,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TotalTrans;
