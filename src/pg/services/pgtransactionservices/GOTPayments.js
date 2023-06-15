import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom/dist';
import DataTable from 'src/pg/utils/DataTable';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const columns = [
  { field: 'mobtransid', headerName: 'Mob Trans ID', width: 250 },
  {
    field: 'pg_status',
    headerName: 'Pg Status',
    width: 150,
  },
  {
    field: 'amt',
    headerName: 'Amount',
    width: 150,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },

  {
    field: 'channel',
    headerName: 'channel',
    width: 150,
  },
  {
    field: 'mobileno',
    headerName: 'MobileNo',
    width: 150,
  },
  {
    field: 'paymenttype',
    headerName: 'Payment Type',
    width: 150,
  },
  {
    field: 'deptname',
    headerName: 'Dept Name',
    width: 150,
  },
  {
    field: 'service_PROVIDER',
    headerName: 'Service Provider',
    width: 150,
  },
];

const GOTPayments = () => {
  const { state } = useLocation();
  console.log(state);

  const navigate = useNavigate();

  if (state.data == null || state.data == undefined) {
    return (
      <>
        <Card elevation={5}>
          <Box sx={{ height: 400, width: '100%' }}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ height: '50vh' }}
            >
              <Grid item xs={3}>
                <Typography textAlign={'center'} variant="h6">
                  No Data Found!
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </>
    );
  }

  return (
    <>
      {state.data.length != 0 ? (
        <>
          <Stack mb={2} direction={'column'} alignItems={'flex-start'}>
            <IconButton onClick={() => navigate(-1)} aria-label="back">
              <KeyboardBackspaceIcon />
            </IconButton>
          </Stack>
          <DataTable fileName={'GOT payments'} row={state.data} column={columns}></DataTable>
        </>
      ) : (
        <Card elevation={5}>
          <Box sx={{ maxHeight: 400, minWidth: 440 }}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ height: '50vh' }}
            >
              <Grid item xs={3}>
                <Typography textAlign={'center'} variant="h6">
                  No Data Found!
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      )}
    </>
  );
};

export default GOTPayments;
