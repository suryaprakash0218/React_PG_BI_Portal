import { STAMPS_ALL_TRANS, STAMPS_MONTHLY_TRANS } from './StampsConstanst';

const initialState = {
  status: 'Done',
  allTrans: {},
  monthlyTrans: {},
  isLoading: false,
};

export const stampsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STAMPS_ALL_TRANS:
      return { ...state, allTrans: action.payload.responseData, isLoading: true };
    case STAMPS_MONTHLY_TRANS:
      return { ...state, monthlyTrans: action.payload.responseData, isLoading: true };
    default:
      return state;
  }
};
