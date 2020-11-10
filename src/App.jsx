import * as React from 'react';
// // import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import Spotify from './services/Auth';

// import { setToken } from './redux';

import Navbar from './components/Navbar';
import Authroute from './tools/Authroute';

import Register from './pages/Register';
import LogIn from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Playlist from './pages/Playlist';
import NewPlaylist from './pages/NewPlaylist';

const App = () => {
  // const { accessToken } = useSelector((state) => state.token);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = async () => {
  //     if (accessToken === false) {
  //       try {
  //         const res = await Spotify.authorize();
  //         dispatch(setToken(res));
  //       } catch {
  //         console.error('An error occured with Credentials ID');
  //       }
  //     }
  //   };
  //   token();
  // }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
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
