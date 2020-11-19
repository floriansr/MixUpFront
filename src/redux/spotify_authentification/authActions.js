import { REMOVE_TOKENS, SET_TOKENS } from './authTypes';

export const setTokens = (aToken, rToken, scopes) => {
  return {
    accessToken: aToken,
    refreshToken: rToken,
    scopes,
    type: SET_TOKENS
  };
};

export const removeTokens = () => {
  return {
    type: REMOVE_TOKENS
  };
};
