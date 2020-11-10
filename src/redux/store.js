import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import logReducer from './log/logReducer';
import userReducer from './user/userReducer';
import tracklistReducer from './tracklist/tracklistReducer';
import tokenReducer from './token/tokenReducer';

const rootReducer = combineReducers({
  log: logReducer,
  user: userReducer,
  tracks: tracklistReducer,
  token: tokenReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
export default store;
