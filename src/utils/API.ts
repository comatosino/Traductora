import axios, { AxiosRequestHeaders } from "axios";
import { UserProfile } from "../store/userSlice";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("translator-token");
    if (token) {
      const headers: AxiosRequestHeaders = {
        authorization: `Bearer ${token}`,
      };
      config["headers"] = headers;
    }
    return config;
  },
  (error) => console.error(error)
);

export type Credentials = {
  username: string;
  password: string;
};

export type TranslationReqPayload = {
  srcLang: string;
  trgLang: string;
  text: string;
};

export type Translation = {
  _id: string;
  source: string;
  sourceText: string;
  target: string;
  targetText: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AppApiGetUserResponse = {
  profile: UserProfile;
};

export type AppApiAuthResponse = {
  token: "string";
  profile: UserProfile;
};

const domain = "";
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
