import { USER_AND_TRANSACTON_LIST } from './dashboardConstants';

const initialState = {
  status: 'Done',
  allTrans: {},
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AND_TRANSACTON_LIST:
      return { ...state, allTrans: action.payload.responseData, isLoading: true };
    default:
      return state;
  }
};
