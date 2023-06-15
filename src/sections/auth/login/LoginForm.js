import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormHelperText,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormControlLabel,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { Formik } from 'formik';

import * as Yup from 'yup';
import { useTheme } from '@emotion/react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { getLogin } from 'src/redux/auth/AuthActions';
import Cookies from 'js-cookie';
import { EMPTY_AUTH_STATE } from 'src/redux/auth/AuthConstants';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const stateData = useSelector((state) => state.auth);

  const { data, error, loggedIn, isLoading } = stateData;

  console.log(stateData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();

  const [checked, setChecked] = useState(true);

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (loggedIn === true) {
      navigate('/');
      window.location.reload();
    }
    if (error?.data?.code === 1002) {
      setLoading(false);
      setErrorMsg('Either Username or Password is wrong');
    } else if (error?.data?.code === 1500) {
      setLoading(false);
      setErrorMsg('Sorry,You are not a Valid User!');
    }
  }, [stateData]);

  const handleLoginSubmit = (values, { resetForm }) => {
    setLoading(true);
    dispatch({ type: EMPTY_AUTH_STATE });
    dispatch(getLogin(values, resetForm));
  };

  return (
    <>
      <Formik
        initialValues={{
          userName: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          userName: Yup.string().max(255).required('username is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={handleLoginSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, setFieldError, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container direction={'column'} spacing={2}>
              <Grid item xs={12} md={12}>
                {errorMsg && (
                  <FormHelperText sx={{ mb: 2 }} error id="standard-weight-helper-text-email-login">
                    {errorMsg}
                  </FormHelperText>
                )}

                <FormControl
                  fullWidth
                  error={Boolean(touched.userName && errors.userName)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-email-login">Username</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="text"
                    value={values.userName}
                    name="userName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="userName"
                  />
                  {touched.userName && errors.userName && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.userName}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    inputProps={{}}
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />

                  <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                    Forgot Password?
                  </Typography>
                </Stack>
                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} md={12}>
                <Box sx={{ mt: 2 }}>
                  {/* <AnimateButton> */}
                  <LoadingButton
                    // disableElevation
                    // disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                    loading={loading}
                  >
                    Sign in
                  </LoadingButton>
                  {/* </AnimateButton> */}
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
