import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import SpotifyACF from '../../services/Spotify_Authorization_Code_Flows';
import { setToken } from '../../redux';

const Callback = () => {
  const history = useHistory();
  const { login } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async (code) => {
      try {
        const result = await SpotifyACF.getSpotifyAccessToken(code);
        dispatch(
          setToken(result.access_token, result.refresh_token, result.scope)
        );
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
