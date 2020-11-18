import axios from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv';

/**
 * Authorize and get spotify access token
 */

dotenv.config();

export default class SpotifyCCF {
  static async authorize() {
    const authKey = Buffer.from(
      `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET_ID}`
    ).toString('base64');

    try {
      const res = await axios.post(
        'https://accounts.spotify.com/api/token',
        querystring.stringify({
          grant_type: 'client_credentials'
        }),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${authKey}`
          }
        }
      );

      // set token
      const { access_token } = res.data;
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
      return access_token;
    } catch (e) {
      console.error('SPOTIFY ERROR:: Error during authorization:', e.message);
      console.error({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET_ID,
        authKey
      });
    }
  }
}
