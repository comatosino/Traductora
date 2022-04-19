import { Translation } from './API';

export interface UserProfile {
  username?: string;
  translations?: Translation[];
}

export interface UserState {
  profile: UserProfile;
  error: string;
  fetching: boolean;
}

export enum Page {
  HISTORY,
  MAIN,
  OPTIONS,
}