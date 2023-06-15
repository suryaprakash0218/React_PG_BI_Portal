import { RTA_ALL_TRANS, RTA_MONTHLY_TRANS } from './RTAConstants';

const initialState = {
  status: 'Done',
  allTrans: {},
  monthlyTrans: {},
  isLoading: false,
};

export const rtaReducer = (state = initialState, action) => {
  switch (action.type) {
    case RTA_ALL_TRANS:
      return { ...state, allTrans: action.payload.responseData, isLoading: true };
    case RTA_MONTHLY_TRANS:
      return { ...state, monthlyTrans: action.payload.responseData, isLoading: true };
    default:
      return state;
  }
};
