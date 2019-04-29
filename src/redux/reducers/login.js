import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/login';

const initialState = {
  loggedIn: false,
  loading: false,
  user: null,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, loading: false, loggedIn: true };

    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loggedIn: false,
      };

    default:
      return state;
  }
};

export default loginReducer;
