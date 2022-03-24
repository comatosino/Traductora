export default class SpeechToText {
  private static _instance: SpeechToText;
  public interface: SpeechRecognition;
  public listening: boolean = false;
  public transcript: string = "";

  private constructor() {
    const Recognition = webkitSpeechRecognition || SpeechRecognition;
    this.interface = new Recognition();
    this.interface.lang = navigator.language;
  }

  static isSupported(): boolean {
    return "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
  }

  static getInstance(): SpeechToText {
    if (this._instance) return this._instance;
    this._instance = new SpeechToText();
    return this._instance;
  }

  get lang() {
    return this.interface.lang;
  }

  set lang(lang: string) {
    this.interface.lang = lang;
  }

  get continuous() {
    return this.interface.continuous;
  }

  set continuous(bool: boolean) {
    this.interface.continuous = bool;
  }

  get interimResults() {
    return this.interface.interimResults;
  }

  set interimResults(bool: boolean) {
    this.interface.interimResults = bool;
  }

  start() {
    this.clearTranscript();
    this.listening = true;
    this.interface.start();
  }

  stop() {
    this.listening = false;
    this.interface.stop();
  }

  abort() {
    this.clearTranscript();
    this.listening = false;
    this.interface.abort();
  }

  clearTranscript() {
    this.transcript = "";
  }
}
