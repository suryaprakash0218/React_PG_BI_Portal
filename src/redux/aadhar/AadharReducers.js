import { AADHAR_ALL_TRANS, AADHAR_MONTHLY_TRANS } from './AadharConstants';

const initialState = {
  status: 'Done',
  allTrans: {},
  monthlyTrans: {},
  isLoading: false,
};

export const aadharReducer = (state = initialState, action) => {
  switch (action.type) {
    case AADHAR_ALL_TRANS:
      return { ...state, allTrans: action.payload.responseData, isLoading: true };
    case AADHAR_MONTHLY_TRANS:
      return { ...state, monthlyTrans: action.payload.responseData, isLoading: true };
    default:
      return state;
  }
};
