import { LOGIN_ROUTE } from '../../utils/url_utils';
import axios from '../../utils/axios_config';

export interface LoginPayload {
  email: string;
  password: string;
}

class LoginService {
  static async login(credentials: LoginPayload) {
    const response = await axios.post(LOGIN_ROUTE, credentials);

    return response;
  }
}

export default LoginService;
