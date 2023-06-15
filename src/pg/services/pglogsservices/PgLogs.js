import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../../utils/DataTable';
import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const columns = [
  { field: 'dateTime', headerName: 'DateTime', width: 250 },
  {
    field: 'description',
    headerName: 'Description',
    width: 1380,
  },
];

const PgLogs = () => {
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
          <DataTable fileName={'Pg Logs'} row={state.data} column={columns}></DataTable>
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

export default PgLogs;
