import axios, { AxiosRequestHeaders } from 'axios';
import {
  AppApiAuthResponse,
  AppApiGetUserResponse,
  Credentials,
  Translation,
  TranslationReqPayload,
} from '../types/API';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('translator-token');
    if (token) {
      const headers: AxiosRequestHeaders = {
        authorization: `Bearer ${token}`,
      };
      config['headers'] = headers;
    }
    return config;
  },
  (error) => console.error(error)
);

// falls back to proxy defined in package.json in development
let domain = 'https://traductora-servidor.herokuapp.com/';
if (process.env.NODE_ENV === 'production') {
  domain = 'https://traductora-servidor.herokuapp.com/';
}

export default class API {
  static getUser = async () => {
    const url = domain + `auth/user`;
    return axios.get<AppApiGetUserResponse>(url);
  };

  static register = async (credentials: Credentials) => {
    const url = domain + `auth/register`;
    return axios.post<AppApiAuthResponse>(url, credentials);
  };

  static login = async (credentials: Credentials) => {
    const url = domain + `auth/login`;
    return axios.post<AppApiAuthResponse>(url, credentials);
  };

  static logout = async () => {
    const url = domain + `auth/logout`;
    return axios.delete(url);
  };

  static translate = async (payload: TranslationReqPayload) => {
    const url = domain + `api/translate`;
    return axios.post<Translation>(url, payload);
  };

  static delete = async (id: string): Promise<void> => {
    const url = domain + `api/translations/${id}`;
    return axios.delete(url);
  };
}
