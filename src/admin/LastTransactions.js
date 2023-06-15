import { ContactsOutlined } from '@mui/icons-material';
import { Box, CircularProgress, Container, IconButton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'src/pg/utils/DataTable';
import { getMysqlLatestTransactions } from 'src/redux/admin/AdminActions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardServices from 'src/services/DashboardServices';
import { useNavigate } from 'react-router-dom';

const columns = [
  { field: 'mobTransId', headerName: 'Mob Trans ID', width: 250 },
  {
    field: 'amt',
    headerName: 'Amount',
    width: 100,
  },
  {
    field: 'tid',
    headerName: 'TId',
    width: 150,
  },
  {
    field: 'pgStatus',
    headerName: 'Pg Status',
    width: 150,
  },
  {
    field: 'paymentDate',
    headerName: 'Payment Date',
    width: 300,
  },
  {
    field: 'channel',
    headerName: 'channel',
    width: 150,
  },
  {
    field: 'custMobileNumber',
    headerName: 'Customer Mobile Number',
    width: 200,
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

const LastTransactions = () => {
  const stateData = useSelector((state) => state.admin);
  const { latestTransactions, buttonLoading } = stateData;

  console.log(stateData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    dispatch(getMysqlLatestTransactions());
  }, [refresh]);

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  // if (paymentData == undefined || paymentData == null || Object.keys(paymentData).length == 0) {
  //   return (
  //     <Box display="flex" justifyContent="center" alignItems="center" height="100vh" sx={{}}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }
  return (
    <>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <IconButton onClick={() => navigate(-1)} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
        </Stack>
        <DataTable
          refresh={true}
          refreshClick={refreshPage}
          title={'Latest Transactions'}
          column={columns}
          row={latestTransactions}
          buttonLoading={buttonLoading}
        />
      </Container>
    </>
  );
};

export default LastTransactions;
