import { ESEVA_ALL_TRANS, ESEVA_MONTHLY_TRANS } from './EsevaConstants';

const initialState = {
  status: 'Done',
  allTrans: {},
  monthlyTrans: {},
  isLoading: false,
};

export const esevaReducer = (state = initialState, action) => {
  switch (action.type) {
    case ESEVA_ALL_TRANS:
      return { ...state, allTrans: action.payload.responseData, isLoading: true };
    case ESEVA_MONTHLY_TRANS:
      return { ...state, monthlyTrans: action.payload.responseData, isLoading: true };
    default:
      return state;
  }
};
