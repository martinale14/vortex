import { URL } from './current_url';

export const LOGIN_ROUTE = `${URL}/auth/login`;
export const GET_ALL_COMPANIES = `${URL}/company`;
export const GET_ALL_PROJECTS = `${URL}/project/`;
export const GET_ALL_SPRINTS = `${URL}/sprint/fromProject/`;
export const GET_ALL_HISTORIES = `${URL}/history/fromSprint/`;
export const GET_STORIES_BYSPRINT = `${URL}/history/fromSprint`;
export const GET_ALL_USERS = `${URL}/auth/users`;
export const CREATE_PROJECT = `${URL}/project`;
export const CREATE_COMPANY = `${URL}/company`;
export const CREATE_SPRINT = `${URL}/sprint`;
export const CREATE_STORY = `${URL}/history`;
export const CREATE_USER = `${URL}/auth/register`;
export const SEARCH_BY_JWT = `${URL}/search/user/id`;
export const GENERATE_NEW_TOKEN = `${URL}/auth/token`;

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: '/'
};
