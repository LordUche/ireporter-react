import axios from 'axios';
import { getCurrentUser, getErrorMessages } from '../../utils/helpers';
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, LOGOUT } from './types';

export const authRequestAction = () => ({ type: AUTH_REQUEST });
export const authSuccessAction = payload => ({ type: AUTH_SUCCESS, payload });
export const authFailureAction = payload => ({ type: AUTH_FAILURE, payload });
export const logoutAction = () => ({ type: LOGOUT });

export const authenticateUser = (authType, data) => async dispatch => {
  dispatch(authRequestAction());
  try {
    const res = await axios.post(
      `${process.env.API_BASE_URL}/auth/${authType}`,
      data
    );
    const { token, user } = res.data.data[0];
    localStorage.setItem('token', token);
    dispatch(authSuccessAction(user));
  } catch (err) {
    dispatch(authFailureAction(getErrorMessages(err)));
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
