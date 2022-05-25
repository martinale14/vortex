import axios from '../../utils/axios_config';
import { UPDATE_PICTURE, UPDATE_USER } from '../../utils/url_utils';

class ProfileService {
  static async updateImage(formData: any) {
    const res = await axios.put(UPDATE_PICTURE, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res;
  }

  static async updateProfile(payload: any) {
    const res = await axios.put(UPDATE_USER, payload);
    return res;
  }
}

export default ProfileService;
