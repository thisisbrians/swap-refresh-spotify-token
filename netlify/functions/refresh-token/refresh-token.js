const fetch = require("node-fetch");
const qs = requier("qs");

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyClientCallback = process.env.SPOTIFY_CLIENT_CALLBACK;
const spotifyEndPoint = process.env.SPOTIFY_END_POINT;
const grantType = 'refresh_token';

export const handler = async (event) => {
  const refreshToken = event.body.split('=')[1];
  const authString = Buffer.from(spotifyClientId + ':' + spotifyClientSecret).toString('base64');
  const authHeader = `Basic ${authString}`;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': authHeader,
  }

  try {
    const response = await fetch(spotifyEndPoint, {
      method: 'POST',
      headers: headers,
      body: qs.stringify({
        grant_type: grantType,
        redirect_uri: spotifyClientCallback,
        refresh_token: refreshToken,
      }),
    });

    const dataToReturn = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(dataToReturn)
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
}