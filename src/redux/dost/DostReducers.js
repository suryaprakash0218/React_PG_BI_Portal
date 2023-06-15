import { DOST_ALL_TRANS, DOST_MONTHLY_TRANS } from './DostConstants';

const initialState = {
  status: 'Done',
  allTrans: {},
  monthlyTrans: {},
  isLoading: false,
};

export const dostReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOST_ALL_TRANS:
      return { ...state, allTrans: action.payload.responseData, isLoading: true };
    case DOST_MONTHLY_TRANS:
      return { ...state, monthlyTrans: action.payload.responseData, isLoading: true };
    default:
      return state;
  }
};
