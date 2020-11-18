import axios from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv';
import Cookies from 'js-cookie';
import generateRandomString from '../../tools/generateRandomString';

dotenv.config();

/**
 * Authorize and get spotify access token
 */

const API = axios.create({
  baseURL: 'https://accounts.spotify.com'
});

const authKey = Buffer.from(
  `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET_ID}`
).toString('base64');

API.interceptors.request.use(
  async ({ headers, ...config }) => ({
    ...config,
    headers: {
      ...headers,
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${authKey}`
    }
  }),
  (error) => {
    return Promise.reject(error);
  }
);

export default class SpotifyACF {
  static async authorize() {
    // Track the current state of the authorization process
    const stateKey = 'spotify_auth_state';
    const state = generateRandomString(16);
    const scopes =
      'user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control user-read-private user-read-email playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private user-library-modify user-library-read user-top-read user-read-playback-position user-read-recently-played user-follow-read user-follow-modify';

    const path = querystring.stringify({
      client_id: process.env.REACT_APP_CLIENT_ID,
      response_type: 'code',
      scope: scopes,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      state,
      show_dialog: true
    });

    Cookies.set(stateKey, state);

    window.location = `https://accounts.spotify.com/authorize?${path}`;
  }

  static async getSpotifyAccessToken(code) {
    try {
      const res = await API.post(
        '/api/token',
        querystring.stringify({
          code,
          redirect_uri: process.env.REACT_APP_REDIRECT_URI,
          grant_type: 'authorization_code'
        })
      );
      return res.data;
    } catch (e) {
      console.error('SPOTIFY ERROR:: Error during authorization:', e.message);
      console.error({
        clientID: process.env.REACT_APP_CLIENT_ID,
        clientSecret: process.env.REACT_APP_CLIENT_SECRET_ID,
        redirectUri: process.env.REACT_APP_REDIRECT_URI,
        authKey
      });
    }
    return null;
  }

  static async refreshToken(refreshToken) {
    try {
      const res = await API.post(
        '/api/token',
        querystring.stringify({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
      );
      return res.data;
    } catch (e) {
      console.error('SPOTIFY ERROR:: Error during authorization:', e.message);
      console.error({
        clientID: process.env.REACT_APP_CLIENT_ID,
        clientSecret: process.env.REACT_APP_CLIENT_SECRET_ID,
        redirectUri: process.env.REACT_APP_REDIRECT_URI,
        authKey
      });
    }
    return null;
  }
}
