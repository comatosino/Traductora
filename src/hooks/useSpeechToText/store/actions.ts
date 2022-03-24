import {
  BooleanPayloadAction,
  NoPayloadAction,
  SpeechToTextActions,
  StringPayloadAction,
} from "../types";

export const setTranscript = (transcript: string): StringPayloadAction => {
  console.log("SET TRANSCRIPT", transcript);
  return {
    type: SpeechToTextActions.SET_TRANSCRIPT,
    payload: transcript,
  };
};

export const clearTranscript = (): NoPayloadAction => {
  console.log("CLEAR TRANSCRIPT");
  return {
    type: SpeechToTextActions.CLEAR_TRANSCRIPT,
  };
};

export const setLanguage = (lang: string): StringPayloadAction => {
  console.log("SET SOURCE LANGUAGE", lang);
  return {
    type: SpeechToTextActions.SET_LANGUAGE,
    payload: lang,
  };
};

export const setListening = (bool: boolean): BooleanPayloadAction => {
  console.log("SET LISTENING", bool);
  return {
    type: SpeechToTextActions.SET_LISTENING,
    payload: bool,
  };
};

export const setContinuous = (bool: boolean): BooleanPayloadAction => {
  console.log("SET CONTINUOUS", bool);
  return {
    type: SpeechToTextActions.SET_CONTINUOUS,
    payload: bool,
  };
};

export const setInterimResults = (bool: boolean): BooleanPayloadAction => {
  console.log("SET INTERIM RESULTS", bool);
  return {
    type: SpeechToTextActions.SET_INTERIM_RESULTS,
    payload: bool,
  };
};
