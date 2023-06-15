import axios from 'axios';
import { envrinmentURLMSSQL } from 'src/environmentUrl';
import { ALL_REPORTS_FROM_SETTLEMETS, LOADING_OFF, LOADING_ON, TABLES_ADDITION } from './ReportsConstants';

export const getMssqlAllReports = (data) => async (dispatch) => {
  console.log(data);
  dispatch({ type: LOADING_ON });
  console.log('data enterd into the action');
  console.log(data);
  await axios
    .post(`${envrinmentURLMSSQL}/settlementreport`, data)
    .then((res) => {
      console.log('responseeeeeeeeeee dataaaaaaaaaaa', res);
      dispatch({ type: ALL_REPORTS_FROM_SETTLEMETS, payload: res.data });
      dispatch({ type: LOADING_OFF });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTables = (data) => async (dispatch) => {
  dispatch({ type: TABLES_ADDITION, payload: data });
};
