import faker from 'faker';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
  authRequestAction,
  authSuccessAction,
  authFailureAction,
  authenticateUser,
  currentUser,
  logoutUser,
} from '../auth';
import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, LOGOUT } from '../types';
import { mockStore } from '../../../../test/setupTests';

describe('auth', () => {
  it('should return correct action', () => {
    expect(authRequestAction()).toEqual({ type: AUTH_REQUEST });
    expect(authSuccessAction('Hello')).toEqual({
      type: AUTH_SUCCESS,
      payload: 'Hello',
    });
    expect(authFailureAction('Fail')).toEqual({
      type: AUTH_FAILURE,
      payload: 'Fail',
    });
  });

  it('authenticateUser should dispatch correct actions', async () => {
    const store = mockStore({});
    const token = faker.random.uuid();
    const mockData = {
      data: { data: [{ user: { email: faker.internet.email() }, token }] },
    };
    axios.post.mockResolvedValue(mockData);
    await store.dispatch(
      authenticateUser('login', {
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
    );
    expect(localStorage.getItem('token')).toEqual(token);
    expect(store.getActions()).toEqual([
      { type: AUTH_REQUEST },
      { type: AUTH_SUCCESS, payload: mockData.data.data[0].user },
    ]);
  });

  it('currentUser should get the current logged in user', async () => {
    const store = mockStore({});
    const user = { email: faker.internet.email(), id: 1 };
    localStorage.setItem('token', jwt.sign(user, 'secret'));
    await store.dispatch(currentUser());
    expect(store.getActions()).toMatchObject([
      { type: AUTH_SUCCESS, payload: { ...user } },
    ]);
  });

  it('logoutUser should logout the user', () => {
    const store = mockStore({});
    store.dispatch(logoutUser());
    expect(localStorage.removeItem).toHaveBeenCalled();
    expect(store.getActions()).toEqual([{ type: LOGOUT }]);
  });
});
