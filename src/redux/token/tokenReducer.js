import { SET_TOKEN, REMOVE_TOKEN } from './tokenType';

const initialState = {
  accessToken: false,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        accessToken: true,
      };

    case REMOVE_TOKEN:
      return {
        ...state,
        accessToken: false,
      };
    default:
      return state;
  }
};

export default tokenReducer;
