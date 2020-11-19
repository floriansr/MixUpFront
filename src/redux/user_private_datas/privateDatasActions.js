import { REMOVE_USER_DATA, SET_USER_DATA } from './privateDatasTypes';

export const setUserData = (data) => {
  return {
    type: SET_USER_DATA,
    details: data
  };
};

export const removeUserData = () => {
  return {
    type: REMOVE_USER_DATA
  };
};
