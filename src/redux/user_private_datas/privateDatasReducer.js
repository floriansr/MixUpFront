import { SET_USER_DATA, REMOVE_USER_DATA } from './privateDatasTypes';

const initialState = {
  private_datas_user: {
    displayName: '',
    email: '',
    showError: false,
    errors: [],
  },
};

const userdataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        private_datas_user: action.details,
      };
    case REMOVE_USER_DATA:
      return {
        ...state,
        private_datas_user: {
          displayName: '',
          email: '',
          showError: false,
          errors: [],
        },
      };
    default:
      return state;
  }
};

export default userdataReducer;
