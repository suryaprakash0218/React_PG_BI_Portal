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

import { getMssqlAllReports, getTables } from 'src/redux/reports/ReportsActions';
import { CLEAR_REPORT_STATE, IS_DATA_OFF } from 'src/redux/reports/ReportsConstants';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const RefunReportsForm = ({ report, reportType }) => {
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
    return <>Refunnnnnnnnnnnnnnnn</>;
  };
};

export default RefunReportsForm;
