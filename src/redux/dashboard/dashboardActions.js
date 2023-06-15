import { envrinmentURLMSSQL } from 'src/environmentUrl';
import { USER_AND_TRANSACTON_LIST } from './dashboardConstants';
import axios from 'axios';

export const getMSSQLuserAndTrans = () => async (dispatch) => {
  await axios.get(`${envrinmentURLMSSQL}/totaluserandtrans`).then((res) => {
    dispatch({ type: USER_AND_TRANSACTON_LIST, payload: res.data });
  });
};
