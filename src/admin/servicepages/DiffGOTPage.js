import { Box, Button, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom/dist';
import DataTable from 'src/pg/utils/DataTable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector } from 'react-redux';

const columns = [
  {
    field: 'accountno',
    headerName: 'Account No',
    width: 150,
  },
  { field: 'amt', headerName: 'Amount', width: 100 },
  {
    field: 'paymentdate',
    headerName: 'Payment Date',
    width: 250,
  },
  {
    field: 'channel',
    headerName: 'Channel',
    width: 150,
  },
  {
    field: 'cust_mobile_number',
    headerName: 'Customer Mobile Number',
    width: 250,
  },
  {
    field: 'mobtransid',
    headerName: 'MGOV ID',
    width: 300,
  },
  {
    field: 'pg_status',
    headerName: 'Pg Status',
    width: 100,
  },
  {
    field: 'paymenttype',
    headerName: 'Payment Type',
    width: 150,
  },
  {
    field: 'pgw_trans_id',
    headerName: 'pg Trans Id',
    width: 150,
  },
  {
    field: 'transaction_Status',
    headerName: 'Transaction Status',
    width: 350,
  },
  {
    field: 'refund',
    headerName: 'refund',
    width: 150,
  },
];

const DiffGOTPage = () => {
  const { data } = useSelector((state) => state.admin);
  console.log(data);

  const navigate = useNavigate();

  if (data === undefined || Object.keys(data).length == 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" sx={{}}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <IconButton onClick={() => navigate(-1)} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
      </Stack>
      <DataTable title={'Diff Datas'} column={columns} row={data} />
    </>
  );
};

export default DiffGOTPage;
