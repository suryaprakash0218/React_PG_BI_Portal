import { environmentURLMYSQL } from 'src/environmentUrl';
import axios from 'axios';
import { STAMPS_ALL_TRANS, STAMPS_MONTHLY_TRANS } from './StampsConstanst';

export const getMysqlStampsTotalCount = () => async (dispatch) => {
  await axios.get(`${environmentURLMYSQL}/stampstrans`).then((res) => {
    dispatch({ type: STAMPS_ALL_TRANS, payload: res.data });
  });
};

export const getMysqlStampsMonthlyCount = () => async (dispatch) => {
  await axios.get(`${environmentURLMYSQL}/stampsmonthlytrans`).then((res) => {
    dispatch({ type: STAMPS_MONTHLY_TRANS, payload: res.data });
  });
};
