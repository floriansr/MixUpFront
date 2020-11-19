import { SpotifyACF } from 'services';

export default class TokenManager {
  static async getToken() {
    await SpotifyACF.authorize();
  }
}
