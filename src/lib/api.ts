import axios from 'axios';
import { AUTHENTICATION_SERVICE_URL } from './constant/environment';

export const authenticationApi = axios.create({
  headers: {},
  baseURL: AUTHENTICATION_SERVICE_URL,
});
