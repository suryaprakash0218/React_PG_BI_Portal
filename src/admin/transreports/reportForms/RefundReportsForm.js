import { LoadingButton } from '@mui/lab';
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  useTheme,
} from '@mui/material';
import { Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';
import * as Yup from 'yup';
import '../../../App.css';
import serviceProviderConst from '../constants/serviceProviderConstant';

import { CLEAR_REPORT_STATE } from 'src/redux/reports/ReportsConstants';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const RefundReportsForm = ({ report, reportType }) => {
  const stateData = useSelector((state) => state.reports);

  console.log(stateData);

  const { isButtonLoading, isData } = stateData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();

  const [checked, setChecked] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (values) => {
    dispatch({ type: CLEAR_REPORT_STATE });
    console.log(values);
    // dispatch(getMssqlAllReports(values));
    // dispatch(getTables(values.additionalColumn));
    // dispatch({ type: IS_DATA_OFF });
  };
  return (
    <>
      <Formik
        initialValues={{
          reports: report,
          reportsType: reportType,
          startDate: '',
          endDate: '',
          transactionStatus: 'ALL',
          paymentMode: 'ALL',
          serviceProvider: 'ALL',
          individualServices: 'ALL',
          additionalColumn: [],
          mgovid: [],
          mobilenumber: [],
        }}
        validationSchema={Yup.object().shape({
          startDate: Yup.date().required('Start date is required'),
          endDate: Yup.date()
            .required('End date is required')
            .min(Yup.ref('startDate'), 'End date must be after start date')
            .when('startDate', (startDate, schema) => {
              return startDate
                ? schema.required('serviceProvider is required when individualServices is filled')
                : schema;
            }),
        })}
        onSubmit={handleLoginSubmit}
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
          <form noValidate onSubmit={handleSubmit}>
            {JSON.stringify(values)}
            <Grid container spacing={2}>
              {errorMsg && (
                <FormHelperText sx={{ mb: 2 }} error id="standard-weight-helper-text-email-login">
                  {errorMsg}
                </FormHelperText>
              )}
              <Grid item md={4}>
                <Box>
                  <FormLabel>Start Date</FormLabel>
                </Box>
                <FormControl
                  fullWidth
                  error={Boolean(touched.startDate && errors.startDate)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        label="Start Date"
                        value={values.startDate}
                        onBlur={handleBlur}
                        onChange={(value) => {
                          console.log(value);
                          const d = new Date(value);
                          var options = {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hour12: true,
                          };

                          var text = d.toLocaleString('en-US', options);
                          // let text = d.toLocaleString();
                          console.log(typeof text, text);
                          setFieldValue('startDate', text, true);
                        }}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </FormControl>
                {touched.startDate && errors.startDate && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.startDate}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item md={4}>
                <Box>
                  <FormLabel>End Date</FormLabel>
                </Box>
                <FormControl
                  fullWidth
                  error={Boolean(touched.endDate && errors.endDate)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        label="End Date"
                        value={values.endDate}
                        onBlur={handleBlur}
                        onChange={(value) => {
                          const d = new Date(value);

                          var options = {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hour12: true,
                          };

                          var text = d.toLocaleString('en-US', options);
                          setFieldValue('endDate', text, true);
                        }}
                        slotProps={{ textField: { fullWidth: true } }}
                        // renderInput={(params) => (
                        //   <TextField
                        //     {...params}
                        //     format="MM/dd/yyyy" // Set the desired date format
                        //   />
                        // )}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </FormControl>
                {touched.endDate && errors.endDate && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.endDate}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                <Box mb={1}>
                  <FormLabel>Transaction Status</FormLabel>
                </Box>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Transaction Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="transactionStatus"
                    id="demo-simple-select"
                    value={values.transactionStatus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="TransactionStatus"
                  >
                    <MenuItem value={'ALL'} selected>
                      ALL
                    </MenuItem>
                    <MenuItem value={'NA'}>NA</MenuItem>
                    <MenuItem value={'Payment Success'}>Payment Success</MenuItem>
                    <MenuItem value={'Payment Success and Department Failure'}>
                      Payment Success and Department Failure
                    </MenuItem>
                    <MenuItem value={'Refund Failure'}>Refund Failure</MenuItem>
                    <MenuItem value={'Refund initiated'}>Refund initiated</MenuItem>
                    <MenuItem value={'Refund success'}>Refund success</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ minWidth: '20% !important' }}>
                  <Box mb={1}>
                    <FormLabel> Payment Mode</FormLabel>
                  </Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Payment Mode</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name="paymentMode"
                      id="demo-simple-select"
                      value={values.paymentMode}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Payment Mode"
                    >
                      <MenuItem value={'ALL'}>ALL</MenuItem>
                      <MenuItem value={'ICICI-PGW'}>ICICI-PGW</MenuItem>
                      <MenuItem value={'ICICI-UPI'}>ICICI-UPI</MenuItem>
                      <MenuItem value={'PayGov'}>PayGov</MenuItem>

                      <MenuItem value={'T-Wallet'}>T-Wallet</MenuItem>
                    </Select>
                  </FormControl>
                  {touched.paymentMode && errors.paymentMode && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.paymentMode}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ minWidth: '20% !important' }}>
                  <Box mb={1}>
                    <FormLabel> Service Provider</FormLabel>
                  </Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Service Provider</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name="serviceProvider"
                      id="demo-simple-select"
                      value={values.serviceProvider}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Service Provider"
                    >
                      {serviceProviderConst.map((option) => (
                        <MenuItem key={option.id} value={option.title}>
                          {option.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {touched.serviceProvider && errors.serviceProvider && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.serviceProvider}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box mb={1}>
                  <FormLabel> Individual Services</FormLabel>
                </Box>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Individual Services</InputLabel>
                  {values.serviceProvider === '' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="ALL">ALL</MenuItem>
                    </Select>
                  )}

                  {values.serviceProvider === 'ALL' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'AGIRCULTRE' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'BR MART' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'DOST' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'ESD' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'ESEVEA' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'EVENTS' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'ICICI' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'ITRETURNS' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'MEESEVA' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'OTHERS' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'RTA FEST' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'STAMPS_DHARANI' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'STAMPS_IGRS' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'TASK' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'TEMPLES' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}

                  {values.serviceProvider === 'TSRTC' && (
                    <Select
                      name="individualServices"
                      id="demo-simple-select-label"
                      label="Individual Services"
                      value={values.individualServices}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {serviceProviderConst
                        .find((option) => option.title === values.serviceProvider)
                        .subOptions.map((subOption, index) => (
                          <MenuItem key={index} value={subOption}>
                            {subOption}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                  {touched.individualServices && errors.individualServices && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.individualServices}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ minWidth: '20% !important' }}>
                  <Box mb={1}>
                    <FormLabel> Additional Display Columns</FormLabel>
                  </Box>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Columns</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name="additionalColumn"
                      id="demo-simple-select"
                      value={values.additionalColumn}
                      onBlur={handleBlur}
                      multiple
                      onChange={handleChange}
                      label="Columns"
                    >
                      <MenuItem value={'DeptTransID'}>DeptTransId</MenuItem>
                      <MenuItem value={'Merchant_ID'}>Merchant Id</MenuItem>
                      <MenuItem value={'Service_provider'}>ServiceProvider</MenuItem>
                      <MenuItem value={'Individual_SERVICES'}>IndividualServices</MenuItem>
                      <MenuItem value={'Government Department'}>Government Department</MenuItem>

                      <MenuItem value={'Channel'}>Channel</MenuItem>
                      {/* <MenuItem value={'PGW_Charges_Paid_By'}>PWDchargerBy</MenuItem> */}
                      {/* <MenuItem value={'Service_Name'}>ServiceName</MenuItem> */}
                      <MenuItem value={'MGOV_TransID'}>MGOV TransID</MenuItem>
                      <MenuItem value={'Bank_TransID'}>BankTransID</MenuItem>
                      <MenuItem value={'TFolio_Payment_ID'}>TFolioPaymentID</MenuItem>
                      {/* <MenuItem value={'Service_Provider_Refcode'}>ServiceProviderRefCode</MenuItem>
                    <MenuItem value={'Customer_Mobile_No'}>CustomerMobileNumber</MenuItem>
                    <MenuItem value={'PGW_Settlement_Status'}>PGWSettlementStatus</MenuItem> */}
                      <MenuItem value={'Remarks'}>Remarks</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box mb={1}>
                  <FormLabel> Mgov id</FormLabel>
                </Box>
                <FormControl
                  fullWidth
                  error={Boolean(touched.mgovid && errors.mgovid)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-email-login">mgovid</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="text"
                    value={values.mgovid}
                    multiline
                    rows={2}
                    name="mgovid"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="mgovid"
                  />
                  {touched.mgovid && errors.mgovid && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.mgovid}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={4} md={4}>
                <Box mb={1}>
                  <FormLabel>Mobilenumber</FormLabel>
                </Box>
                <FormControl
                  fullWidth
                  error={Boolean(touched.mobilenumber && errors.mobilenumber)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-email-login">mobilenumber</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="text"
                    multiline
                    rows={2}
                    // maxRows={4}
                    value={values.mobilenumber}
                    name="mobilenumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="mobilenumber"
                  />
                  {touched.mobilenumber && errors.mobilenumber && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.mobilenumber}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box sx={{ mt: 2 }}>
                  <LoadingButton
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                    loading={isButtonLoading}
                    onClick={handleSubmit}
                  >
                    Submit
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>

      {/* </Container> */}
    </>
  );
};

export default RefundReportsForm;
