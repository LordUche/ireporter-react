import faker from 'faker';
import incidentReducer from '../incidents';
import {
  FETCH_INCIDENT,
  FETCH_INCIDENTS,
  LOAD_INCIDENTS,
  CREATE_INCIDENT,
  DELETE_INCIDENT,
  LOGOUT,
  INCIDENT_ERROR,
} from '../../actions/types';

describe('incidents reducer', () => {
  const payload = [
    { id: 1, comment: faker.lorem.sentence() },
    { id: 2, comment: faker.lorem.sentence() },
    { id: 3, comment: faker.lorem.sentence() },
  ];
  const initialState = { loading: false, created: false };

  it('should fetch one incident', () => {
    const state = incidentReducer(initialState, {
      type: FETCH_INCIDENT,
      payload: payload[0],
    });
    expect(state.loading).toBe(false);
    expect(state.created).toBe(false);
    expect(state['1']).toBe(payload[0]);
    expect(state.id).toBe(1);
  });

  it('should fetch all incident', () => {
    const state = incidentReducer(initialState, {
      type: FETCH_INCIDENTS,
      payload,
    });
    expect(state.loading).toBe(false);
    expect(state.created).toBe(false);
    expect(state['1']).toBe(payload[0]);
    expect(state['2']).toBe(payload[1]);
    expect(state['3']).toBe(payload[2]);
    expect(state.id).toBe(undefined);
  });

  it('should be loading', () => {
    const state = incidentReducer(initialState, {
      type: LOAD_INCIDENTS,
      payload,
    });
    expect(state.loading).toBe(true);
    expect(state.created).toBe(false);
  });

  it('should create incident', () => {
    const state = incidentReducer(initialState, {
      type: CREATE_INCIDENT,
      payload: payload[0],
    });
    expect(state.loading).toBe(false);
    expect(state.created).toBe(true);
    expect(state.id).toBe(1);
  });

  it('should delete incident', () => {
    const state = incidentReducer(
      { '1': payload[0] },
      {
        type: DELETE_INCIDENT,
        payload: payload[0],
      }
    );
    expect(state.loading).toBe(false);
    expect(state.created).toBe(false);
    expect(state['1']).toBe(undefined);
  });

  it('should clear incident on logout', () => {
    const state = incidentReducer(
      { '1': payload[0] },
      {
        type: LOGOUT,
      }
    );
    expect(state.loading).toBe(false);
    expect(state.created).toBe(false);
    expect(state['1']).toBe(undefined);
  });

  it('should clear incident on logout', () => {
    const state = incidentReducer(
      { '1': payload[0] },
      {
        type: INCIDENT_ERROR,
        payload: ['An error occurred'],
      }
    );
    expect(state.loading).toBe(false);
    expect(state.created).toBe(false);
    expect(state.errors).toEqual(['An error occurred']);
  });
});
