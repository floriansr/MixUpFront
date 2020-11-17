import Cookies from 'js-cookie';
import { SET_TOKENS, REMOVE_TOKENS } from './authTypes';

const initialState = Cookies.get('spotifyTokens')
  ? JSON.parse(Cookies.get('spotifyTokens'))
  : {
      accessToken: '',
      refreshToken: '',
      expires_in: 0,
      scopes: '',
      login: false,
      loginTime: '',
    };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKENS:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        scopes: action.scopes,
        expires_in: 3600,
        login: true,
        loginTime: new Date().getTime(),
      };

    case REMOVE_TOKENS:
      return {
        ...state,
        accessToken: '',
        refreshToken: '',
        scopes: '',
        expires_in: 0,
        login: false,
        loginTime: '',
      };
    default:
      return state;
  }
};

export default authReducer;
