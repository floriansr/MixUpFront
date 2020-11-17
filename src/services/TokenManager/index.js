import SpotifyACF from '../Spotify_Authorization_Code_Flows';

export default class TokenManager {
  static async getToken() {
    await SpotifyACF.authorize();
  }
}
