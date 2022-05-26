import axios from '../../utils/axios_config';
import { GET_ALL_TEMPLATES } from '../../utils/url_utils';

export class TableTemplateService {
  static async getAllTemplates() {
    return await axios.get(GET_ALL_TEMPLATES);
  }

  static async createTemplate(description: string, type: string) {
    return await axios.post(GET_ALL_TEMPLATES, { description, type });
  }
}
