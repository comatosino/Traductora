import SpeechToText from "./SpeechToText";

export type SpeechToTextState = {
  speechToText: SpeechToText;
  transcript: string;
  language: string;
  listening: boolean;
  continuous: boolean;
  interimResults: boolean;
};

export type UseSpeechToTextReturn = {
  speechToTextAvailable: boolean;
  microphone: Microphone;
  options: SpeechToTextOptions;
};

export type Microphone = {
  listening: boolean;
  transcript: string;
  language: string;
  setLanguage: (lang: string) => void;
  listen: () => void;
  stop: () => void;
  abort: () => void;
  clear: () => void;
};

export type SpeechToTextOptions = {
  language: string;
  continuous: boolean;
  setContinuous: (continuous: boolean) => void;
  interimResults: boolean;
  setInterimResults: (interimResults: boolean) => void;
};

export enum SpeechToTextActions {
  SET_TRANSCRIPT,
  CLEAR_TRANSCRIPT,
  SET_LANGUAGE,
  SET_LISTENING,
  SET_CONTINUOUS,
  SET_INTERIM_RESULTS,
}

export type SpeechToTextReducerAction =
  | NoPayloadAction
  | StringPayloadAction
  | BooleanPayloadAction;

export type NoPayloadAction = {
  type: SpeechToTextActions.CLEAR_TRANSCRIPT;
};

export type StringPayloadAction = {
  type: SpeechToTextActions.SET_TRANSCRIPT | SpeechToTextActions.SET_LANGUAGE;
  payload: string;
};

export type BooleanPayloadAction = {
  type:
    | SpeechToTextActions.SET_LISTENING
    | SpeechToTextActions.SET_CONTINUOUS
    | SpeechToTextActions.SET_INTERIM_RESULTS;
  payload: boolean;
};
