
import fetch from 'node-fetch';

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyClientCallback = process.env.SPOTIFY_CLIENT_CALLBACK;
const spotifyEndPoint = process.env.SPOTIFY_END_POINT;
const grantType = 'authorization_code';

export const handler = async (event) => {
  try {
    console.log('Swap Token');

    const authString = Buffer.from(spotifyClientId + ':' + spotifyClientSecret).toString('base64');
    const authHeader = `Basic ${authString}`;

    const spotifyCode = JSON.parse(event.body).code;
    console.log(spotifyCode);

    const authOptions = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=${grantType}&swap_token=${spotifyCode}&redirect_uri=${spotifyClientCallback}`
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

