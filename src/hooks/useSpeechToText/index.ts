import { useEffect, useMemo, useReducer } from "react";
import SpeechToText from "./SpeechToText";
import INITIAL_STATE from "./store/init";
import {
  setTranscript,
  clearTranscript,
  setListening,
  setLanguage,
  setContinuous,
  setInterimResults,
} from "./store/actions";
import speechToTextReducer from "./store/reducer";
import {
  Microphone,
  SpeechToTextOptions,
  UseSpeechToTextReturn,
} from "./types";

const useSpeechToText = (): UseSpeechToTextReturn => {
  const speechToTextAvailable = SpeechToText.isSupported();
  const [state, dispatch] = useReducer(speechToTextReducer, INITIAL_STATE);

  useEffect(() => {
    if (speechToTextAvailable) {
      state.speechToText.interface.onstart = (_e: Event) => {
        state.speechToText.clearTranscript();
        dispatch(clearTranscript());
        state.speechToText.listening = true;
        dispatch(setListening(true));
      };
    }

    state.speechToText.interface.onresult = (
      e: SpeechRecognitionEvent
    ): void => {
      try {
        const { transcript } = e.results[0][0];
        state.speechToText.transcript = transcript;
        dispatch(setTranscript(transcript));
      } catch (error) {
        console.error(error);
      }
    };

    state.speechToText.interface.onend = (_e: Event) => {
      try {
        state.speechToText.listening = false;
        state.speechToText.clearTranscript();
        dispatch(clearTranscript());
        dispatch(setListening(false));
      } catch (error) {
        console.error(error);
      }
    };

    state.speechToText.interface.onnomatch = (
      _e: SpeechRecognitionEvent
    ): void => {
      console.log("NO SPEECH-TO-TEXT MATCH");
    };

    state.speechToText.interface.onerror = (
      e: SpeechRecognitionError
    ): void => {
      const errMessage = e.message || e.error;
      console.log("ERROR", errMessage);
    };
  });

  const microphone: Microphone = useMemo(() => {
    return {
      listening: state.listening,
      transcript: state.transcript,
      language: state.language,
      setLanguage: (lang: string): void => {
        state.speechToText.lang = lang;
        dispatch(setLanguage(lang));
      },
      async listen() {
        try {
          state.speechToText.start();
        } catch (error) {
          console.error(error);
        }
      },
      stop() {
        state.speechToText.stop();
      },
      abort() {
        state.speechToText.abort();
      },
      clear() {
        state.speechToText.clearTranscript();
      },
    };
  }, [state.listening, state.transcript, state.language, state.speechToText]);

  const options = useMemo((): SpeechToTextOptions => {
    return {
      language: state.language,
      continuous: state.continuous,
      setContinuous: (continuous: boolean) => {
        state.speechToText.continuous = continuous;
        dispatch(setContinuous(continuous));
      },
      interimResults: state.interimResults,
      setInterimResults: (interimResults: boolean) => {
        state.speechToText.interimResults = interimResults;
        dispatch(setInterimResults(interimResults));
      },
    };
  }, [
    state.language,
    state.continuous,
    state.interimResults,
    state.speechToText,
  ]);

  return {
    speechToTextAvailable,
    microphone,
    options,
  };
};

export default useSpeechToText;
