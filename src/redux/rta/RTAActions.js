import { environmentURLMYSQL } from 'src/environmentUrl';
import axios from 'axios';
import { RTA_ALL_TRANS, RTA_MONTHLY_TRANS } from './RTAConstants';

export const getMysqlRTATotalCount = () => async (dispatch) => {
  await axios.get(`${environmentURLMYSQL}/rtatrans`).then((res) => {
    dispatch({ type: RTA_ALL_TRANS, payload: res.data });
  });
};

export const getMysqlRTAMonthlyCount = () => async (dispatch) => {
  await axios.get(`${environmentURLMYSQL}/rtamonthlytrans`).then((res) => {
    dispatch({ type: RTA_MONTHLY_TRANS, payload: res.data });
  });
};
