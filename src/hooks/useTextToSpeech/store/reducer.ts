import { Reducer } from "react";
import {
  TextToSpeechState,
  TextToSpeechReducerAction,
  TextToSpeechActions,
} from "../types";
import {
  __setVoices,
  __setSelectedVoice,
  __setVolume,
  __setRate,
  __setPitch,
  __setSpeaking,
  __setLanguage,
} from "./reducerFunctions";

const textToSpeechReducer: Reducer<
  TextToSpeechState,
  TextToSpeechReducerAction
> = (state, action): TextToSpeechState => {
  switch (action.type) {
    case TextToSpeechActions.SET_VOICES:
      return __setVoices(state, action.payload);

    case TextToSpeechActions.SET_SELECTED_VOICE:
      return __setSelectedVoice(state, action.payload);

    case TextToSpeechActions.SET_LANGUAGE:
      return __setLanguage(state, action.payload);

    case TextToSpeechActions.SET_VOLUME:
      return __setVolume(state, action.payload);

    case TextToSpeechActions.SET_RATE:
      return __setRate(state, action.payload);

    case TextToSpeechActions.SET_PITCH:
      return __setPitch(state, action.payload);

    case TextToSpeechActions.SET_SPEAKING:
      return __setSpeaking(state, action.payload);

    default:
      return state;
  }
};

export default textToSpeechReducer;
