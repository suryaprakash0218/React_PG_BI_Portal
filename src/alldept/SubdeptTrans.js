import { useTheme } from '@emotion/react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { LoadingButton } from '@mui/lab';
import { Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify/Iconify';
import { getMssqlSubDepartments } from 'src/redux/admin/AdminActions';
import { AppConversionRates, AppCurrentVisits, AppWidgetSummary } from 'src/sections/@dashboard/app';
import ServiceTreeMap from 'src/sections/@dashboard/app/ServiceTreeMap';
import CircularLoading from 'src/utils/CircularLoading';

const SubdeptTrans = () => {
  const stateData = useSelector((state) => state.admin);
  // console.log(stateData);

  const { subDepartmentwiseTotal, buttonLoading } = stateData;
  console.log(subDepartmentwiseTotal);
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [refresh, setrefresh] = useState(false);
  const [bool, setBool] = useState(true);
  const [title, setTitle] = useState('');
  const [treeChartData, setTreeChartData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartLabel, setChartLabel] = useState([]);

  const contentRef = useRef(null);

  const scrollToContent = () => {
    contentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    dispatch(getMssqlSubDepartments());
  }, [refresh]);

  const esevaClick = () => {
    setTreeChartData([]);
    setTitle('Eseva SubServices');
    setBool(false);
    Object.keys(subDepartmentwiseTotal?.eseva).map((keys) => {
      setTreeChartData((old) => [...old, { x: keys, y: subDepartmentwiseTotal?.eseva[keys] }]);
    });
  };

  const mesevaClick = () => {
    setTreeChartData([]);
    setTitle('Meseva SubServices');
    setBool(false);
    Object.keys(subDepartmentwiseTotal?.meseva).map((keys) => {
      setTreeChartData((old) => [...old, { x: keys, y: subDepartmentwiseTotal?.meseva[keys] }]);
    });
  };

  const aadharClick = () => {
    setTreeChartData([]);
    setTitle('Aadhaar SubServices');
    setBool(false);
    Object.keys(subDepartmentwiseTotal?.aadhar).map((keys) => {
      setTreeChartData((old) => [...old, { x: keys, y: subDepartmentwiseTotal?.aadhar[keys] }]);
    });
  };

  const rtaClick = () => {
    setTreeChartData([]);
    setTitle('RtaFest SubServices');
    setBool(false);
    Object.keys(subDepartmentwiseTotal?.rtaFest).map((keys) => {
      setTreeChartData((old) => [...old, { x: keys, y: subDepartmentwiseTotal?.rtaFest[keys] }]);
    });
  };

  const stampsClick = () => {
    setTreeChartData([]);
    setTitle('Stamps SubServices');
    setBool(false);
    Object.keys(subDepartmentwiseTotal?.stamps).map((keys) => {
      setTreeChartData((old) => [...old, { x: keys, y: subDepartmentwiseTotal?.stamps[keys] }]);
    });
  };

  const dostClick = () => {
    setTreeChartData([]);
    setTitle('Dost SubServices');
    setBool(false);
    Object.keys(subDepartmentwiseTotal?.dost).map((keys) => {
      setTreeChartData((old) => [...old, { x: keys, y: subDepartmentwiseTotal?.dost[keys] }]);
    });
  };
  const templesClick = () => {
    setTreeChartData([]);
    setTitle('Temples SubServices');
    setBool(false);
    Object.keys(subDepartmentwiseTotal?.temples).map((keys) => {
      setTreeChartData((old) => [...old, { x: keys, y: subDepartmentwiseTotal?.temples[keys] }]);
    });
  };

  if (Object.keys(subDepartmentwiseTotal).length === 0) {
    return (
      <>
        <CircularLoading />
      </>
    );
  }
  return (
    <>
      <Container maxWidth="xl">
        <Stack mb={1} direction={'row'} alignItems={'flex-start'}>
          <IconButton onClick={() => navigate(-1)} aria-label="back">
            <KeyboardBackspaceIcon />
          </IconButton>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Sub Departments
          </Typography>
          <LoadingButton
            sx={{ whiteSpace: 'nowrap', minWidth: 'auto' }}
            loadingIndicator="Loading..."
            loading={buttonLoading}
            onClick={() => setrefresh(!refresh)}
            variant="contained"
            startIcon={<Iconify icon="material-symbols:refresh" />}
          >
            Refresh
          </LoadingButton>
        </Stack>
        <Grid container spacing={3}>
          {/* {Object.keys(subDepartmentwiseTotal).map((keys) => (
            <Grid item xs={3} sm={2} md={1.5}>
              <AppWidgetSummary title={keys} total={subDepartmentwiseTotal[keys]} />
            </Grid>
          ))} */}
          <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
            <AppWidgetSummary
              title="Aadhaar(Sub-Services)"
              total={subDepartmentwiseTotal?.aadharTotal}
              cardClick={aadharClick}
            />
          </Grid>
          <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
            <AppWidgetSummary
              title="Eeseva(Sub-Services)"
              total={subDepartmentwiseTotal?.esevaTotal}
              cardClick={esevaClick}
            />
          </Grid>
          <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
            <AppWidgetSummary
              title="Meeseva(Sub-Services)"
              total={subDepartmentwiseTotal?.mesevaTotal}
              cardClick={mesevaClick}
            />
          </Grid>
          <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
            <AppWidgetSummary
              title="RTA-Fest(Sub-Services)"
              total={subDepartmentwiseTotal?.rtaFestTotal}
              cardClick={rtaClick}
            />
          </Grid>
          <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
            <AppWidgetSummary
              title="Stamps-IGRS(Sub-Services)"
              total={subDepartmentwiseTotal?.stampsTotal}
              cardClick={stampsClick}
            />
          </Grid>
          {subDepartmentwiseTotal?.dostTotal != 0 && (
            <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
              <AppWidgetSummary
                title="Dost(Sub-Services)"
                total={subDepartmentwiseTotal?.dostTotal}
                cardClick={dostClick}
              />
            </Grid>
          )}
          {subDepartmentwiseTotal?.itRetuensTotal != 0 && (
            <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
              <AppWidgetSummary
                title="ITReturns(Sub-Services)"
                total={subDepartmentwiseTotal?.itRetuensTotal}
                cardClick={dostClick}
              />
            </Grid>
          )}
          {subDepartmentwiseTotal?.templesTotal != 0 && (
            <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
              <AppWidgetSummary
                title="Temples(Sub-Services)"
                total={subDepartmentwiseTotal?.templesTotal}
                cardClick={templesClick}
              />
            </Grid>
          )}
          {subDepartmentwiseTotal?.martConnectTotal != 0 && (
            <Grid onClick={scrollToContent} item xs={6} sm={3} md={2}>
              <AppWidgetSummary
                title="Mart Connect(Sub-Services)"
                total={subDepartmentwiseTotal?.martConnectTotal}
                cardClick={dostClick}
              />
            </Grid>
          )}
        </Grid>

        <Grid container mt={3} spacing={3}>
          {bool ? (
            <>
              <Grid ref={contentRef} item xs={12} sm={12} md={6} lg={4}>
                <AppCurrentVisits
                  title="Sub Services"
                  // subheader={'Today Transactions'}
                  chartData={[
                    {
                      label: 'Aadhaar',
                      value: subDepartmentwiseTotal?.aadharTotal ? subDepartmentwiseTotal?.aadharTotal : 0,
                    },
                    {
                      label: 'Eseva',
                      value: subDepartmentwiseTotal?.esevaTotal ? subDepartmentwiseTotal?.esevaTotal : 0,
                    },
                    {
                      label: 'Meseva',
                      value: subDepartmentwiseTotal?.mesevaTotal ? subDepartmentwiseTotal?.mesevaTotal : 0,
                    },
                    {
                      label: 'RtaFest',
                      value: subDepartmentwiseTotal?.rtaFestTotal ? subDepartmentwiseTotal?.rtaFestTotal : 0,
                    },
                    {
                      label: 'Stamps',
                      value: subDepartmentwiseTotal?.stampsTotal ? subDepartmentwiseTotal?.stampsTotal : 0,
                    },
                    {
                      label: 'Dost',
                      value: subDepartmentwiseTotal?.dostTotal ? subDepartmentwiseTotal?.dostTotal : 0,
                    },
                  ]}
                  // chartColors={[
                  //   // theme.palette.primary.main,
                  //   theme.palette.info.main,
                  //   theme.palette.warning.main,
                  //   theme.palette.error.main,
                  // ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates
                  title="Sub Services"
                  subheader={'Today Transactions'}
                  chartData={[
                    {
                      label: 'Aadhaar',
                      value: subDepartmentwiseTotal?.aadharTotal ? subDepartmentwiseTotal?.aadharTotal : 0,
                    },
                    {
                      label: 'Stamps',
                      value: subDepartmentwiseTotal?.stampsTotal ? subDepartmentwiseTotal?.stampsTotal : 0,
                    },
                    {
                      label: 'Meeseva',
                      value: subDepartmentwiseTotal?.mesevaTotal ? subDepartmentwiseTotal?.mesevaTotal : 0,
                    },
                    {
                      label: 'Eseva',
                      value: subDepartmentwiseTotal?.esevaTotal ? subDepartmentwiseTotal?.esevaTotal : 0,
                    },
                    {
                      label: 'RTA Fest',
                      value: subDepartmentwiseTotal?.rtaFestTotal ? subDepartmentwiseTotal?.rtaFestTotal : 0,
                    },
                    {
                      label: 'Dost',
                      value: subDepartmentwiseTotal?.dostTotal ? subDepartmentwiseTotal?.dostTotal : 0,
                    },
                    {
                      label: 'Mart Connect',
                      value: subDepartmentwiseTotal?.martConnectTotal ? subDepartmentwiseTotal?.martConnectTotal : 0,
                    },
                  ]}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={12}>
                <Stack mb={1} direction={'row'} alignItems={'center'} justifyContent={'flex-start'}>
                  <IconButton onClick={() => setBool(true)} aria-label="back">
                    <KeyboardBackspaceIcon />
                  </IconButton>
                  <Typography variant="h5">{title}</Typography>
                </Stack>
              </Grid>
              <Grid ref={contentRef} item xs={12} md={6} lg={12}>
                <ServiceTreeMap
                  title={'Sub Department Wise'}
                  subheader={'Today Transactions'}
                  chartData={treeChartData}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default SubdeptTrans;
