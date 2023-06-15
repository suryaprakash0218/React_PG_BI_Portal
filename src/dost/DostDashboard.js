import { useTheme } from '@emotion/react';
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify/Iconify';
import { AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from 'src/sections/@dashboard/app';

import { useDispatch, useSelector } from 'react-redux';
import { getMysqlDostMonthlyCount, getMysqlDostTotalCount } from 'src/redux/dost/DostActions';

const DostDashboard = () => {
  const { allTrans, monthlyTrans } = useSelector((state) => state.dost);
  const allData = useSelector((state) => state.dost);

  console.log(allData);

  const totalCount = 0;

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
    dispatch(getMysqlDostTotalCount());
    dispatch(getMysqlDostMonthlyCount());
    // dispatch(getMssqPaymentTransTotal());
    // dispatch(getMysqYesterdaySuccesTotal());
    // dispatch(getMssqlMonthlyCount());
    setSuccess([]);
    setFailure([]);
    setPending([]);
    setDate([]);
  }, [refresh]);

  useMemo(() => {
    monthlyTrans?.success?.map((x) => {
      setSuccess((oldvalue) => [...oldvalue, x.count]);
      setDate((oldvalue) => [...oldvalue, x.date]);
    });
    monthlyTrans?.failure?.map((x) => {
      setFailure((oldvalue) => [...oldvalue, x.count]);
    });
    monthlyTrans?.pending?.map((x) => {
      setPending((oldvalue) => [...oldvalue, x.count]);
    });
  }, [monthlyTrans]);

  console.log(date);
  return (
    <>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Aadhaar Today Transactions
          </Typography>
          <Button
            onClick={() => setRefresh(!refresh)}
            variant="contained"
            startIcon={<Iconify icon="material-symbols:refresh" />}
          >
            Refresh
          </Button>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="All Transacton" total={allTrans?.allTrans} icon={'pajamas:file-addition-solid'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Success Transactions"
              total={allTrans?.successTrans}
              color="success"
              icon={'ep:success-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Pending Transactions"
              total={allTrans?.pendingTrans}
              color="warning"
              icon={'ic:outline-pending'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Failure Transactions"
              total={allTrans?.failureTrans}
              color="error"
              icon={'icon-park-outline:folder-failed'}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Today Transactions"
              chartData={[
                // { label: 'Total', value: Number(dataCount?.allData) },
                { label: 'Success', value: Number(allTrans?.successTrans) },
                { label: 'Pending', value: Number(allTrans?.pendingTrans) },
                { label: 'Failed', value: Number(allTrans?.failureTrans) },
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

export default DostDashboard;
