import axios from 'axios';
import { config } from 'config';
import querystring from 'querystring';

class GoogleProvider {
  getToken(code: string) {
    return axios
      .post(
        'https://oauth2.googleapis.com/token',
        querystring.stringify({
          client_id: config.GOOGLE_CLIENT_ID,
          client_secret: config.GOOGLE_CLIENT_SECRET,
          code,
          grant_type: 'authorization_code',
          redirect_uri: config.GOOGLE_REDIRECT_URI,
        }),
      )
      .then(({ data }) => data);
  }
  getGoogleAuthUrl = () => {
    const params = {
      client_id: config.GOOGLE_CLIENT_ID,
      redirect_uri: config.GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'profile email',
    };

    return `https://accounts.google.com/o/oauth2/v2/auth?${querystring.stringify(params)}`;
  };
}

export const googleProvider = new GoogleProvider();
