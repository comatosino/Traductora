import {
  BooleanPayloadAction,
  NoPayloadAction,
  SpeechToTextActions,
  StringPayloadAction,
} from "../types";

export const setTranscript = (transcript: string): StringPayloadAction => {
  return {
    type: SpeechToTextActions.SET_TRANSCRIPT,
    payload: transcript,
  };
};

export const clearTranscript = (): NoPayloadAction => {
  return {
    type: SpeechToTextActions.CLEAR_TRANSCRIPT,
  };
};

export const setLanguage = (lang: string): StringPayloadAction => {
  return {
    type: SpeechToTextActions.SET_LANGUAGE,
    payload: lang,
  };
};

export const setListening = (bool: boolean): BooleanPayloadAction => {
  return {
    type: SpeechToTextActions.SET_LISTENING,
    payload: bool,
  };
};

export const setContinuous = (bool: boolean): BooleanPayloadAction => {
  return {
    type: SpeechToTextActions.SET_CONTINUOUS,
    payload: bool,
  };
};

export const setInterimResults = (bool: boolean): BooleanPayloadAction => {
  return {
    type: SpeechToTextActions.SET_INTERIM_RESULTS,
    payload: bool,
  };
};
