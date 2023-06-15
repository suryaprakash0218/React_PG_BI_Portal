import { useTheme } from '@emotion/react';
import { Button, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import { AppConversionRates, AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from 'src/sections/@dashboard/app';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMssqlDepartments } from 'src/redux/admin/AdminActions';
import { useSelect } from '@mui/base';
import { useState } from 'react';
import { getMysqlAadharTotalCount } from 'src/redux/aadhar/AadharActions';
import { getMysqlEsevaTotalCount } from 'src/redux/eseva/EsevaActions';
import { getMysqlMesevaTotalCount } from 'src/redux/meseva/MesevaActions';
import { getMysqlStampsTotalCount } from 'src/redux/stamps/StampsActions';
import { getMysqlRTATotalCount } from 'src/redux/rta/RTAActions';
import { LoadingButton } from '@mui/lab';
import ServiceRingCharts from 'src/sections/@dashboard/app/ServiceRingCharts';
import CircularLoading from 'src/utils/CircularLoading';
import { getMysqlDostTotalCount } from 'src/redux/dost/DostActions';
import { getMysqlTemplesTotalCount } from 'src/redux/temples/TemplesActions';

const AlldeptWiseTrans = () => {
  const stateData = useSelector((state) => state.admin);
  const aadharData = useSelector((state) => state.aadhar);
  const esevaData = useSelector((state) => state.eseva);
  const mesevaData = useSelector((state) => state.meseva);
  const stampsData = useSelector((state) => state.stamps);
  const rtaData = useSelector((state) => state.rta);
  const templesData = useSelector((state) => state.temples);
  const dostData = useSelector((state) => state.dost);

  // console.log(stateData);
  // console.log('aadharData', aadharData);
  // console.log('esevaData', esevaData);
  // console.log('mesevaData', mesevaData);
  // console.log('rtaData', rtaData);
  // console.log('stampsData', stampsData);

  const { departmentwiseTotal, buttonLoading } = stateData;
  console.log(departmentwiseTotal);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [refresh, serRefresh] = useState(false);
  const [bool, setBool] = useState(true);
  const [data, setData] = useState({});
  const [title, setTitle] = useState('');
  const contentRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    dispatch(getMssqlDepartments());
  }, [refresh]);

  useMemo(() => {
    setData({
      success: aadharData.allTrans.successTrans,
      failure: aadharData.allTrans.failureTrans,
      pending: aadharData.allTrans.pendingTrans,
    });
  }, [aadharData]);
  useMemo(() => {
    setData({
      success: esevaData.allTrans.successTrans,
      failure: esevaData.allTrans.failureTrans,
      pending: esevaData.allTrans.pendingTrans,
    });
  }, [esevaData]);
  useMemo(() => {
    setData({
      success: mesevaData.allTrans.successTrans,
      failure: mesevaData.allTrans.failureTrans,
      pending: mesevaData.allTrans.pendingTrans,
    });
  }, [mesevaData]);
  useMemo(() => {
    setData({
      success: stampsData.allTrans.successTrans,
      failure: stampsData.allTrans.failureTrans,
      pending: stampsData.allTrans.pendingTrans,
    });
  }, [stampsData]);
  useMemo(() => {
    setData({
      success: rtaData.allTrans.successTrans,
      failure: rtaData.allTrans.failureTrans,
      pending: rtaData.allTrans.pendingTrans,
    });
  }, [rtaData]);
  useMemo(() => {
    setData({
      success: templesData.allTrans.successTrans,
      failure: templesData.allTrans.failureTrans,
      pending: templesData.allTrans.pendingTrans,
    });
  }, [templesData]);
  useMemo(() => {
    setData({
      success: dostData.allTrans.successTrans,
      failure: dostData.allTrans.failureTrans,
      pending: dostData.allTrans.pendingTrans,
    });
  }, [dostData]);

  const aadharClick = () => {
    dispatch(getMysqlAadharTotalCount());
    setData({});
    setTitle('Aadhar Transactions');
    setBool(false);
  };
  const esevaClick = () => {
    setTitle('Eseva Transactions');
    setData({});
    dispatch(getMysqlEsevaTotalCount());
    setBool(false);
  };
  const mesevaClick = () => {
    dispatch(getMysqlMesevaTotalCount());
    setData({});
    setTitle('Meseva Transactions');
    setBool(false);
  };
  const stampsClick = () => {
    dispatch(getMysqlStampsTotalCount());
    setData({});
    setTitle('Stamps Transactions');
    setBool(false);
  };
  const rtaClick = () => {
    dispatch(getMysqlRTATotalCount());
    setData({});
    setTitle('RTA Transactions');
    setBool(false);
  };
  const dostClick = () => {
    dispatch(getMysqlDostTotalCount());
    setData({});
    setTitle('RTA Transactions');
    setBool(false);
  };
  const templesClick = () => {
    dispatch(getMysqlTemplesTotalCount());
    setData({});
    setTitle('RTA Transactions');
    setBool(false);
  };
  const dmaClick = () => {
    setBool(false);
  };

  console.log(data);

  if (Object.keys(departmentwiseTotal).length === 0) {
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
            Department Wise Transactions
          </Typography>
          <LoadingButton
            sx={{ whiteSpace: 'nowrap', minWidth: 'auto' }}
            loadingIndicator="Loading..."
            loading={buttonLoading}
            onClick={() => serRefresh(!refresh)}
            variant="contained"
            startIcon={<Iconify icon="material-symbols:refresh" />}
          >
            Refresh
          </LoadingButton>
        </Stack>

        <Grid container spacing={3}>
          <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
            <AppWidgetSummary title="Aadhar" total={departmentwiseTotal?.aadhaar} cardClick={aadharClick} />
          </Grid>
          <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
            <AppWidgetSummary title="Meseva" total={departmentwiseTotal?.meeseva} cardClick={mesevaClick} />
          </Grid>
          <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
            <AppWidgetSummary title="Eseva" total={departmentwiseTotal?.eseva} cardClick={esevaClick} />
          </Grid>
          <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
            <AppWidgetSummary title="Stamps" total={departmentwiseTotal?.stamps} cardClick={stampsClick} />
          </Grid>
          <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
            <AppWidgetSummary title="RTA" total={departmentwiseTotal?.rtaFest} cardClick={rtaClick} />
          </Grid>
          <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
            <AppWidgetSummary title="Dost" total={departmentwiseTotal?.dost} cardClick={dostClick} />
          </Grid>
          {departmentwiseTotal?.dma != 0 && (
            <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
              <AppWidgetSummary title="DMA" total={departmentwiseTotal?.dma} cardClick={dmaClick} />
            </Grid>
          )}
          {departmentwiseTotal?.itReturns != 0 && (
            <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
              <AppWidgetSummary title="IT Returns" total={departmentwiseTotal?.itReturns} />
            </Grid>
          )}
          {departmentwiseTotal?.martConnect != 0 && (
            <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
              <AppWidgetSummary title="Mart Connect" total={departmentwiseTotal?.martConnect} />
            </Grid>
          )}
          {departmentwiseTotal?.temples != 0 && (
            <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
              <AppWidgetSummary title="Temples" total={departmentwiseTotal?.temples} cardClick={templesClick} />
            </Grid>
          )}
        </Grid>
        <Grid mt={3} container spacing={3} maxWidth={'xl'}>
          {bool ? (
            <>
              <Grid ref={contentRef} item xs={12} sm={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="Today Transactions"
                  chartData={[
                    { label: 'Aadhar', value: Number(departmentwiseTotal?.aadhaar ? departmentwiseTotal?.aadhaar : 0) },
                    { label: 'meseva', value: Number(departmentwiseTotal?.meeseva ? departmentwiseTotal?.meeseva : 0) },
                    { label: 'Stamps', value: Number(departmentwiseTotal?.stamps ? departmentwiseTotal?.stamps : 0) },
                    { label: 'eseva', value: Number(departmentwiseTotal?.eseva ? departmentwiseTotal?.eseva : 0) },

                    { label: 'RTA', value: Number(departmentwiseTotal?.rtaFest ? departmentwiseTotal?.rtaFest : 0) },
                    { label: 'User', value: Number(0) },
                  ]}
                  chartColors={
                    [
                      // theme.palette.primary.main,
                      // theme.palette.info.main,
                      // theme.palette.warning.main,
                      // theme.palette.error.main,
                    ]
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates
                  title="Today Transactions"
                  subheader="Department wise"
                  chartData={[
                    { label: 'Stamps', value: departmentwiseTotal?.stamps ? departmentwiseTotal?.stamps : 0 },
                    { label: 'Aadhaar', value: departmentwiseTotal?.aadhaar ? departmentwiseTotal?.aadhaar : 0 },
                    { label: 'Eseva', value: departmentwiseTotal?.eseva ? departmentwiseTotal?.eseva : 0 },
                    { label: 'Meeseva', value: departmentwiseTotal?.meeseva ? departmentwiseTotal?.meeseva : 0 },
                    { label: 'RTA Fest', value: departmentwiseTotal?.rtaFest ? departmentwiseTotal?.rtaFest : 0 },
                  ]}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Stack mb={1} direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
                  <IconButton onClick={() => setBool(true)} aria-label="back">
                    <KeyboardBackspaceIcon />
                  </IconButton>
                  <Typography variant="h5">{title}</Typography>
                </Stack>
              </Grid>
              <Grid ref={contentRef} item xs={12} sm={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="Today Transactions"
                  chartData={[
                    { label: 'Success', value: Number(data?.success ? data?.success : 0) },
                    { label: 'Pending', value: Number(data?.pending ? data?.pending : 0) },
                    { label: 'Failure', value: Number(data?.failure ? data?.failure : 0) },
                  ]}
                  chartColors={[
                    // theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
                {/* <ServiceRingCharts
                  title={'Departmentwise Transactions'}
                  subheader={'Today'}
                  series={[
                    data?.success ? Number(data?.success) : 0,
                    data?.pending ? Number(data?.pending) : 0,
                    data?.failure ? Number(data?.failure) : 0,
                  ]}
                  labels={['Success', 'Pending', 'Failiure']}
                /> */}
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates
                  title="Today Transactions"
                  subheader="Department wise"
                  chartData={[
                    { label: 'Success', value: data?.success ? data?.success : 0 },
                    { label: 'Pending', value: data?.pending ? data?.pending : 0 },
                    { label: 'Failure', value: data?.failure ? data?.failure : 0 },
                  ]}
                  chartColors={[
                    // theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default AlldeptWiseTrans;
