import axios from '../../utils/axios_config';
import { CREATE_SPRINT } from '../../utils/url_utils';

interface NewSprint {
  startDate: string;
  endDate: string;
  status: String;
  createdBy: number;
  projectId: number;
}

class SprintModalService {
  static async createSprint(sprint: NewSprint) {
    let response: any = {};
    response = await axios.post(CREATE_SPRINT, sprint);
    return response;
  }
}

export default SprintModalService;
