import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  Hidden,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { DataGrid, GridCloseIcon, GridToolbar } from '@mui/x-data-grid';
import FileSaver from 'file-saver';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import XLSX from 'sheetjs-style';
import Iconify from 'src/components/iconify/Iconify';

const DataTable = ({ row, column, fileName, title, refresh, refreshClick, buttonLoading, gridFooter }) => {
  const theme = useTheme();
  const [dataBool, setDataBool] = useState(true);
  const [snackbarBool, setSnackbarBool] = useState(false);
  const [separateData, setSeparatedata] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (row, fileName) => {
    const ws = XLSX.utils.json_to_sheet(row);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  const handleCellClick = (params) => {
    console.log(params);
    setSeparatedata(params.row);
    setDataBool(false);
    // navigate("pglogsview", { state: { data: params.row } });
  };

  const copyToClipBoard = (params) => {
    navigator.clipboard.writeText(JSON.stringify(params.row));
    setSnackbarBool(true);
  };

  const snackbarHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarBool(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={snackbarHandleClose}>
      <GridCloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      {/* <Paper elevation={4}> */}
      {dataBool ? (
        <Card sx={{ height: '100% !important', width: '100% !important', p: 2 }} overflow={'auto'}>
          <Hidden mdUp>
            <CardHeader
              sx={{ mb: 3 }}
              action={
                <>
                  <IconButton aria-label="settings" onClick={handleOpenMenu}>
                    <MoreVertIcon />
                  </IconButton>

                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                    {refresh && <MenuItem onClick={() => refreshClick()}>Refresh</MenuItem>}
                    <MenuItem onClick={(e) => exportToCSV(row, fileName)}>Download Excel</MenuItem>
                    {/* <MenuItem onClick={handleCloseMenu}>Action 3</MenuItem> */}
                  </Menu>
                </>
              }
              title={title}
            />
          </Hidden>
          <Hidden mdDown>
            <Stack
              padding={2}
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              marginRight={1}
              overflow={'auto'}
            >
              <Typography
                sx={{
                  '@media (max-width:600px)': {
                    fontSize: '14px', // Adjust the font size for xs size
                  },
                }}
                padding={2}
                variant="h6"
              >
                {title}
              </Typography>
              <Stack spacing={2} direction={'row'}>
                <Button size="small" variant="contained" onClick={(e) => exportToCSV(row, fileName)}>
                  Export Excel
                </Button>
                {refresh && (
                  <LoadingButton
                    loadingIndicator="Loading..."
                    loading={buttonLoading}
                    startIcon={<Iconify icon="material-symbols:refresh" />}
                    variant="contained"
                    onClick={() => refreshClick()}
                  >
                    refresh
                  </LoadingButton>
                )}
              </Stack>
            </Stack>
          </Hidden>
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <DataGrid
              sx={{
                [theme.breakpoints.down('sm')]: {
                  '& .MuiDataGrid-root': {
                    minWidth: '100%',
                  },
                },
              }}
              rows={row}
              columns={column}
              autoHeight={true}
              onCellDoubleClick={handleCellClick}
              onCellClick={copyToClipBoard}
              getRowId={(row) => Math.random(23)}
              slots={{ toolbar: GridToolbar, loadingOverlay: LinearProgress }}
              components={{ Footer: gridFooter }}
            />
          </div>
        </Card>
      ) : (
        <>
          <Card>
            <Stack padding={2} direction="row" alignItems="center" marginRight={1}>
              {' '}
              <Button
                style={{ marginLeft: '5px', marginTop: '5px' }}
                variant="outlined"
                onClick={() => setDataBool(true)}
              >
                Back
              </Button>
            </Stack>

            {Object.keys(separateData).map((keys) => {
              return (
                <Box sx={{ padding: 2 }} overflow={'auto'}>
                  <Container maxWidth="xl">
                    <Grid container justifyContent={'center'} alignItems={'center'} display={'flex'}>
                      <Grid item xs={4}>
                        <Typography key={keys} color={'rebeccapurple'}>
                          {keys.toUpperCase()}
                        </Typography>{' '}
                      </Grid>
                      <Grid item xs={4}>
                        <Typography key={keys} display={'flex'} justifyContent={'center'}>
                          -
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        {separateData[keys]}
                      </Grid>
                    </Grid>
                    {/* <Stack direction={'row'} justifyContent={'space-evenly'} alignItems={'center'}>
                  <Typography key={keys} color={'rebeccapurple'}>
                    {keys.toUpperCase()}
                  </Typography>{' '}
                  <Typography key={keys}>-</Typography>
                  <Typography key={keys}>{separateData[keys]}</Typography>
                </Stack> */}
                  </Container>
                </Box>
              );
            })}
          </Card>
        </>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarBool}
        autoHideDuration={6000}
        onClose={snackbarHandleClose}
        message="Copied to clipboard!"
        action={action}
      />
      {/* </Paper> */}
    </>
  );
};

export default DataTable;
