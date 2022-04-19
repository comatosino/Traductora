import { SpeechSynthesisVoiceMap, TextToSpeechVoiceArray } from './types';

import countries from '../../utils/maps/countries.json';
import languages from '../../utils/maps/languages.json';

export default class TextToSpeech {
  private static _instance: TextToSpeech;
  public interface: SpeechSynthesis;
  public voiceMap: SpeechSynthesisVoiceMap = {};
  public voiceArray: TextToSpeechVoiceArray = [];
  public speaking: boolean = false;

  private constructor() {
    this.interface = window.speechSynthesis;
    this.interface.onvoiceschanged = () => {
      this.voiceMap = this.interface
        .getVoices()
        .reduce<SpeechSynthesisVoiceMap>((map, voice) => {
          const [langCode, countryCode] = voice.lang.split('-');

          if (map[langCode]) {
            const country = map[langCode].countries.find(
              (country) => country.code === countryCode
            );
            country
              ? country.voices.push(voice)
              : map[langCode].countries.push({
                  code: countryCode,
                  name_en: countries[countryCode],
                  voices: [voice],
                });
          } else {
            map[langCode] = {
              code: langCode,
              endonym: languages[langCode].endonym,
              exonyms: languages[langCode].exonyms,
              countries: [
                {
                  code: countryCode,
                  name_en: countries[countryCode],
                  voices: [voice],
                },
              ],
            };
          }
          return map;
        }, {});
      this.voiceArray = Object.values(this.voiceMap);
    };
  }

  static isSupported(): boolean {
    return 'speechSynthesis' in window || 'webkitSpeechSynthesis' in window;
  }

  static getInstance(): TextToSpeech {
    if (this._instance) return this._instance;
    this._instance = new TextToSpeech();
    return this._instance;
  }

  speak(utterance: SpeechSynthesisUtterance): void {
    if (utterance) this.interface.speak(utterance);
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
