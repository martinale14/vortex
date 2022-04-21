import { HEADERS, LOGIN_ROUTE } from '../../utils/url_utils';

export interface LoginPayload {
  email: string;
  password: string;
}

class LoginService {
  static async login(credentials: LoginPayload) {
    const response = await fetch(LOGIN_ROUTE, {
      method: 'POST',
      headers: { ...HEADERS },
      body: JSON.stringify(credentials)
    });

    return response;
  }
}

export default LoginService;
