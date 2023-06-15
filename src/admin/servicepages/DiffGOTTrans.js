import { Box, CircularProgress, IconButton, Stack } from '@mui/material';
import React from 'react';
import DataTable from 'src/pg/utils/DataTable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom/dist';
import { useSelector } from 'react-redux';

const columns = [
  {
    field: 'transId',
    headerName: 'MGOV ID',
    width: 250,
  },
  {
    field: 'bankTransId',
    headerName: 'Bank Trans ID',
    width: 150,
  },
  { field: 'amount', headerName: 'Amount', width: 100 },
  { field: 'tid', headerName: 'Tid', width: 200 },
  {
    field: 'transDate',
    headerName: 'Payment Date',
    width: 275,
  },
  {
    field: 'ackCode',
    headerName: 'ackCode',
    width: 100,
  },
  {
    field: 'ackStatus',
    headerName: 'ackStatus',
    width: 100,
  },
  {
    field: 'channel',
    headerName: 'Channel',
    width: 150,
  },
  {
    field: 'mobileNo',
    headerName: 'Mobilenumber',
    width: 150,
  },

  {
    field: 'pGWStatus',
    headerName: 'Pg Status',
    width: 100,
  },
  {
    field: 'service',
    headerName: 'Service',
    width: 150,
  },
  {
    field: 'pgw_trans_id',
    headerName: 'Pg Trans Id',
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

const DiffGOTTrans = () => {
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

export default DiffGOTTrans;
