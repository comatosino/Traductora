import { Reducer, ReducerWithoutAction } from "react";
import { SpeechToTextState } from "../types";

export const __setTranscript: Reducer<SpeechToTextState, string> = (
  state,
  payload
): SpeechToTextState => ({ ...state, transcript: payload });

export const __clearTranscript: ReducerWithoutAction<SpeechToTextState> = (
  state
): SpeechToTextState => ({ ...state, transcript: "" });

export const __setLanguage: Reducer<SpeechToTextState, string> = (
  state,
  payload
): SpeechToTextState => ({ ...state, language: payload });

export const __setListening: Reducer<SpeechToTextState, boolean> = (
  state,
  payload
): SpeechToTextState => ({ ...state, listening: payload });

export const __setContinuous: Reducer<SpeechToTextState, boolean> = (
  state,
  payload
): SpeechToTextState => ({ ...state, continuous: payload });

export const __setInterimResults: Reducer<SpeechToTextState, boolean> = (
  state,
  payload
): SpeechToTextState => ({
  ...state,
  interimResults: payload,
});
