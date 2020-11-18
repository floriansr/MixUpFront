import axios from 'axios';
import SpotifyCCF from '../Spotify_Client_Credentials_Flows';

const API = axios.create({
  baseURL: 'https://api.spotify.com/v1/'
});

API.interceptors.request.use(
  async ({ headers, ...config }) => ({
    ...config,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await SpotifyCCF.authorize()}`
    }
  }),
  (error) => {
    return Promise.reject(error);
  }
);

export default class SpotifyAPIManager {
  static async me(aToken) {
    const headers = {
      headers: { Authorization: `Bearer ${aToken}` }
    };
    const res = await axios.get('https://api.spotify.com/v1/me', headers);
    return res.data;
  }

  static async getTrackById(tracks) {
    const ids = tracks.map((e) => e.track_spotify_id);
    const res = await API.get(`tracks/?ids=${ids.join(',')}`);
    return res;
  }

  static async searchTrackByQuery(query) {
    const res = await API.get(`search?q=${query}&type=track&limit=5`);
    return res;
  }
}
