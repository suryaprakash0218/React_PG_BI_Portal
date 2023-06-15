import { TEMPLES_ALL_TRANS, TEMPLES_MONTHLY_TRANS } from './TemplesConstants';

const initialState = {
  status: 'Done',
  allTrans: {},
  monthlyTrans: {},
  isLoading: false,
};

export const templesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEMPLES_ALL_TRANS:
      return { ...state, allTrans: action.payload.responseData, isLoading: true };
    case TEMPLES_MONTHLY_TRANS:
      return { ...state, monthlyTrans: action.payload.responseData, isLoading: true };
    default:
      return state;
  }
};
