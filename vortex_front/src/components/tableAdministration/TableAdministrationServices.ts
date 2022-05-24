import { GET_ALL_USERS } from '../../utils/url_utils';
import axios from '../../utils/axios_config';

class TableAdministrationService {
  /* Lógica--- */
  static async fetchUsers() {
    return (await axios.get(GET_ALL_USERS)).data.users;
  }
}

export default TableAdministrationService;
