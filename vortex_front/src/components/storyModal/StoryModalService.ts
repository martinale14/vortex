import axios from '../../utils/axios_config';
import { CREATE_STORY } from '../../utils/url_utils';

interface Story {}

class StoryModalService {
  static async createStory(story: Story) {
    let response;
    response = await axios.post(CREATE_STORY, story);
    return response;
  }
}

export default StoryModalService;
