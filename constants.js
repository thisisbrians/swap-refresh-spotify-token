require('dotenv').config();

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyClientCallback = process.env.SPOTIFY_CLIENT_CALLBACK;
const spotifyEndPoint = process.env.SPOTIFY_END_POINT;
const grantRefreshType = 'refresh_token';

export {
  spotifyClientId,
  spotifyClientSecret,
  spotifyClientCallback,
  spotifyEndPoint,
  grantRefreshType
}