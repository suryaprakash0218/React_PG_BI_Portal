import { MESEVA_ALL_TRANS, MESEVA_MONTHLY_TRANS } from './MesevaConstants';

const initialState = {
  status: 'Done',
  allTrans: {},
  monthlyTrans: {},
  isLoading: false,
};

export const mesevaReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESEVA_ALL_TRANS:
      return { ...state, allTrans: action.payload.responseData, isLoading: true };
    case MESEVA_MONTHLY_TRANS:
      return { ...state, monthlyTrans: action.payload.responseData, isLoading: true };
    default:
      return state;
  }
};
