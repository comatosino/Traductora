import SpeechToText from "../SpeechToText";
import { SpeechToTextState } from "../types";

const INITIAL_STATE: SpeechToTextState = {
  speechToText: SpeechToText.getInstance(),
  language: navigator.language,
  transcript: "",
  listening: false,
  continuous: false,
  interimResults: false,
};

export default INITIAL_STATE;
