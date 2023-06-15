import { environmentURLMYSQL } from 'src/environmentUrl';
import { AADHAR_ALL_TRANS, AADHAR_MONTHLY_TRANS } from './AadharConstants';
import axios from 'axios';

export const getMysqlAadharTotalCount = () => async (dispatch) => {
  await axios.get(`${environmentURLMYSQL}/aadhartrans`).then((res) => {
    dispatch({ type: AADHAR_ALL_TRANS, payload: res.data });
  });
};

export const getMysqlAadharMonthlyCount = () => async (dispatch) => {
  await axios.get(`${environmentURLMYSQL}/aadharmonthlytrans`).then((res) => {
    dispatch({ type: AADHAR_MONTHLY_TRANS, payload: res.data });
  });
};
