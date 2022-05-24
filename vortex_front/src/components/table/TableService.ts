import { GET_ALL_COMPANIES, GET_ALL_HISTORIES, GET_ALL_PROJECTS, GET_ALL_SPRINTS } from '../../utils/url_utils';
import axios from '../../utils/axios_config';

class TableService {
  static async fetchCompanies() {
    return (await axios.get(GET_ALL_COMPANIES)).data.companies;
  }

  static async fetchProjects(id: string) {
    return (await axios.get(GET_ALL_PROJECTS + id)).data.projects;
  }

  static async fetchSprints(id: string) {
    return (await axios.get(GET_ALL_SPRINTS + id)).data.sprints;
  }

  static async fetchUserStories(id: string) {
    return (await axios.get(GET_ALL_HISTORIES + id)).data.histories;
  }
}

export default TableService;
