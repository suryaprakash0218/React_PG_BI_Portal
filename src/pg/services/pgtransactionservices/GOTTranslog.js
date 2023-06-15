import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom/dist';
import DataTable from 'src/pg/utils/DataTable';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const columns = [
  {
    field: 'refId',
    headerName: 'Ref Id',
    width: 250,
  },
  {
    field: 'mobileNo',
    headerName: 'Mobile Number',
    width: 150,
  },

  { field: 'transId', headerName: 'Trans ID', width: 150 },
  {
    field: 'serviceName',
    headerName: 'Service Name',
    width: 150,
  },
  {
    field: 'serviceCode',
    headerName: 'Service Code',
    width: 150,
  },
  {
    field: 'channel',
    headerName: 'channel',
    width: 150,
  },
];

const GOTTranslog = () => {
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

export default GOTTranslog;
