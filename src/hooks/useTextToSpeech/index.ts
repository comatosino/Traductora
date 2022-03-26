import { useEffect, useMemo, useReducer } from "react";
import { setSelectedVoice, setSpeaking, setVoices } from "./store/actions";
import INITIAL_STATE from "./store/init";
import textToSpeechReducer from "./store/reducer";
import TextToSpeech from "./TextToSpeech";

import { UseTextToSpeechReturn, TextToSpeechOptions, Speaker } from "./types";

const useTextToSpeech = (): UseTextToSpeechReturn => {
  const textToSpeechAvailable = TextToSpeech.isSupported();
  const [state, dispatch] = useReducer(textToSpeechReducer, INITIAL_STATE);

  useEffect(() => {
    if (state.textToSpeech.voices) {
      const voices = state.textToSpeech.voices;
      const localVoice = voices[navigator.language][0];
      dispatch(setVoices(state.textToSpeech.voices));
      dispatch(setSelectedVoice(localVoice));
    }
  }, [state.textToSpeech.voices]);

  const speaker = useMemo((): Speaker => {
    return {
      dispatch,
      language: state.language,
      speaking: state.speaking,
      getVoiceMap: () => {
        return state.textToSpeech.getVoiceMap();
      },
      getVoiceArray: () => {
        return state.textToSpeech.getVoiceArray();
      },
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

          state.textToSpeech.speak(utterance);
        }
      },
      pause() {
        state.textToSpeech.pause();
      },
      resume() {
        state.textToSpeech.resume();
      },
      cancel() {
        state.textToSpeech.cancel();
      },
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
