import { Reducer } from "react";
import {
  SpeechToTextState,
  SpeechToTextReducerAction,
  SpeechToTextActions,
} from "../types";
import {
  __setTranscript,
  __clearTranscript,
  __setListening,
  __setContinuous,
  __setInterimResults,
  __setLanguage,
} from "./reducerFunctions";

const speechToTextReducer: Reducer<
  SpeechToTextState,
  SpeechToTextReducerAction
> = (state, action): SpeechToTextState => {
  switch (action.type) {
    case SpeechToTextActions.CLEAR_TRANSCRIPT:
      return __clearTranscript(state);

    case SpeechToTextActions.SET_TRANSCRIPT:
      return __setTranscript(state, action.payload);

    case SpeechToTextActions.SET_LANGUAGE:
      return __setLanguage(state, action.payload);

    case SpeechToTextActions.SET_LISTENING:
      return __setListening(state, action.payload);

    case SpeechToTextActions.SET_CONTINUOUS:
      return __setContinuous(state, action.payload);

    case SpeechToTextActions.SET_INTERIM_RESULTS:
      return __setInterimResults(state, action.payload);

    default:
      throw new Error();
  }
};

export default speechToTextReducer;
