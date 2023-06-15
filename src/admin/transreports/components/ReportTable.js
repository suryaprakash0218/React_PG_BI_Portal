import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import {
  DataGrid,
  GridCloseIcon,
  GridPagination,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import FileSaver from 'file-saver';
import { useState } from 'react';

import '../../../App.css';

import { GridToolbarFilterButton } from '@mui/x-data-grid';
import XLSX from 'sheetjs-style';
import Iconify from 'src/components/iconify/Iconify';

import csvDownload from 'json-to-csv-export';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ReportTable = ({ row, column, fileName, title, refresh, refreshClick, buttonLoading, customeFooter }) => {
  const theme = useTheme();
  const [dataBool, setDataBool] = useState(true);
  const [snackbarBool, setSnackbarBool] = useState(false);
  const [separateData, setSeparatedata] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportExcel = (row, fileName) => {
    const ws = XLSX.utils.json_to_sheet(row);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  console.log(row);
  console.log(column);

  const exportPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a3');

    autoTable(doc, {
      theme: 'grid',
      head: [column.map((col) => col.headerName)],
      columns: column.map((col) => ({ ...col, dataKey: col.field })),
      body: row,
      didDrawPage: function (data) {
        doc.setFontSize(12);
        doc.setTextColor(40);
        doc.setFont('helvetica', 'bold');
        doc.text(fileName, data.settings.margin.left, 10);
      },
    });

    doc.save(`${fileName}.pdf`);
  };

  const exportCSV = () => {
    console.log('comming inside');
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
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  };

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
                    <MenuItem onClick={(e) => exportExcel(row, fileName)}>Export Excel</MenuItem>
                    <MenuItem onClick={exportPDF}>Export PDF</MenuItem>
                    <MenuItem onClick={() => csvDownload({ data: row, filename: fileName })}>Export CSV</MenuItem>
                  </Menu>
                </>
              }
              title={fileName}
            />
          </Hidden>
          <Hidden mdDown>
            <Stack my={3} direction="row" alignItems="center" justifyContent="space-between" overflow={'auto'}>
              <Typography
                sx={{
                  '@media (max-width:600px)': {
                    fontSize: '14px', // Adjust the font size for xs size
                  },
                }}
                variant="h6"
              >
                {fileName}
              </Typography>
              <Stack spacing={2} direction={'row'}>
                <Button size="small" variant="contained" onClick={(e) => exportExcel(row, fileName)}>
                  Export Excel
                </Button>
                <Button size="small" variant="contained" onClick={exportPDF}>
                  Export PDF
                </Button>
                <Button size="small" variant="contained" onClick={() => csvDownload({ data: row, filename: fileName })}>
                  {/* <CsvDownloadButton filename={fileName} data={row} /> */}
                  Export CSV
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
          <div className="report-table-container">
            <div className="datagrid-container">
              {/* <div style={{ display: 'flex', flexDirection: 'column', height: '400px' }}>
            <div style={{ flex: 1 }}> */}
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
                getRowHeight={() => 'auto'}
                onCellDoubleClick={handleCellClick}
                onCellClick={copyToClipBoard}
                headerStyle={{
                  position: 'sticky',
                  top: 0,
                  background: '#FFFFFF',
                  zIndex: 999,
                }}
                getRowId={(row) => Math.random(23)}
                slots={{ toolbar: CustomToolbar, pagination: GridPagination, footer: customeFooter }}
                pageSizeOptions={[5, 10, 25]}
                initialState={{
                  ...row.initialState,
                  pagination: { paginationModel: { pageSize: 100 } },
                }}
              />
            </div>
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
                  <Grid container spacing={1} justifyContent={'center'} alignItems={'center'} display={'flex'}>
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

export default ReportTable;
