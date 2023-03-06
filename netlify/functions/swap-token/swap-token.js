const fetch = request("node-fetch").default;
const qs = require("qs");

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyClientCallback = process.env.SPOTIFY_CLIENT_CALLBACK;
const spotifyEndPoint = process.env.SPOTIFY_END_POINT;
const grantType = 'authorization_code';

export const handler = async (event) => {
  const code = event.body.split('=')[1];
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
        code: code,
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


