import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];

process.env.NODE_ENV === `development` && middleware.push(logger);

const initialState = { auth: { loggedIn: false, loading: false } };
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
