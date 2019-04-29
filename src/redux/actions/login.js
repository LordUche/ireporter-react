export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequestAction = () => ({ type: LOGIN_REQUEST });
export const loginSuccessAction = payload => ({ type: LOGIN_SUCCESS, payload });
export const loginFailureAction = payload => ({ type: LOGIN_FAILURE, payload });

export const loginUser = data => dispatch => {
  dispatch(loginSuccessAction(data));
};
