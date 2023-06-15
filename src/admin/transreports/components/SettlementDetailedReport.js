import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReportTable from './ReportTable';

const columns = [
  {
    field: 'paymentDate',
    headerName: 'Payment Date',
    width: 150,
  },
  { field: 'merchantName', headerName: 'Merchant Name', width: 200 },
  {
    field: 'modeOfPayment',
    headerName: 'Payment Mode',
    width: 150,
  },
  {
    field: 'transactionStatus',
    headerName: 'Transactional Status',
    width: 150,
  },
  {
    field: 'pgwSettlementDate',
    headerName: 'Settlement Date',
    width: 100,
  },
  {
    field: 'numberOfTransactions',
    headerName: 'No of Transaction',
    width: 100,
  },
  {
    field: 'paidAmount',
    headerName: 'Amount',
    width: 100,
  },
  {
    field: 'settlementAmount',
    headerName: 'Settlement Amount',
    width: 100,
  },
  {
    field: 'settlementPendingAmount',
    headerName: 'Settlement Pending Amount',
    width: 150,
  },
  {
    field: 'paymentGatewayCharges',
    headerName: 'PaymentGateway Charges',
    width: 200,
  },
];

const SettlementDetailedReport = () => {
  const stateData = useSelector((state) => state.reports);

  console.log(stateData);
  const { allReports, tableAdd } = stateData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [columnsArray, setColumnsArray] = useState([...columns]);

  function convertFirstLetterToLowercase(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  useEffect(() => {
    if (tableAdd?.length > 0) {
      tableAdd?.map((item) => {
        const add = {
          field: convertFirstLetterToLowercase(item),
          headerName: item,
          width: 150,
        };
        setColumnsArray((old) => [...old, add]);
      });
    }
  }, [tableAdd]);

  const CustomFooter = () => {
    return (
      <Box mt={1} bgcolor={'LightGray'}>
        <Stack direction={'row'} display={'flex'} fontWeight={'bold'} justifyContent={'flex-end'} spacing={3} mr={3}>
          <Typography fontWeight={'bold'}>Total</Typography>
          <Typography fontWeight={'bold'}>Amount : {allReports?.sumofamount}</Typography>
          <Typography fontWeight={'bold'}>Settlement : {allReports?.sumofsetlamount}</Typography>
          <Typography fontWeight={'bold'}>No.Trans : {allReports?.sumoftrnas}</Typography>
          <Typography fontWeight={'bold'}>Paid Charge Amount : {allReports?.sumpaidchargeamount}</Typography>
          <Typography fontWeight={'bold'}>Pending Amount : {allReports?.sumsetlpendingamount}</Typography>
        </Stack>
      </Box>
    );
  };

  return (
    <>
      {Object.keys(allReports?.bigotpaymentlist)?.length != 0 || allReports?.bigotpaymentlist != undefined ? (
        <>
          <Stack mb={2} direction={'column'} alignItems={'flex-start'}>
            <IconButton onClick={() => window.location.reload()} aria-label="back">
              <KeyboardBackspaceIcon />
            </IconButton>
          </Stack>
          <ReportTable
            fileName={'Settlement Detailed Report '}
            row={allReports.bigotpaymentlist}
            column={columnsArray}
            customeFooter={CustomFooter}
          ></ReportTable>
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

export default SettlementDetailedReport;
