import axios from 'axios';
import { environmentURLMYSQL, envrinmentURLMSSQL } from 'src/environmentUrl';
import {
  LOADING_OFF,
  LOADING_ON,
  MSSQL_ALL_TRANSACTIONS,
  MSSQL_CUMULATIVE_TRANSACTIONS,
  MSSQL_DEPARTMENTWISE_TOTAL,
  MSSQL_DIFF_FROM_GOT,
  MSSQL_DIFF_FROM_PAYMENT_TRANAS,
  MSSQL_GOT_TRANS_TOTAL,
  MSSQL_PAYMENT_TRANS_TOTAL,
  MSSQL_SUB_DEPARTMENTWISE_TOTAL,
  MSSQL_TOTAL_PGNAME_LIST,
  MSSQL_USER_DEVICE_LIST,
  MSSQL_YEARLY_DATA,
  MYSQL_LATEST_TRANSACTIONS,
  MYSQL_MOBILE_USERS,
  MYSQL_MONTHLY_COUNTS,
  MYSQL_TOTAL_COUNTS,
  MYSQL_TRANS_PLATFORM,
  MYSQL_YEARLY_MONTHLY_TRANS,
  MYSQL_YESTERDAY_SUCCESS,
} from './AdminConstants';

export const getMssqlTransactions = () => async (dispatch) => {
  console.log('calling heree!');
  await axios.get(`${environmentURLMYSQL}/getdashboardtotal`).then((res) => {
    console.log(res);
    dispatch({ type: MSSQL_ALL_TRANSACTIONS, payload: res.data });
  });
};
export const getMssqlCumulative = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${envrinmentURLMSSQL}/getyearlytransactions`).then((res) => {
    dispatch({ type: MSSQL_CUMULATIVE_TRANSACTIONS, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};

export const getMysqlTotalCount = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${environmentURLMYSQL}/getpayments`).then((res) => {
    dispatch({ type: MYSQL_TOTAL_COUNTS, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};
export const getMssqlUserDeviceList = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${envrinmentURLMSSQL}/getuserlist`).then((res) => {
    dispatch({ type: MSSQL_USER_DEVICE_LIST, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};

export const getMssqlPgPlatformList = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${envrinmentURLMSSQL}/totalpaymenttype`).then((res) => {
    dispatch({ type: MSSQL_TOTAL_PGNAME_LIST, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};

export const getMysqlMobileUsers = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${environmentURLMYSQL}/getmobileusers`).then((res) => {
    dispatch({ type: MYSQL_MOBILE_USERS, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};

export const getMysqlPgPlatform = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${environmentURLMYSQL}/getpgplatform`).then((res) => {
    dispatch({ type: MYSQL_TRANS_PLATFORM, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};

export const getMssqlDepartments = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${environmentURLMYSQL}/getdepartmentwisepayments`).then((res) => {
    dispatch({ type: MSSQL_DEPARTMENTWISE_TOTAL, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};

export const getMssqlSubDepartments = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${environmentURLMYSQL}/getsubDepartmenttransactions`).then((res) => {
    dispatch({ type: MSSQL_SUB_DEPARTMENTWISE_TOTAL, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};
export const getMysqYesterdaySuccesTotal = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${environmentURLMYSQL}/getyesterdaypayments`).then((res) => {
    dispatch({ type: MYSQL_YESTERDAY_SUCCESS, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};
export const getMssqGOTtransTotal = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${envrinmentURLMSSQL}/biotrans`).then((res) => {
    dispatch({ type: MSSQL_GOT_TRANS_TOTAL, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};
export const getMssqPaymentTransTotal = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${envrinmentURLMSSQL}/pggottranstotal`).then((res) => {
    dispatch({ type: MSSQL_PAYMENT_TRANS_TOTAL, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};

export const getMssqlDiffFromGOT = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${envrinmentURLMSSQL}/getdifffromgotpayments`).then((res) => {
    dispatch({ type: MSSQL_DIFF_FROM_GOT, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};
export const getMssqlDiffFromPaymentTrans = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${envrinmentURLMSSQL}/getdifffrompaymenttrans`).then((res) => {
    dispatch({ type: MSSQL_DIFF_FROM_PAYMENT_TRANAS, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};

export const getMssqlMonthlyCount = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${environmentURLMYSQL}/getmonthlypayments`).then((res) => {
    console.log('monthly data action', res);
    dispatch({ type: MYSQL_MONTHLY_COUNTS, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};

export const getMssqlYearlyCount = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${environmentURLMYSQL}/`).then((res) => {
    dispatch({ type: MSSQL_YEARLY_DATA, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};

export const getMssqlYearlyMonthlyData = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${envrinmentURLMSSQL}/getyearlymonthlywisetransactions`).then((res) => {
    dispatch({ type: MYSQL_YEARLY_MONTHLY_TRANS, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};

export const getMysqlLatestTransactions = () => async (dispatch) => {
  dispatch({ type: LOADING_ON });
  await axios.get(`${environmentURLMYSQL}/getlasttentransactions`).then((res) => {
    dispatch({ type: MYSQL_LATEST_TRANSACTIONS, payload: res.data });
    dispatch({ type: LOADING_OFF });
  });
};
