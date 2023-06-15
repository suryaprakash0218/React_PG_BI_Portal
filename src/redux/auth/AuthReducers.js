import { loadState, saveState } from 'src/helper/SessionStorage';
import { setCookies, getCookies } from 'src/helper/CookieStorage';
import { AUTH_ERROR, AUTH_LOGIN, EMPTY_AUTH_STATE } from './AuthConstants';

const initialState = {
  status: 'done',
  data: getCookies('Role', {}),
  loggedIn: false,
  isLoading: false,
  error: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      setCookies('Role', action.payload.responseData);

      return { ...state, data: action.payload.responseData, loggedIn: true, isLoading: true };
    case AUTH_ERROR:
      // setCookies('Role', action.payload);
      return { ...state, error: action.payload, isLoading: true };
    case EMPTY_AUTH_STATE:
      return { ...state, loggedIn: false, data: {}, error: {} };
    default: {
      return state;
    }
  }
};
