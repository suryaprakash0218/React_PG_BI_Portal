import { environmentURLMYSQL } from 'src/environmentUrl';
import axios from 'axios';
import { DOST_ALL_TRANS, DOST_MONTHLY_TRANS } from './DostConstants';

export const getMysqlDostTotalCount = () => async (dispatch) => {
  await axios.get(`${environmentURLMYSQL}/dosttrans`).then((res) => {
    dispatch({ type: DOST_ALL_TRANS, payload: res.data });
  });
};

export const getMysqlDostMonthlyCount = () => async (dispatch) => {
  await axios.get(`${environmentURLMYSQL}/dostmonthlytrans`).then((res) => {
    dispatch({ type: DOST_MONTHLY_TRANS, payload: res.data });
  });
};
