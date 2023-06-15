import {
  ALL_REPORTS_FROM_SETTLEMETS,
  CLEAR_REPORT_STATE,
  IS_DATA_OFF,
  LOADING_OFF,
  LOADING_ON,
  TABLES_ADDITION,
} from './ReportsConstants';

const initialState = {
  status: 'Done',
  allReports: {},
  tableAdd: {},
  isLoading: false,
  isButtonLoading: false,
  isData: false,
};

export const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_REPORTS_FROM_SETTLEMETS:
      return { ...state, allReports: action.payload.responseData, isLoading: true, isData: true };
    case LOADING_ON:
      return { ...state, isButtonLoading: true };
    case LOADING_OFF:
      return { ...state, isButtonLoading: false };
    case IS_DATA_OFF:
      return { ...state, isData: false };
    case IS_DATA_OFF:
      return { ...state, isData: false };
    case TABLES_ADDITION:
      return { ...state, tableAdd: action.payload };
    case CLEAR_REPORT_STATE:
      return { ...state, tableAdd: {}, allReports: {} };
    default:
      return state;
  }
};
