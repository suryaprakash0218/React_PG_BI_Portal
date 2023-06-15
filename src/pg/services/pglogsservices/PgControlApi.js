import { Box, Card, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../../utils/DataTable';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const columns = [
  { field: 'dateTime', headerName: 'DateTime', width: 250 },
  {
    field: 'pgwTransId',
    headerName: 'pgwTransId',
    width: 150,
  },
  {
    field: 'request',
    headerName: 'request',
    width: 300,
  },
  {
    field: 'response',
    headerName: 'response',
    width: 300,
  },
  {
    field: 'retry',
    headerName: 'retry',
    width: 150,
  },
  {
    field: 'source',
    headerName: 'source',
    width: 150,
  },
  {
    field: 'state',
    headerName: 'state',
    width: 150,
  },
  {
    field: 'success',
    headerName: 'success',
    width: 150,
  },
];

const PgControlApi = () => {
  const { state } = useLocation();
  console.log(state);

  const navigate = useNavigate();

  if (state.data == null || state.data == undefined) {
    return (
      <>
        <Card>
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
          <DataTable fileName={'pg Control Api'} row={state.data} column={columns}></DataTable>
        </>
      ) : (
        <Card elevation={5}>
          <Grid container direction="column" alignItems="center" justifyContent="center" display={'flex'}>
            <Grid item xs={12}>
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  padding: 20,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6">No Data Found!</Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
};

export default PgControlApi;
