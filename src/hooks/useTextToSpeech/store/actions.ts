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
  console.log("SET VOICES", voices);
  return {
    type: TextToSpeechActions.SET_VOICES,
    payload: voices,
  };
};

export const setSelectedVoice = (
  voice: SpeechSynthesisVoice
): SelectedVoicePayloadAction => {
  console.log("SET SELECTED VOICE", voice);
  return {
    type: TextToSpeechActions.SET_SELECTED_VOICE,
    payload: voice,
  };
};

export const setLanguage = (lang: string): StringPayloadAction => {
  console.log("SET TARGET LANGUAGE", lang);
  return {
    type: TextToSpeechActions.SET_LANGUAGE,
    payload: lang,
  };
};

export const setVolume = (volume: number): NumberPayloadAction => {
  console.log("SET VOLUME", volume);
  return {
    type: TextToSpeechActions.SET_VOLUME,
    payload: volume,
  };
};

export const setRate = (rate: number): NumberPayloadAction => {
  console.log("SET RATE", rate);
  return {
    type: TextToSpeechActions.SET_RATE,
    payload: rate,
  };
};

export const setPitch = (pitch: number): NumberPayloadAction => {
  console.log("SET PITCH", pitch);
  return {
    type: TextToSpeechActions.SET_PITCH,
    payload: pitch,
  };
};

export const setSpeaking = (speaking: boolean): BooleanPayloadAction => {
  console.log("SET SPEAKING", speaking);
  return {
    type: TextToSpeechActions.SET_SPEAKING,
    payload: speaking,
  };
};
