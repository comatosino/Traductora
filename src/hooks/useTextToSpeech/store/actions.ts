import {
  TextToSpeechActions,
  StringPayloadAction,
  VoicesPayloadAction,
  NumberPayloadAction,
  BooleanPayloadAction,
  SelectedVoicePayloadAction,
  SpeechSynthesisVoiceMap,
} from "../types";

export const setVoices = (
  voices: SpeechSynthesisVoiceMap
): VoicesPayloadAction => {
  return {
    type: TextToSpeechActions.SET_VOICES,
    payload: voices,
  };
};

export const setSelectedVoice = (
  voice: SpeechSynthesisVoice
): SelectedVoicePayloadAction => {
  return {
    type: TextToSpeechActions.SET_SELECTED_VOICE,
    payload: voice,
  };
};

export const setLanguage = (lang: string): StringPayloadAction => {
  return {
    type: TextToSpeechActions.SET_LANGUAGE,
    payload: lang,
  };
};

export const setVolume = (volume: number): NumberPayloadAction => {
  return {
    type: TextToSpeechActions.SET_VOLUME,
    payload: volume,
  };
};

export const setRate = (rate: number): NumberPayloadAction => {
  return {
    type: TextToSpeechActions.SET_RATE,
    payload: rate,
  };
};

export const setPitch = (pitch: number): NumberPayloadAction => {
  return {
    type: TextToSpeechActions.SET_PITCH,
    payload: pitch,
  };
};

export const setSpeaking = (speaking: boolean): BooleanPayloadAction => {
  return {
    type: TextToSpeechActions.SET_SPEAKING,
    payload: speaking,
  };
};
