import { environmentURLMYSQL } from 'src/environmentUrl';
import axios from 'axios';
import { MESEVA_ALL_TRANS, MESEVA_MONTHLY_TRANS } from './MesevaConstants';

export const getMysqlMesevaTotalCount = () => async (dispatch) => {
  await axios.get(`${environmentURLMYSQL}/mesevatrans`).then((res) => {
    dispatch({ type: MESEVA_ALL_TRANS, payload: res.data });
  });
};

export const getMysqlMesevaMonthlyCount = () => async (dispatch) => {
  await axios.get(`${environmentURLMYSQL}/mesevamonthlytrans`).then((res) => {
    dispatch({ type: MESEVA_MONTHLY_TRANS, payload: res.data });
  });
};
