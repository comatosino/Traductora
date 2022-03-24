import TextToSpeech from "../TextToSpeech";
import { TextToSpeechState } from "../types";

const INITIAL_STATE: TextToSpeechState = {
  textToSpeech: TextToSpeech.getInstance(),
  speaking: false,
  language: navigator.language,
  selectedVoice: null,
  voices: null,
  volume: 1,
  rate: 1,
  pitch: 1,
};

export default INITIAL_STATE;
