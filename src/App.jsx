import * as React from 'react';
import Cookies from 'js-cookie';

// React-router-dom library to handle navigation
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Hooks
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux action
import { setUserData, removeUserData } from './redux';

// Component
import Navbar from 'components/Navbar';
import Callback from 'components/Callback';

// Tool
import Authroute from 'tools/Authroute';

// Class Managers
import TokenManager from 'services/TokenManager';
import SpotifyManager from 'services/SpotifyAPIManager';

// Page components
import Register from 'pages/Register';
import LogIn from 'pages/Login';
import Home from 'pages/Home';
import About from 'pages/About';
import Profile from 'pages/Profile';
import NotFound from 'pages/NotFound';
import Playlist from 'pages/Playlist';
import NewPlaylist from 'pages/NewPlaylist';

/*
  The 'heart' of the program with the following features:
  1) Store the state and user details of the app
  2) Handle registering the user on first-time login
  3) Routing of the various page-components of the web app via React-Router-DOM
*/

const App = () => {
  const { login, accessToken } = useSelector((state) => state.spotify_authentification);
  // , loginTime
  const dispatch = useDispatch();

  /**
   * 1) Called immediately after component's mount takes place
   * 2) Ideal place to handle pre-setup
   * 3) Check if the user is already logged in by checking cookies
   *
   * NOTE: cookies is not ideal for private data, but since we are not
   * requesting any private data (just authToken), it is safe to do so here
   */

  const retrieveOtherData = async () => {
    try {
      const res = await SpotifyManager.me(accessToken);
      dispatch(setUserData({ displayName: res.display_name, email: res.email }));
    } catch (error) {
      console.log(error);
      dispatch(
        removeUserData({
          showError: true,
          errors: 'Problem with authentication or login session has expired. Please try again.'
        })
      );
    }
  };

  useEffect(() => {
    if (!Cookies.get('spotify_auth_state')) {
      TokenManager.getToken();
    } else if (login === true) {
      retrieveOtherData(accessToken);
    } else {
      console.log('App -> Not logged in');
    }
    // if (new Date().getTime() - loginTime >= 3600 * 1000)
  }, [login, retrieveOtherData, accessToken]);

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/callback" component={Callback} />
          <Authroute exact path="/new-playlist" component={NewPlaylist} />
          <Route exact path="/sign_up" component={Register} />
          <Route exact path="/sign_in" component={LogIn} />
          <Route exact path="/about" component={About} />
          <Authroute exact path="/playlist/:playlistId" component={Playlist} />
          <Authroute exact path="/profile" component={Profile} />
          <Home exact path="/" component={Home} />
          <Route path="*" component={NotFound} status={404} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
