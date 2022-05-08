import axios from 'axios';
import {URL} from './current_url';
import {authToken, refreshToken} from './auth';

axios.defaults.baseURL = URL;

axios.interceptors.request.use(function(config) {

    config.headers!['x-access-token'] = authToken;
    if(config.url !== (URL + '/auth/login')){
        console.log('error');
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

export default axios;