import * as types from '../actions/types';

const initialState = {
  id: null,
  type: '',
  comment: '',
  location: '',
  images: [],
  videos: [],
  loading: false,
  created: false,
};

const incidentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INCIDENTS_REQUEST:
      return { ...state, loading: true };

    case types.INCIDENTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        created: true,
        errors: null,
      };

    case types.INCIDENTS_FAILURE:
      return {
        ...state,
        ...initialState,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default incidentReducer;
