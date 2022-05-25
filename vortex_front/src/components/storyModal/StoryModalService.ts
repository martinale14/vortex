import axios from '../../utils/axios_config';
import { CREATE_STORY, GET_ALL_USERS } from '../../utils/url_utils';

interface Story {}

class StoryModalService {
  static async createStory(story: Story) {
    let response;
    response = await axios.post(CREATE_STORY, story);
    return response;
  }

  static async retrieveUsers() {
    return (await axios.get(GET_ALL_USERS)).data.users;
  }
}

export default StoryModalService;
