import axios from '../../utils/axios_config';
import { GET_STORIES_BYPROJECT } from '../../utils/url_utils';

class ProjectTableService {
  static async fetchStories(projectId: string) {
    return (await axios.get(GET_STORIES_BYPROJECT + projectId)).data.histories;
  }
}

export default ProjectTableService;
