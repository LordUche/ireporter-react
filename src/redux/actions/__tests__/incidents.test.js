import faker from 'faker';
import axios from 'axios';
import {
  loadIncidents,
  updateStore,
  get,
  getAll,
  report,
  deleteIncident,
} from '../incidents';
import {
  LOAD_INCIDENTS,
  FETCH_INCIDENT,
  FETCH_INCIDENTS,
  CREATE_INCIDENT,
  DELETE_INCIDENT,
} from '../types';
import { mockStore } from '../../../../test/setupTests';
import * as helpers from '../../../utils/helpers';

describe('incidents action', () => {
  const payload = [
    { id: 1, comment: faker.lorem.sentence() },
    { id: 2, comment: faker.lorem.sentence() },
    { id: 3, comment: faker.lorem.sentence() },
  ];
  const data = {
    type: 'red-flag',
    comment: payload[0].comment,
    location: '1, 2',
  };
  const initialState = { loading: false, created: false };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  it('should return correct actions', () => {
    expect(loadIncidents()).toEqual({ type: LOAD_INCIDENTS });
    expect(updateStore(FETCH_INCIDENT, payload[0])).toEqual({
      type: FETCH_INCIDENT,
      payload: payload[0],
    });
  });

  it('should get one incident', async () => {
    localStorage.setItem('token', faker.random.uuid());
    axios.get.mockResolvedValue({ data: { data: [payload[0]] } });
    await store.dispatch(get('red-flags', 1));
    expect(store.getActions()).toEqual([
      { type: LOAD_INCIDENTS },
      {
        type: FETCH_INCIDENT,
        payload: payload[0],
      },
    ]);
  });

  it('should get all incidents', async () => {
    localStorage.setItem('token', faker.random.uuid());
    axios.get.mockResolvedValue({ data: { data: payload } });
    axios.all.mockResolvedValue([{ data: { data: payload } }]);
    await store.dispatch(getAll());
    expect(store.getActions()).toEqual([
      { type: LOAD_INCIDENTS },
      {
        type: FETCH_INCIDENTS,
        payload,
      },
    ]);
  });

  it('should report an incident', async () => {
    localStorage.setItem('token', faker.random.uuid());
    axios.post.mockResolvedValue({ data: { data: [{ id: 1 }] } });
    helpers.uploadMedia = jest.fn();
    await store.dispatch(report(data));
    helpers.uploadMedia.mockRestore();
    expect(store.getActions()).toEqual([
      { type: LOAD_INCIDENTS },
      {
        type: CREATE_INCIDENT,
        payload: { id: 1 },
      },
    ]);
  });

  it('should delete an incident', async () => {
    localStorage.setItem('token', faker.random.uuid());
    axios.delete.mockResolvedValue({ data: { data: { id: 1 } } });
    await store.dispatch(deleteIncident(data.type, '1'));
    expect(store.getActions()).toEqual([
      { type: LOAD_INCIDENTS },
      {
        type: DELETE_INCIDENT,
      },
    ]);
  });
});
