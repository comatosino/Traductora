import { useEffect, useMemo, useReducer } from "react";
import { setSelectedVoice, setSpeaking, setVoices } from "./store/actions";
import INITIAL_STATE from "./store/init";
import textToSpeechReducer from "./store/reducer";
import TextToSpeech from "./TextToSpeech";

import { UseTextToSpeechReturn, TextToSpeechOptions, Speaker } from "./types";

const useTextToSpeech = (init = INITIAL_STATE): UseTextToSpeechReturn => {
  const textToSpeechAvailable = TextToSpeech.isSupported();
  const [state, dispatch] = useReducer(textToSpeechReducer, init);

  useEffect(() => {
    if (state.textToSpeech?.voiceArray.length) {
      const defaultVoice = state.textToSpeech.interface
        .getVoices()
        .find((el) => el.default);
      dispatch(setVoices(state.textToSpeech.voiceMap));
      dispatch(setSelectedVoice(defaultVoice!));
    }
  });

  const speaker = useMemo((): Speaker => {
    return {
      speaking: state.speaking,
      language: state.language,
      voices: state.textToSpeech?.voiceArray!,
      dispatch,
      speak(script: string) {
        if (state.selectedVoice) {
          const utterance = new SpeechSynthesisUtterance(script);
          utterance.voice = state.selectedVoice;
          utterance.lang = state.language;
          utterance.pitch = state.pitch as number;
          utterance.rate = state.rate as number;
          utterance.volume = state.volume as number;
          utterance.onstart = () => dispatch(setSpeaking(true));
          utterance.onend = () => dispatch(setSpeaking(false));
          utterance.onerror = (e) => console.log("ERROR: ", e.error);
          state.textToSpeech?.speak(utterance);
        }
      },
      pause: state.textToSpeech?.pause,
      resume: state.textToSpeech?.resume,
      cancel: state.textToSpeech?.cancel,
    };
  }, [
    state.language,
    state.speaking,
    state.textToSpeech,
    state.selectedVoice,
    state.pitch,
    state.rate,
    state.volume,
  ]);

  const options = useMemo((): TextToSpeechOptions => {
    return {
      dispatch,
      language: state.language,
      selectedVoice: state.selectedVoice,
      volume: state.volume,
      rate: state.rate,
      pitch: state.pitch,
    };
  }, [
    state.language,
    state.pitch,
    state.rate,
    state.selectedVoice,
    state.volume,
  ]);

  return { textToSpeechAvailable, speaker, options };
};

export default useTextToSpeech;
