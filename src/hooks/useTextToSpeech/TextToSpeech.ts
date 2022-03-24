import { SpeechSynthesisVoiceMap } from "./types";

export default class TextToSpeech {
  private static _instance: TextToSpeech;
  public interface: SpeechSynthesis;
  public voices: SpeechSynthesisVoiceMap | null = null;
  public speaking: boolean = false;

  private constructor() {
    this.interface = window.speechSynthesis;
    this.interface.onvoiceschanged = () => {
      const voicesArr = this.interface.getVoices();
      this.voices = voicesArr.reduce(
        (voiceMap: SpeechSynthesisVoiceMap, voice: SpeechSynthesisVoice) => {
          voiceMap[voice.lang]
            ? voiceMap[voice.lang].push(voice)
            : (voiceMap[voice.lang] = [voice]);
          return voiceMap;
        },
        {}
      );
    };
  }

  static isSupported(): boolean {
    return "speechSynthesis" in window || "webkitSpeechSynthesis" in window;
  }

  static getInstance(): TextToSpeech {
    if (this._instance) return this._instance;
    this._instance = new TextToSpeech();
    return this._instance;
  }

  getVoiceArray(): SpeechSynthesisVoice[] {
    return this.interface.getVoices();
  }

  getVoiceMap(): SpeechSynthesisVoiceMap | undefined {
    if (!this.voices) return;
    return this.voices;
  }

  speak(utterance: SpeechSynthesisUtterance): void {
    if (utterance) {
      this.interface.speak(utterance);
    }
  }

  pause(): void {
    this.interface.pause();
  }

  resume(): void {
    this.interface.resume();
  }

  cancel(): void {
    this.interface.cancel();
  }
}
