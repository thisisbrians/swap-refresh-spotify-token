import fetch from "node-fetch";
import qs from "qs";

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyClientCallback = process.env.SPOTIFY_CLIENT_CALLBACK;
const spotifyEndPoint = process.env.SPOTIFY_END_POINT;
const grantType = 'refresh_token';

export const handler = async (event) => {
  console.log('handling incoming request...');
  console.log(event.body);

  // const refreshToken = event.body.split('=')[1];

  const queryParams = qs.parse(event.body);
  console.log("queryParams", queryParams);

  const refreshToken = queryParams.refresh_token;
  console.log("refreshToken", refreshToken);

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

    console.log('success');
    console.log(dataToReturn);

    return {
      statusCode: 200,
      body: JSON.stringify(dataToReturn)
    }
  } catch (error) {

    console.log('error');
    console.log(error.message);

    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
}