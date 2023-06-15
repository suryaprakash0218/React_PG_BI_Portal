import { environmentURLMYSQL } from 'src/environmentUrl';
import axios from 'axios';
import { TEMPLES_ALL_TRANS, TEMPLES_MONTHLY_TRANS } from './TemplesConstants';

export const getMysqlTemplesTotalCount = () => async (dispatch) => {
  await axios.get(`${environmentURLMYSQL}/templestrans`).then((res) => {
    dispatch({ type: TEMPLES_ALL_TRANS, payload: res.data });
  });
};

export const getMysqlTemplseMonthlyCount = () => async (dispatch) => {
  await axios.get(`${environmentURLMYSQL}/templesmonthlytrans`).then((res) => {
    dispatch({ type: TEMPLES_MONTHLY_TRANS, payload: res.data });
  });
};
