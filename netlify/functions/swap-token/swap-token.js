
import fetch from 'node-fetch';
import dotenv from 'dotenv';
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyClientCallback = process.env.SPOTIFY_CLIENT_CALLBACK;
const spotifyEndPoint = process.env.SPOTIFY_END_POINT;
const grantRefreshType = 'refresh_token';

export const handler = async (event) => {
  try {
    console.log('Swap Token');

    const spotifyCode = JSON.parse(event.body).code

    const authOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=${grantRefreshType}&refresh_token=${spotifyCode}&client_id=${spotifyClientId}&client_secret=${spotifyClientSecret}&redirect_uri=${spotifyClientCallback}`
    }

    const result = fetch(spotifyEndPoint, authOptions);
    console.log(result);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }


  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

