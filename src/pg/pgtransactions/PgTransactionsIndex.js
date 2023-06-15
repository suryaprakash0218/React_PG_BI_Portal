import {
  Box,
  Card,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';

// import DatePicker, { DateRangePicker } from "calcite-react/DatePicker";
import { LoadingButton } from '@mui/lab';
import { DateRangePicker } from 'rsuite';

import { Formik } from 'formik';

import * as Yup from 'yup';
import { envrinmentURLMSSQL } from 'src/environmentUrl';
import { useEffect } from 'react';

const PgTransactionsIndex = ({ scrollToContent }) => {
  const navigate = useNavigate();

  const [validationBool, setValidationBool] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // console.log("check for", validationBool);

  useEffect(() => {
    if (scrollToContent) {
      scrollToContent();
    }
  }, [scrollToContent]);

  const handleValueSubmit = (values) => {
    if (values.trTableName == 'GOT_Payments') {
      setIsLoading(true);
      axios
        .post(`${envrinmentURLMSSQL}/biopayments`, values)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            setValidationBool(false);
            console.log(res.data);
            navigate('gotpayments', { state: { data: res.data.responseData } });
            setIsLoading(false);
            setTimeout(() => {
              scrollToContent();
            }, 500);
          } else if (res.status == 404) {
            console.log('comming inside');
            navigate('gotpayments');
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setValidationBool(true);
          if (err.code == 'ERR_NETWORK') {
            setError('Please check your connection!');
          } else if (err.response.status === 400) {
            setError('Missing or Invalid data!');
            setIsLoading(false);
          }
          setIsLoading(false);
        });
    } else if (values.trTableName == 'GOT_TransLog') {
      setIsLoading(true);
      axios
        .post(`${envrinmentURLMSSQL}/gottrnaslog`, values)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            setValidationBool(false);
            navigate('gottranslog', { state: { data: res.data.responseData } });
            setIsLoading(false);
            setTimeout(() => {
              scrollToContent();
            }, 500);
          } else if (res.status == 404) {
            console.log('comming inside');
            navigate('gottranslog');
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setValidationBool(true);
          if (err.code == 'ERR_NETWORK') {
            setError('Please check your connection!');
          } else if (err.response.status === 400) {
            setError('Missing or Invalid data!');
            setIsLoading(false);
          }
          setIsLoading(false);
        });
    } else if (values.trTableName == 'GOT_TransLog_Department') {
      setIsLoading(true);
      axios
        .post(`${envrinmentURLMSSQL}/gottransdept`, values)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            setValidationBool(false);
            navigate('gottranslogdept', { state: { data: res.data.responseData } });
            setIsLoading(false);
            setTimeout(() => {
              scrollToContent();
            }, 500);
          } else if (res.status == 404) {
            console.log('comming inside');
            navigate('gottranslogdept');
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setValidationBool(true);
          if (err.code == 'ERR_NETWORK') {
            setError('Please check your connection!');
          } else if (err.response.status === 400) {
            setError('Missing or Invalid data!');
            setIsLoading(false);
          }
          setIsLoading(false);
        });
    } else if (values.trTableName == 'Payment_Trans') {
      setIsLoading(true);
      axios
        .post(`${envrinmentURLMSSQL}/gotpaytrans`, values)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            setValidationBool(false);
            navigate('gottranspayment', { state: { data: res.data.responseData } });
            setIsLoading(false);
            setTimeout(() => {
              scrollToContent();
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setValidationBool(true);
          if (err.code == 'ERR_NETWORK') {
            setError('Please check your connection!');
          } else if (err.response.status === 400) {
            setError('Missing or Invalid data!');
            setIsLoading(false);
          }
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          trTableName: '',
          trSearch: '',
          trSearchBy: '',
          trDate: [new Date(), new Date()],
        }}
        validationSchema={Yup.object().shape({
          trSearch: Yup.string()
            .max(255)
            .required('Search is required!')
            .when('trSearchBy', (value, schema) => {
              // console.log(value[0]);
              if (value[0] === 'MOBILE_NUMBER') {
                return schema.max(10, 'Enter must be 10 numbers').min(10, 'Enter must be 10 numbers');
              } else if (value[0] === 'DATE') {
                return schema.notRequired();
              } else if (value[0] === 'TODAY') {
                return schema.notRequired();
              } else if (value[0] === 'TID') {
                return schema
                  .matches(/^[0-9]*$/, 'number only allowed!')

                  .required('Tid is Required!');
              } else if (value[0] === 'MOB_TRANS_ID') {
                return schema
                  .matches(/^[MGOV0-9]*$/, `Mob id start with "MGOV" after that allows numbers only! `)

                  .required('Mob Trans Id is Required!');
              } else if (value[0] === 'ID') {
                return schema.matches(/^[0-9]*$/, 'number only allowed!');
              }
              return schema;
            }),
          trTableName: Yup.string().required('TableName required!'),
          trSearchBy: Yup.string().required('category is required!'),
          // .when('trTableName', (value, schema) => {
          //   if (value[0] === 'PgTransLogs') {
          //     return schema.required('Please enter this field!');
          //   }
          //   return schema;
          // }),
          trDate: Yup.array().when('trsearchBy', (value, schema) => {
            if (value[0] === 'DATE') {
              console.log('comming inside the data  ');
              return schema.required('Plaese enter the date!');
            }
          }),
        })}
        onSubmit={handleValueSubmit}
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
          <form noValidate onChange={handleChange} onSubmit={handleSubmit}>
            {/* {JSON.stringify(values)} */}
            {/* <Grid
              sx={{ marginLeft: "10px", marginTop: "5px" }}
              container
              spacing={3}
            >*/}
            {/* <Grid sx={{ maxWidth: 900 }}> */}
            <Card elevation={3} sx={{ marginRight: '2%', marginLeft: '2%', marginTop: '5px' }}>
              <Typography variant="h6" padding={2} fontWeight={'bold'} sx={{ textAlign: 'center' }}>
                Pg Transaction
              </Typography>
              {validationBool && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                  style={{ marginTop: '5px', textAlign: 'center' }}
                >
                  {error}
                </FormHelperText>
              )}
              <Box
                sx={{
                  padding: 5,

                  minheight: 430,
                  maxHeight: 800,
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}
                    >
                      Tables
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">Serach Table</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="trTableName"
                        row
                        value={values.trTableName}
                        onBlur={handleBlur}
                        onChange={() => setFieldValue('trSearchBy', '')}
                      >
                        <FormControlLabel value="GOT_Payments" control={<Radio />} label="GOT_Payments" />
                        <FormControlLabel value="GOT_TransLog" control={<Radio />} label="GOT_TransLog" />
                        <FormControlLabel value="GOT_TransLog_Department" control={<Radio />} label="GOT_Dept" />
                        <FormControlLabel value="Payment_Trans" control={<Radio />} label="Payment_Trans" />
                      </RadioGroup>
                    </FormControl>
                    {touched.trTableName && errors.trTableName && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.trTableName}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}
                    >
                      Search
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      fullWidth
                      type="text"
                      id="Search"
                      name="trSearch"
                      label="Search"
                      size="small"
                      variant="outlined"
                      value={values.trSearchBy === 'MOB_TRANS_ID' ? values.trSearch.toUpperCase() : values.trSearch}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.trSearch && errors.trSearch && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.trSearch}
                      </FormHelperText>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={12} md={2}>
                    <InputLabel
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 700,
                      }}
                    >
                      Category
                    </InputLabel>
                  </Grid>

                  <Grid item xs={12} sm={10}>
                    <Box sx={{ minWidth: '20% !important' }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        {values.trTableName === '' && (
                          <Select
                            labelId="demo-simple-select-label"
                            name="trSearchBy"
                            id="demo-simple-select"
                            value={values.trSearchBy}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Category"
                          >
                            <MenuItem value={'ID'}>Id</MenuItem>
                            <MenuItem value={'TID'}>Tid</MenuItem>
                            <MenuItem value={'MOBILE_NUMBER'}>Mobilenumber</MenuItem>
                            <MenuItem value={'MOB_TRANS_ID'}>Mob Trans Id</MenuItem>
                            <MenuItem value={'PID'}>PID</MenuItem>
                            <MenuItem value={'TWALLET_ID'}>Twallet ID</MenuItem>
                            <MenuItem value={'TODAY'}>Today</MenuItem>
                            <MenuItem value={'DATE'}>Date</MenuItem>
                          </Select>
                        )}
                        {values.trTableName === 'GOT_Payments' && (
                          <Select
                            labelId="demo-simple-select-label"
                            name="trSearchBy"
                            id="demo-simple-select"
                            value={values.trSearchBy}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Category"
                          >
                            <MenuItem value={'ID'}>Id</MenuItem>
                            <MenuItem value={'TID'}>Tid</MenuItem>
                            <MenuItem value={'MOBILE_NUMBER'}>Mobilenumber</MenuItem>
                            <MenuItem value={'MOB_TRANS_ID'}>Mob Trans Id</MenuItem>
                            <MenuItem value={'PID'}>PID</MenuItem>
                            <MenuItem value={'TWALLET_ID'}>Twallet ID</MenuItem>
                            <MenuItem value={'TODAY'}>Today</MenuItem>
                            <MenuItem value={'DATE'}>Date</MenuItem>
                          </Select>
                        )}
                        {values.trTableName === 'GOT_TransLog' && (
                          <Select
                            labelId="demo-simple-select-label"
                            name="trSearchBy"
                            id="demo-simple-select"
                            value={values.trSearchBy}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Category"
                          >
                            <MenuItem value={'TRANS_ID'}>Trans ID</MenuItem>
                            <MenuItem value={'REF_ID'}>Ref ID</MenuItem>
                            <MenuItem value={'MOBILE_NUMBER'}>Mobilenumber</MenuItem>
                          </Select>
                        )}
                        {values.trTableName == 'GOT_TransLog_Department' && (
                          <Select
                            labelId="demo-simple-select-label"
                            name="trSearchBy"
                            id="demo-simple-select"
                            value={values.trSearchBy}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Category"
                          >
                            <MenuItem value={'TRANS_ID'}>Trans ID</MenuItem>
                            <MenuItem value={'REF_ID'}>Ref ID</MenuItem>
                            <MenuItem value={'MOBILE_NUMBER'}>Mobilenumber</MenuItem>
                          </Select>
                        )}

                        {values.trTableName == 'Payment_Trans' && (
                          <Select
                            labelId="demo-simple-select-label"
                            name="trSearchBy"
                            id="demo-simple-select"
                            value={values.trSearchBy}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Category"
                          >
                            <MenuItem value={'DEPT_TRANS_ID'}>Dept trans id</MenuItem>
                            <MenuItem value={'TID'}>Tid</MenuItem>
                            <MenuItem value={'MOBILE_NUMBER'}>Mobilenumber</MenuItem>
                            <MenuItem value={'TRANS_ID'}>Trans Id</MenuItem>
                            <MenuItem value={'TODAY'}>Today</MenuItem>
                            <MenuItem value={'DATE'}>Date</MenuItem>
                          </Select>
                        )}
                      </FormControl>
                      {touched.trSearchBy && errors.trSearchBy && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.trSearchBy}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>

                  {values.trSearchBy == 'DATE' && (
                    <Grid item xs={12} sm={12} md={2}>
                      <InputLabel
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          fontWeight: 700,
                        }}
                      >
                        Date
                      </InputLabel>
                    </Grid>
                  )}
                  {values.trSearchBy == 'DATE' && (
                    <Grid item xs={12} sm={6}>
                      <DateRangePicker
                        id="trDate"
                        name="trDate"
                        label="Date"
                        size="md"
                        variant="outlined"
                        value={values.trDate}
                        onBlur={handleBlur}
                        onChange={(value) => {
                          // console.log(typeof value[0]);

                          setFieldValue('trDate', value, true);
                        }}
                      />

                      {touched.date && errors.date && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.date}
                        </FormHelperText>
                      )}
                    </Grid>
                  )}
                  <Grid item xs={12} sm={10}>
                    <LoadingButton
                      type="submit"
                      id="sumbit"
                      size="small"
                      variant="contained"
                      onClick={handleSubmit}
                      loading={isLoading}
                    >
                      Submit
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </form>
        )}
      </Formik>
    </>
  );
};

export default PgTransactionsIndex;
