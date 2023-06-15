import { SignalCellularNull } from '@mui/icons-material';
import { Box, Button, Card, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../../utils/DataTable';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const columns = [
  { field: 'mobTransId', headerName: 'Mob Trans ID', width: 250 },

  {
    field: 'pgStatus',
    headerName: 'Pg Status',
    width: 150,
  },
  {
    field: 'amt',
    headerName: 'Amount',
    width: 150,
  },
  {
    field: 'tid',
    headerName: 'TId',
    width: 150,
  },
  {
    field: 'transId',
    headerName: 'TransId',
    width: 250,
  },

  {
    field: 'channel',
    headerName: 'channel',
    width: 150,
  },
  {
    field: 'mobileNo',
    headerName: 'MobileNo',
    width: 150,
  },
  {
    field: 'mode',
    headerName: 'Payment Mode',
    width: 150,
  },
  {
    field: 'retryCount',
    headerName: 'Retry Count',
    width: 150,
  },
  {
    field: 'pgwname',
    headerName: 'Pgwname',
    width: 150,
  },
];

const PgTransLog = () => {
  const { state } = useLocation();
  console.log(state);

  const navigate = useNavigate();

  const [sentData, setSentData] = useState([]);

  useEffect(() => {
    if (Object.keys(state?.data).length != 0 || state == !null) {
      state.data.map((x) => {
        const data = {
          id: x.id,
          transId: x.transId,
          amt: x.amt,
          tid: x.tid,
          mobTransId: x.mobTransId,
          pgStatus: x.pgStatus,
          channel: x.channel,
          mobileNo: x.mobileNo,
          mode: x.mode,
          retryCount: x.retryCount,
          pgwname: x.pgwname,
        };
        setSentData([data]);
      });
    }
  }, [state]);
  console.log(sentData);

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
          {' '}
          <Stack mb={2} direction={'column'} alignItems={'flex-start'}>
            <IconButton onClick={() => navigate(-1)} aria-label="back">
              <KeyboardBackspaceIcon />
            </IconButton>
          </Stack>
          <DataTable fileName={'Pg Trans Log'} row={state.data} column={columns}></DataTable>
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

export default PgTransLog;
