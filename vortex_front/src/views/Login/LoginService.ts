import { LOGIN_ROUTE } from '../../utils/url_utils';
import axios from '../../utils/axios_config';
import { SEARCH_BY_JWT } from '../../utils/url_utils';
import { Token } from '../../utils/auth';

export interface LoginPayload {
  email: string;
  password: string;
}

class LoginService {
  static async login(credentials: LoginPayload) {
    let response: any = {};

    response = await axios.post(LOGIN_ROUTE, credentials);

    return response;
  }

  static verifySession = async () => {
    Token.authToken = localStorage.getItem('authToken') || '';
    Token.refreshToken = localStorage.getItem('refreshToken') || '';

    if (Token.authToken !== '' && Token.refreshToken !== '') {
      const response = await axios.get(SEARCH_BY_JWT);

      if (response !== undefined) {
        if (response.data?.user !== undefined) {
          return response.data?.user;
        }
      }
    }
  };
}

export default LoginService;
