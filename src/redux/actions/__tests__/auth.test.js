import faker from 'faker';
import axios from 'axios';
import {
  authRequestAction,
  authSuccessAction,
  authFailureAction,
  authenticateUser,
} from '../auth';
import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS } from '../types';
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

  it('should dispatch correct actions', async () => {
    const store = mockStore({});
    const token = faker.random.uuid();
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: {
        setItem: jest.fn(),
      },
    });
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
    expect(store.getActions()).toEqual([
      { type: AUTH_REQUEST },
      { type: AUTH_SUCCESS, payload: mockData.data.data[0].user },
    ]);
  });
});
