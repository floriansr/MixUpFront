import { SET_TOKEN, REMOVE_TOKEN } from './tokenType';

export const setToken = () => {
  return {
    type: SET_TOKEN,
  };
};

export const removeToken = () => {
  return {
    type: REMOVE_TOKEN,
  };
};
