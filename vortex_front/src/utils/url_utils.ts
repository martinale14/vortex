import { URL } from './current_url';

const LOGIN_ROUTE = `${URL}/auth/login`;
const GET_ALL_COMPANIES = `${URL}/company`;
const CREATE_PROJECT = `${URL}/project`; 

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: '/'
};

export { CREATE_PROJECT, GET_ALL_COMPANIES, LOGIN_ROUTE, HEADERS };
