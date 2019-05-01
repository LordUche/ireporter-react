import axios from 'axios';
import {
  handleMessages,
  sanitizeData,
  getCurrentUser,
} from '../../utils/helpers';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGOUT = 'LOGOUT';

export const authRequestAction = () => ({ type: AUTH_REQUEST });
export const authSuccessAction = payload => ({ type: AUTH_SUCCESS, payload });
export const authFailureAction = payload => ({ type: AUTH_FAILURE, payload });
export const logoutAction = () => ({ type: LOGOUT });

export const authenticateUser = (authType, data) => async dispatch => {
  dispatch(authRequestAction());
  try {
    const res = await axios.post(
      `${process.env.API_BASE_URL}/auth/${authType}`,
      sanitizeData(data)
    );
    const { token, user } = res.data.data[0];
    localStorage.setItem('token', token);
    const message =
      authType === 'login'
        ? 'Logged in successfully'
        : 'Signed up successfully';
    handleMessages([message], 'success');
    dispatch(authSuccessAction(user));
  } catch (err) {
    const { error, errors } = err.response.data;
    const messages = errors || [error];
    handleMessages(messages, 'error');
    dispatch(authFailureAction(messages));
  }
};

export const currentUser = () => dispatch => {
  const user = getCurrentUser();
  if (user) dispatch(authSuccessAction(user));
  else dispatch(logoutAction());
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('token');
  dispatch(logoutAction());
};
