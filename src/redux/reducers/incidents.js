import * as types from '../actions/types';
import { mapKeys } from '../../utils/helpers';

const initialState = { loading: false, created: false };

const incidentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_INCIDENTS:
      return {
        ...state,
        loading: true,
        error: undefined,
        created: false,
        id: undefined,
      };

    case types.FETCH_INCIDENT:
      return {
        ...state,
        [action.payload.id]: action.payload,
        loading: false,
        error: undefined,
        id: action.payload.id,
      };

    case types.FETCH_INCIDENTS:
      return {
        ...state,
        ...mapKeys(action.payload),
        loading: false,
        created: false,
        error: undefined,
        id: undefined,
      };

    case types.CREATE_INCIDENT:
      return {
        ...state,
        created: true,
        loading: false,
        id: action.payload.id,
        error: undefined,
      };

    case types.DELETE_INCIDENT: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return {
        ...newState,
        loading: false,
        created: false,
        error: undefined,
        id: undefined,
      };
    }

    case types.INCIDENT_ERROR:
      return {
        ...state,
        errors: action.payload,
        loading: false,
        created: false,
        id: undefined,
      };

    case types.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default incidentReducer;
