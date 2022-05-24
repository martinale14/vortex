import axios from '../../utils/axios_config';
import { CREATE_PROJECT } from '../../utils/url_utils';

interface NewProject {
  name: string;
  estimatedTime: string;
  startDate: string;
  createdBy: number;
  companyId: number;
}

class ProjectModalService {
  static async createProject(project: NewProject) {
    let response: any = {};
    response = await axios.post(CREATE_PROJECT, project);
    return response;
  }
}

export default ProjectModalService;
