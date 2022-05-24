import axios from '../../utils/axios_config';
import { CREATE_COMPANY } from '../../utils/url_utils';

interface NewCompany {
  name: string;
  email: string;
  phone: string;
  direction: string;
  createdBy: number;
}

class CompanyModalService {
  static async createCompany(company: NewCompany) {
    let response: any = {};
    response = await axios.post(CREATE_COMPANY, company);
    return response;
  }
}

export default CompanyModalService;
