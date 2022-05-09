import { URL } from './current_url';

const LOGIN_ROUTE = `${URL}/auth/login`;
const GET_ALL_COMPANIES = `${URL}/company`;
const GET_STORIES_BYSPRINT = `${URL}/history/fromSprint`;
const CREATE_PROJECT = `${URL}/project`;
const CREATE_COMPANY = `${URL}/company`;
const CREATE_SPRINT = `${URL}/sprint`;
const CREATE_STORY = `${URL}/history`;

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: '/'
};

export {
  CREATE_COMPANY,
  CREATE_PROJECT,
  GET_ALL_COMPANIES,
  LOGIN_ROUTE,
  HEADERS,
  CREATE_SPRINT,
  CREATE_STORY,
  GET_STORIES_BYSPRINT
};
