import axios from 'axios';
import querystring from 'querystring';
import { clientID, clientSecret } from '../../constants';

/**
 * Authorize and get spotify access token
 */

export default class Spotify {
  static async authorize() {
    const authKey = Buffer.from(`${clientID}:${clientSecret}`).toString(
      'base64'
    );

    try {
      const axiosData = await axios.post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
          grant_type: 'client_credentials',
        }),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${authKey}`,
          },
        }
      );

      // set token
      const { access_token } = axiosData.data;
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } catch (e) {
      console.error('SPOTIFY ERROR:: Error during authorization:', e.message);
      console.error({
        clientID,
        clientSecret,
        authKey,
      });
    }
  }
}
