import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import Cookies from 'js-cookie';
import SpotifyACF from '../../services/Spotify_Authorization_Code_Flows';
import { setTokens } from '../../redux';

const Callback = () => {
  const history = useHistory();
  const { login } = useSelector((state) => state.spotify_authentification);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async (code) => {
      try {
        const result = await SpotifyACF.getSpotifyAccessToken(code);
        dispatch(
          setTokens(result.access_token, result.refresh_token, result.scope)
        );
        Cookies.set('spotifyTokens', {
          accessToken: result.access_token,
          refreshToken: result.refresh_token,
          scopes: result.scope,
          login: true,
        });
        history.push('/');
        message.success('Thanks for authentification !', 3);
      } catch (error) {
        console.error(error);
        message.error(
          "There's something wrong with Spotify authentication.",
          3
        );
      }
    };

    if (login === false) {
      const callback = window.location.search;
      const code = callback.slice(0, -1).split('&')[0].split('=')[1];
      // const state = callback.split('&')[1].split('=')[1];
      fetch(code);
    }
  }, []);

  return <div />;
};

export default Callback;
