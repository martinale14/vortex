import axios from 'axios';
import { URL } from './current_url';
import { Token } from './auth';
import { GENERATE_NEW_TOKEN } from './url_utils';

axios.defaults.baseURL = URL;

axios.interceptors.request.use(
  (config) => {
    if (config.url !== URL + '/auth/login') {
      config.headers!['x-access-token'] = Token.authToken;
    }

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401 && error.response?.data.result === 'Token expirado') {
      const res = await axios.post(GENERATE_NEW_TOKEN, {
        refreshToken: Token.refreshToken
      });

      if (res.status === 200) {
        localStorage.setItem('authToken', res.data.token);
        localStorage.setItem('refreshToken', res.data.newRefreshToken);

        Token.authToken = res.data.token;
        Token.refreshToken = res.data.newRefreshToken;

        const retry = await axios.request(error.config);

        return Promise.resolve(retry);
      }

      return;
    } else if (error.response?.status === 403) {
      localStorage.clear();

      window.location.href = '/';
    }

    return Promise.resolve(error);
  }
);

export default axios;
