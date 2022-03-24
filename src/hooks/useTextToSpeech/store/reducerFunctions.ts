import { Reducer } from "react";
import { TextToSpeechState, SpeechSynthesisVoiceMap } from "../types";

export const __setSpeaking: Reducer<TextToSpeechState, boolean> = (
  state,
  payload
): TextToSpeechState => {
  return { ...state, speaking: payload };
};

export const __setSelectedVoice: Reducer<
  TextToSpeechState,
  SpeechSynthesisVoice
> = (state, payload): TextToSpeechState => {
  return { ...state, selectedVoice: payload };
};

export const __setVoices: Reducer<
  TextToSpeechState,
  SpeechSynthesisVoiceMap
> = (state, payload): TextToSpeechState => {
  return { ...state, voices: payload };
};

export const __setLanguage: Reducer<TextToSpeechState, string> = (
  state,
  payload
): TextToSpeechState => {
  return { ...state, language: payload };
};

export const __setVolume: Reducer<TextToSpeechState, number> = (
  state,
  payload
): TextToSpeechState => {
  return { ...state, volume: payload };
};

export const __setRate: Reducer<TextToSpeechState, number> = (
  state,
  payload
): TextToSpeechState => {
  return { ...state, rate: payload };
};

export const __setPitch: Reducer<TextToSpeechState, number> = (
  state,
  payload
): TextToSpeechState => {
  return { ...state, pitch: payload };
};
