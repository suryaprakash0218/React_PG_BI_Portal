import axios from 'axios';
import { envrinmentURLMSSQL } from 'src/environmentUrl';
import { AUTH_ERROR, AUTH_LOGIN } from './AuthConstants';

export const getLogin = (values, resetForm) => async (dispatch) => {
  await axios
    .post(`${envrinmentURLMSSQL}/login`, values)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: AUTH_LOGIN, payload: res.data });
        resetForm();

        window.location.replace('/');
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: AUTH_ERROR, payload: err.response });
    });
  // dispatch({ type: AUTH_LOGIN, payload: res.data });
};
