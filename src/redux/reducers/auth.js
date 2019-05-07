import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  LOGOUT,
} from '../actions/types';

const initialState = {
  loggedIn: false,
  loading: false,
  user: null,
  errors: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { ...state, loading: true };

    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        loggedIn: true,
        errors: null,
      };

    case AUTH_FAILURE:
      return {
        ...state,
        errors: action.payload,
        loading: false,
        loggedIn: false,
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
