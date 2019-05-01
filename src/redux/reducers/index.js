import { combineReducers } from 'redux';
import authReducer from './auth';
import incidentReducer from './incident';

const rootReducer = combineReducers({
  auth: authReducer,
  incident: incidentReducer,
});

export default rootReducer;
