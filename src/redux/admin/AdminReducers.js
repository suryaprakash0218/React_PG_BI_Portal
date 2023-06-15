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

const initialState = {
  status: 'done',
  allTransactionServices: {},
  cumulative: {},
  totalCount: {},
  mobileUsers: {},
  userLists: {},
  totalPgname: {},
  pgPlatform: {},
  departmentwiseTotal: {},
  subDepartmentwiseTotal: {},
  yearlyData: {},
  monthlyCount: {},
  mysqlYesterdaySuccess: {},
  gotYesterdaySuccess: {},
  paymentTransYesterdaySucces: {},
  data: {},
  yearlyMonthlyTrans: {},
  latestTransactions: {},
  isLoading: false,
  buttonLoading: false,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case MSSQL_ALL_TRANSACTIONS:
      return { ...state, allTransactionServices: action.payload.responseData, isLoading: true };
    case MSSQL_CUMULATIVE_TRANSACTIONS:
      return { ...state, cumulative: action.payload.responseData, isLoading: true };
    case MYSQL_TOTAL_COUNTS:
      return { ...state, totalCount: action.payload.responseData, isLoading: true };
    case MSSQL_USER_DEVICE_LIST:
      return { ...state, userLists: action.payload.responseData, isLoading: true };
    case MSSQL_TOTAL_PGNAME_LIST:
      return { ...state, totalPgname: action.payload.responseData, isLoading: true };
    case MYSQL_MOBILE_USERS:
      return { ...state, mobileUsers: action.payload.responseData, isLoading: true };
    case MYSQL_TRANS_PLATFORM:
      return { ...state, pgPlatform: action.payload.responseData, isLoading: true };
    case MSSQL_DEPARTMENTWISE_TOTAL:
      return { ...state, departmentwiseTotal: action.payload.responseData, isLoading: true };
    case MSSQL_SUB_DEPARTMENTWISE_TOTAL:
      return { ...state, subDepartmentwiseTotal: action.payload.responseData, isLoading: true };
    case MYSQL_MONTHLY_COUNTS:
      return { ...state, monthlyCount: action.payload.responseData, isLoading: true };
    case MSSQL_GOT_TRANS_TOTAL:
      return { ...state, gotYesterdaySuccess: action.payload.responseData, isLoading: true };
    case MYSQL_YESTERDAY_SUCCESS:
      return { ...state, mysqlYesterdaySuccess: action.payload.responseData, isLoading: true };
    case MSSQL_PAYMENT_TRANS_TOTAL:
      return { ...state, paymentTransYesterdaySucces: action.payload.responseData, isLoading: true };
    case MSSQL_DIFF_FROM_GOT:
      return { ...state, data: action.payload.responseData, isLoading: true };
    case MSSQL_DIFF_FROM_PAYMENT_TRANAS:
      return { ...state, data: action.payload.responseData, isLoading: true };
    case MSSQL_YEARLY_DATA:
      return { ...state, yearlyData: action.payload.responseData, isLoading: true };
    case MYSQL_YEARLY_MONTHLY_TRANS:
      return { ...state, yearlyMonthlyTrans: action.payload.responseData, isLoading: true };
    case MYSQL_LATEST_TRANSACTIONS:
      return { ...state, latestTransactions: action.payload.responseData, isLoading: true };
    case LOADING_ON:
      return { ...state, buttonLoading: true };
    case LOADING_OFF:
      return { ...state, buttonLoading: false };
    default:
      return state;
  }
};
