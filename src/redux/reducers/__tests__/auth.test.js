import faker from 'faker';
import authReducer from '../auth';
import {
  authRequestAction,
  authSuccessAction,
  authFailureAction,
  logoutAction,
} from '../../actions/auth';

describe('auth reducer', () => {
  const initialState = {
    loggedIn: false,
    loading: false,
    user: null,
    errors: null,
  };

  it('should set loading to true', () => {
    const state = authReducer(initialState, authRequestAction());
    expect(state.loading).toBe(true);
    expect(state.errors).toBe(null);
    expect(state.user).toBe(null);
    expect(state.loggedIn).toBe(false);
  });

  it('should set user object and set loggedIn to true', () => {
    const user = { id: 1, email: faker.internet.email() };
    const state = authReducer(initialState, authSuccessAction(user));
    expect(state.loading).toBe(false);
    expect(state.errors).toBe(null);
    expect(state.user).toBe(user);
    expect(state.loggedIn).toBe(true);
  });

  it('should set user object and set loggedIn to true', () => {
    const errors = ['An error occurred'];
    const state = authReducer(initialState, authFailureAction(errors));
    expect(state.loading).toBe(false);
    expect(state.errors).toBe(errors);
    expect(state.user).toBe(null);
    expect(state.loggedIn).toBe(false);
  });

  it('reset the state', () => {
    const state = authReducer(initialState, logoutAction());
    expect(state.loading).toBe(false);
    expect(state.errors).toBe(null);
    expect(state.user).toBe(null);
    expect(state.loggedIn).toBe(false);
  });
});
