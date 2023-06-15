import { Button, Container, Grid, IconButton, Stack, Typography, useStepContext } from '@mui/material';
import React, { useMemo, useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import { AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from 'src/sections/@dashboard/app';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { getMssqlYearlyMonthlyData } from 'src/redux/admin/AdminActions';
import { LoadingButton } from '@mui/lab';
import CircularLoading from 'src/utils/CircularLoading';

const CumulativeTrans = () => {
  const stateData = useSelector((state) => state.admin);
  console.log(stateData);
  const { cumulative, yearlyMonthlyTrans, buttonLoading } = stateData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [success, setSuccess] = useState([]);
  const [failure, setFailure] = useState([]);
  const [pending, setPending] = useState([]);
  const [date, setDate] = useState([]);

  const [refresh, setRefresh] = useState(false);

  useState(() => {
    dispatch(getMssqlYearlyMonthlyData());
  }, [refresh]);

  useMemo(() => {
    setSuccess([]);
    setFailure([]);
    setPending([]);
    yearlyMonthlyTrans?.success?.map((x) => {
      setSuccess((oldData) => [...oldData, x.count]);
      setDate((oldData) => [...oldData, x.year + '/' + x.month]);
    });
    yearlyMonthlyTrans?.failure?.map((x) => {
      setFailure((oldData) => [...oldData, x.count]);
    });
    yearlyMonthlyTrans?.pending?.map((x) => {
      setPending((oldData) => [...oldData, x.count]);
    });
  }, [yearlyMonthlyTrans]);

  console.log(success);
  console.log(failure);
  console.log(pending);
  console.log(date);

  if (Object.keys(cumulative).length === 0) {
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
            Yearly Transactions
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
          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary title="All Transacton" total={cumulative?.total} icon={'pajamas:file-addition-solid'} />
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              title="Success Transactions"
              total={cumulative?.success}
              color="success"
              icon={'ep:success-filled'}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              title="Pending Transactions"
              total={cumulative?.pending}
              color="warning"
              icon={'ic:outline-pending'}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <AppWidgetSummary
              title="Failure Transactions"
              total={cumulative?.failure}
              color="error"
              icon={'icon-park-outline:folder-failed'}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Yearly Transactions"
              subheader="Monthly Transaction"
              chartLabels={date}
              chartData={[
                {
                  name: 'success',
                  type: 'column',
                  fill: 'solid',
                  data: success,
                },

                {
                  name: 'pending',
                  type: 'line',
                  fill: 'solid',
                  data: failure,
                },
                {
                  name: 'failure',
                  type: 'area',
                  fill: 'gradient',
                  data: pending,
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Yearly Transactions"
              subheader={'Total Transactions'}
              chartData={[
                // { label: 'Total', value: Number(dataCount?.allData) },
                { label: 'Success', value: Number(cumulative?.success ? cumulative?.success : 0) },
                { label: 'Pending', value: Number(cumulative?.pending ? cumulative?.pending : 0) },
                { label: 'Failed', value: Number(cumulative?.failure ? cumulative?.failure : 0) },
              ]}
              chartColors={[
                // theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CumulativeTrans;
