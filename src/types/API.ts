import { UserProfile } from './app';

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
  token: string;
  profile: UserProfile;
};
