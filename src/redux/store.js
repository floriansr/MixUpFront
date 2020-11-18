import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import logReducer from './log/logReducer';
import userReducer from './user/userReducer';
import tracklistReducer from './tracklist/tracklistReducer';
import spotifyReducer from './spotify_authentification/authReducer';
import userdataReducer from './user_private_datas/privateDatasReducer';

const rootReducer = combineReducers({
  log: logReducer,
  user: userReducer,
  tracks: tracklistReducer,
  spotify_authentification: spotifyReducer,
  private_datas_user: userdataReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
export default store;
