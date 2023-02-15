import fetch from 'node-fetch';
import {
  spotifyClientId,
  spotifyClientSecret,
  spotifyClientCallback,
  spotifyEndPoint,
  grantRefreshType
} from '../../../constants';


const handler = async (event) => {
  try {
    console.log('Swap Token');

    const authOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=${grantRefreshType}&refresh_token=${refresh_token}&client_id=${spotifyClientId}&client_secret=${spotifyClientSecret}&redirect_uri=${spotifyClientCallback}`
    }

    const result = fetch(spotifyEndPoint, authOptions);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }


  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
