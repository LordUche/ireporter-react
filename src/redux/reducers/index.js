import { combineReducers } from 'redux';
import authReducer from './auth';
import incidentReducer from './incidents';

const rootReducer = combineReducers({
  auth: authReducer,
  incidents: incidentReducer,
});

export default rootReducer;
