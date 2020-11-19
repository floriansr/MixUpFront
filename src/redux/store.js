import thunkMiddleware from 'redux-thunk';

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import {
  authReducer,
  logReducer,
  privateDatasReducer,
  tracklistReducer,
  userReducer
} from 'redux/reducers';

const rootReducer = combineReducers({
  log: logReducer,
  user: userReducer,
  tracks: tracklistReducer,
  spotify_authentification: authReducer,
  private_datas_user: privateDatasReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
export default store;
