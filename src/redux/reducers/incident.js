import {
  REPORT_INCIDENT_REQUEST,
  REPORT_INCIDENT_SUCCESS,
  REPORT_INCIDENT_FAILURE,
} from '../actions/incident';

const initialState = {
  id: null,
  type: '',
  comment: '',
  location: '',
  Images: [],
  Videos: [],
  loading: false,
  created: false,
};

const incidentReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_INCIDENT_REQUEST:
      return { ...state, loading: true };

    case REPORT_INCIDENT_SUCCESS:
      return { ...state, ...action.payload, loading: false, created: true };

    case REPORT_INCIDENT_FAILURE:
      return {
        ...state,
        errors: action.payload,
        loading: false,
        created: false,
      };

    default:
      return state;
  }
};

export default incidentReducer;
