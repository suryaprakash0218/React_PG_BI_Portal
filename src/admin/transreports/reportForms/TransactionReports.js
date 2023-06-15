import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
  useTheme,
} from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';
import * as Yup from 'yup';
import '../../../App.css';

import { financialReportsConst, usageReportsConst } from '../constants/reportsconst';

import SettlementDetailedReportsForm from '../reportForms/SettlementDetailedReportsForm';
import RefundReportsForm from './RefundReportsForm';

const TransactionReports = ({ scrollToContent }) => {
  const stateData = useSelector((state) => state.reports);

  console.log(stateData);

  const { isButtonLoading, isData } = stateData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();

  const [report, setReport] = useState('financialReport');
  const [reportType, setReportType] = useState('');

  return (
    <>
      {/* <Container maxWidth="xl"> */}
      <Typography variant="h3" fontFamily={'sans-serif'}>
        Reports
      </Typography>
      <Card sx={{ p: 5, mt: 2 }}>
        <Formik
          initialValues={{
            reports: 'financialReport',
            reportsType: '',
          }}
          validationSchema={Yup.object().shape({
            // reports: Yup.string().max(255).required('Reports is required!'),
            // reportsType: Yup.string().max(255).required('Reports Type is required!'),
            // // date: Yup.array().required('Date is required'),
            // transactionStatus: Yup.string().max(255).notRequired(),
            // paymentMode: Yup.string().max(255).notRequired(),
            // serviceProvider: Yup.string().max(255).notRequired(),
            // individualServices: Yup.string().max(255).notRequired(),
            // startDate: Yup.string().required('Start date is required'),
            // endDate: Yup.string()
            //   .required('End date is required')
            //   .min(Yup.ref('startDate'), 'End date must be after start date'),
            // .when('serviceProvider', (value, schema) => {
            //   console.log('yuppppppp', value);
            //   if (value[0]?.length == 0) {
            //     return schema.required('serviceProvider is required when individualServices is filled');
            //   }
            //   return schema;
            // }),
            // additionalColumn: Yup.string().max(255).notRequired(),
          })}
          // onSubmit={handleLoginSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            setFieldError,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit} onChange={handleChange}>
              {JSON.stringify(values)}
              <Grid container spacing={2}>
                {/* {errorMsg && (
                  <FormHelperText sx={{ mb: 2 }} error id="standard-weight-helper-text-email-login">
                    {errorMsg}
                  </FormHelperText>
                )} */}

                <Grid item xs={12} md={12}>
                  <Box>
                    <FormLabel>Reports</FormLabel>
                  </Box>

                  <FormControl fullWidth>
                    {/* <InputLabel id="demo-simple-select-label">Reports</InputLabel> */}
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="reports"
                      row
                      value={values.reports}
                      onBlur={handleBlur}
                      onChange={(value) => {
                        handleChange(value);
                        setReport(value.target.value);
                        setFieldValue('reportsType', '', true);
                      }}
                    >
                      <FormControlLabel value="financialReport" control={<Radio />} label="Financial Report" />
                      <FormControlLabel value="usageReport" control={<Radio />} label="Usage Report" />
                    </RadioGroup>
                  </FormControl>
                  {touched.reports && errors.reports && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.reports}
                    </FormHelperText>
                  )}
                </Grid>

                {values.reports !== 'usageReport' && (
                  <Grid item xs={12} md={12}>
                    <Box mb={1}>
                      <FormLabel>Financial Reports</FormLabel>
                    </Box>

                    <FormControl
                      fullWidth
                      error={Boolean(touched.reportsType && errors.reportsType)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel id="demo-simple-select-label">Reports</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        name="reportsType"
                        id="demo-simple-select"
                        value={values.reportsType}
                        onBlur={handleBlur}
                        onChange={(value) => {
                          handleChange(value);
                          setReportType(value.target.value);
                        }}
                        label="Reports"
                      >
                        {financialReportsConst.map((data, index) => (
                          <MenuItem key={index} value={data.value}>
                            {data.item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {touched.reportsType && errors.reportsType && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.reportsType}
                      </FormHelperText>
                    )}
                  </Grid>
                )}
                {values.reports === 'usageReport' && (
                  <Grid item xs={12} md={12}>
                    <Box mb={1}>
                      <FormLabel>Usage Reports</FormLabel>
                    </Box>

                    <FormControl
                      fullWidth
                      error={Boolean(touched.reportsType && errors.reportsType)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <InputLabel id="demo-simple-select-label">Reports</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        name="reportsType"
                        id="demo-simple-select"
                        value={values.reportsType}
                        onBlur={handleBlur}
                        onChange={(value) => {
                          handleChange(value);
                          setReportType(value.target.value);
                        }}
                        label="Reports"
                      >
                        {usageReportsConst.map((data, index) => (
                          <MenuItem key={index} value={data.value}>
                            {data.item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {touched.reportsType && errors.reportsType && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.reportsType}
                      </FormHelperText>
                    )}
                  </Grid>
                )}
              </Grid>
            </form>
          )}
        </Formik>
        <Box mt={2}>
          {reportType === 'Settlement Detailed Report' ? (
            <SettlementDetailedReportsForm report={report} reportType={reportType} />
          ) : reportType === 'Refund Report' ? (
            <RefundReportsForm report={report} reportType={reportType} />
          ) : null}
        </Box>
      </Card>
      {/* </Container> */}
    </>
  );
};

export default TransactionReports;
