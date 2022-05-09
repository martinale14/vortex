import axios from 'axios';
import { URL } from './current_url';
import { authToken } from './auth';

axios.defaults.baseURL = URL;

axios.interceptors.request.use(
  (config) => {
    if (config.url !== URL + '/auth/login') {
      config.headers!['x-access-token'] = authToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
