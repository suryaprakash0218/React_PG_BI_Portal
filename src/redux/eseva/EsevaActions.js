import axios from 'axios';
import { environmentURLMYSQL } from 'src/environmentUrl';
import { ESEVA_ALL_TRANS, ESEVA_MONTHLY_TRANS } from './EsevaConstants';

export const getMysqlEsevaTotalCount = () => async (dispatch) => {
  await axios.get(`${environmentURLMYSQL}/esevatrans`).then((res) => {
    console.log(res.data);
    dispatch({ type: ESEVA_ALL_TRANS, payload: res.data });
  });
};

export const getMysqlEsevaMonthlyCount = () => async (dispatch) => {
  await axios.get(`${environmentURLMYSQL}/esevamonthlytrans`).then((res) => {
    dispatch({ type: ESEVA_MONTHLY_TRANS, payload: res.data });
  });
};
