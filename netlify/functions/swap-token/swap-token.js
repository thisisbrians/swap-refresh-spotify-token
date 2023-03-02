
import axios from 'axios';

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

    axios.defaults.baseURL = spotifyEndPoint;
    axios.defaults.headers.common['Authorization'] = authHeader;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    const config = {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    const data = new URLSearchParams({
      grant_type: grantType,
      refresh_token: refreshToken,
      redirect_uri: spotifyClientCallback
    });

    const authOptions = {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=${grantType}&swap_token=${spotifyCode}&redirect_uri=${spotifyClientCallback}`
    }

    const response = await axios.post('spotifyEndPoint', data, config)

    //const result = fetch(spotifyEndPoint, authOptions);
    console.log(response);

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }


  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

