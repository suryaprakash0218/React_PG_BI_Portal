import {
  Box,
  Card,
  CardHeader,
  Divider,
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
import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';

// import DatePicker, { DateRangePicker } from "calcite-react/DatePicker";
import { LoadingButton } from '@mui/lab';
import { DateRangePicker, Stack } from 'rsuite';

import { Formik } from 'formik';

import * as Yup from 'yup';
import PgTransactionsIndex from '../pgtransactions/PgTransactionsIndex';
import PgTransServices from 'src/services/mysqlservices/PgTransServices';

const PgLogsIndex = ({ scrollToContent }) => {
  const navigate = useNavigate();

  const [validationBool, setValidationBool] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (scrollToContent) {
      scrollToContent();
    }
  }, [scrollToContent]);

  const handleValueSubmit = (values) => {
    console.log(values);
    if (values.tableName == 'PgLogsControlApi') {
      setIsLoading(true);
      PgTransServices.getPgTransControlapiAll(values)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            setValidationBool(false);
            navigate('controlapi', { state: { data: res.data.responseData } });
            setIsLoading(false);
            setTimeout(() => {
              scrollToContent();
            }, 500);
          } else if (res.status == 404) {
            console.log('comming inside');
            navigate('controlapi');
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
    } else if (values.tableName == 'PgLogs') {
      setIsLoading(true);
      PgTransServices.getPgLogsAll(values)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            setValidationBool(false);
            navigate('pglogs', { state: { data: res.data.responseData } });
            setIsLoading(false);
            setTimeout(() => {
              scrollToContent();
            }, 500);
          } else if (res.status == 404) {
            console.log('comming inside');
            navigate('pglogs');
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
    } else if (values.tableName == 'PgTransLogs') {
      setIsLoading(true);
      PgTransServices.getPgTransLogsAll(values)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            setValidationBool(false);
            navigate('pgtranslog', { state: { data: res.data.responseData } });
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
          tableName: '',
          search: '',
          searchBy: '',
          date: [new Date(), new Date()],
        }}
        validationSchema={Yup.object().shape({
          search: Yup.string()
            .max(255)
            .required('Search is required!')
            .when('searchBy', (value, schema) => {
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
          tableName: Yup.string().required('Tablename required!'),
          searchBy: Yup.string().when('tableName', (value, schema) => {
            if (value[0] === 'PgTransLogs') {
              return schema.required('Please enter this field!');
            }
            return schema;
          }),
          date: Yup.array().when('searchBy', (value, schema) => {
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
            {/* <Grid container spacing={2}>
              <Grid item sm={12} md={6}> */}
            <Card elevation={3}>
              <Typography variant="h6" padding={2} fontWeight={'bold'} sx={{ textAlign: 'center' }}>
                Pg Logs
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
                  minHeight: 395,
                  maxHeight: 600,
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
                        name="tableName"
                        row
                        value={values.tableName}
                        onBlur={handleBlur}
                        onChange={() => setFieldValue('searchBy', '')}
                      >
                        <FormControlLabel value="PgLogs" control={<Radio />} label="PgLogs" />
                        <FormControlLabel value="PgLogsControlApi" control={<Radio />} label="PgLogsControlApi" />
                        <FormControlLabel value="PgTransLogs" control={<Radio />} label="PgTransLog" />
                      </RadioGroup>
                    </FormControl>

                    {touched.tableName && errors.tableName && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.tableName}
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
                      // sx={{ width: '50ch' }}
                      type="text"
                      id="Search"
                      name="search"
                      label="Search"
                      fullWidth
                      size="small"
                      variant="outlined"
                      value={values.searchBy === 'MOB_TRANS_ID' ? values.search.toUpperCase() : values.search}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.search && errors.search && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {errors.search}
                      </FormHelperText>
                    )}
                  </Grid>
                  {values.tableName == 'PgTransLogs' && (
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
                  )}
                  {values.tableName == 'PgTransLogs' && (
                    <Grid item xs={12} sm={10}>
                      <Box sx={{ minWidth: '20% !important' }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Category</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            name="searchBy"
                            id="demo-simple-select"
                            value={values.searchBy}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Category"
                          >
                            <MenuItem value={'ID'}>Id</MenuItem>
                            <MenuItem value={'TID'}>Tid</MenuItem>
                            <MenuItem value={'MOBILE_NUMBER'}>Mobilenumber</MenuItem>
                            <MenuItem value={'MOB_TRANS_ID'}>Mob Trans Id</MenuItem>
                            <MenuItem value={'TODAY'}>Today</MenuItem>
                            <MenuItem value={'DATE'}>Date</MenuItem>
                          </Select>
                        </FormControl>
                        {touched.searchBy && errors.searchBy && (
                          <FormHelperText error id="standard-weight-helper-text-email-login">
                            {errors.searchBy}
                          </FormHelperText>
                        )}
                      </Box>
                    </Grid>
                  )}

                  {values.searchBy == 'DATE' && values.tableName == 'PgTransLogs' && (
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
                  {values.searchBy == 'DATE' && values.tableName == 'PgTransLogs' && (
                    <Grid item xs={12} sm={6}>
                      <DateRangePicker
                        // style={{maxWidth:1000}}
                        name="date"
                        label="Date"
                        size="xl"
                        variant="outlined"
                        value={values.date}
                        onBlur={handleBlur}
                        onChange={(value) => {
                          setFieldValue('date', value, true);
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
                      id="sumbi"
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
            {/* </Grid> */}

            {/* <Grid item sm={12} md={6}>
                <PgTransactionsIndex />
              </Grid>
            </Grid> */}
          </form>
        )}
      </Formik>
    </>
  );
};

export default PgLogsIndex;
