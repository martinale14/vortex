import { CREATE_USER } from '../../utils/url_utils';
import axios from '../../utils/axios_config';

interface NewUser {
  userId: number;
  name: string;
  email: string;
  password: string;
  pictureUrl: any;
  role: number;
  phone: string;
}

class UserModalServices {
  static async createUser(data: NewUser) {
    return await axios.post(CREATE_USER, data);
  }
}

export default UserModalServices;
