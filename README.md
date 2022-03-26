[![MIT](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)

# Traductora

## Description

Welcome to Traductora: a full-stack speech-to-speech translator web application!

Written in Typescript and powered by React, React-Redux, and MUI on the frontend, and Node, Express, and MongoDB on the backend.

Create a user profile to start. Select a source language to speak and a target language to translate. Click the mic to start speaking. On a successful result, the translation will be displayed and saved to the user's history.

Makes use of a couple custom React hooks to interface with the browser Web Speech API Speech-to-Text (SpeechRecognition) and Text-to-Speech (SpeechSynthesis) interfaces.

---


<img src="./assets/translator.gif" height="500px"/>

---

## Contents

- [Backend](#backend)
- [Installation](#installation)
- [Usage](#usage)
- [Hooks](#hooks)
- [Issues](#issues)
- [Contact](#contact)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Backend

This repository supports the client-side of the application. The backend is available [here](https://github.com/comatosino/translator-server) on GitHub.

---

## Installation

This project was bootstrapped with the Create React App [React-Redux Typescript](https://react-redux.js.org/introduction/getting-started) template with Redux Toolkit.

```
git clone https://github.com/comatosino/traductora.git
npm install
```

---

## Usage

- Install the API server and dependencies from [its repository](#backend).
- Start the server with `npm start` in the server directory.
- [Install](#installation) the client dependencies.
- Start the client development server with `npm start` in the client directory
- The server will run on `localhost:5000` by default. The client will proxy requests here.
  - If the backend is deployed, the domain to which the client makes requests can be modified in `src/utils/API.ts`
    - Change `domain` variable to deployed backend domain name.

---

## Hooks

These hooks can be used independently, though they require further testing across all browsers.

It's recommended they be called once in the application.

In their current implementation, they interface with the Web APIs via singleton wrapper classes. Repeated calls to either hook will create new instances of state for each _hook_, but all method calls will reference the same instance managing some of the abstraction between react and the browser APIs.

Currently, desktop browsers provide the greatest support. Further troubleshooting is needed for possible workarounds for mobile browsers.

### **useSpeechToText**

For a much more robust React speech-to-text hook, check out [
react-speech-recognition](https://github.com/JamesBrill/react-speech-recognition).

```
const {
    speechToTextAvailable,
    microphone,
    options: micOptions, // with alias
  } = useSpeechToText();
```

Manages state with useReducer

`speechToTextAvailable: boolean`

use this to render fallback content in the event the browser doesn't support SpeechRecognition.

#### **microphone**

Interface for speech-to-text functions.

**microphone properties**

`listening: boolean`

True if SpeechRecognition has started listening, else false.

Useful for conditional rendering and effects.

`transcript: string`

Updated when voice input returns successful result.

`language: string`

BCP 47 language tag describing language and locale.

**microphone methods**

`setLanguage(lang: string) => void`

_lang: BCP 47 language tag describing language and locale_

Sets the language to listen for.

`listen()`

Starts listening for user input. Throws error if no speech results returned.

`stop()`

Stops listening and attempts to populate transcript with results.

`abort()`

Stops listening and does not attempt to return any results.

`clear()`

Reset transcript to empty string.

#### **options**

**options properties**

Additional property getters and setters.

`language: string`

BCP 47 language tag describing language and locale.

`continuous: boolean`

[Controls whether continuous results are returned for each recognition, or only a single result.](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/continuous)

`interimResults`

[Controls whether interim results should be returned (true) or not (false)](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults).

**options methods**

`setContinuous: (continuous: boolean) => void`

Sets continuous property to given value.

`setInterimResults: (interimResults: boolean) => void`

Sets interimResults property to given value.

### **useTextToSpeech**

```
  const {
    textToSpeechAvailable,
    speaker,
    options: speakOptions, // with alias
  } = useTextToSpeech();
```

Manages state with useReducer.

`textToSpeechAvailable: boolean`

Use this to render fallback content in the event the browser doesn't support SpeechSynthesis.

#### **speaker**

Interface for text-to-speech functions.

**speaker properties**

`speaking: boolean`

True while speaking a phrase. Useful for conditional rendering and effects.

`language: string`

BCP 47 language tag describing language and locale.

**speaker methods**

`dispatch() => void`

Reference to useReducer dispatch. Unlike useSpeechToText, there is nothing to do before updating parts of hook state, so can just pass dispatch instead of passing a thunk that than calls dispatch.

`getVoiceMap() => SpeechSynthesisVoiceMap`

_Available voices vary between browsers_

Returns a map of SpeechSynthesisVoice arrays. Each key is a string representing a BCP 47 language tag and each value is an array of available voices for that language and locale. Is always constructed from `getVoiceArray()`.

`getVoiceArray() => SpeechSynthesisVoice[]`

_Available voices vary between browsers_

Returns an [array of SpeechSynthesisVoice objects](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis) representing all the available voices on the current device.

Note: this method is just a reference to [SpeechSynthesis.getVoices()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices)

`speak(script: string) => void`

Creates a [SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) object with properties set to match hook state at the time this method in called and the text to be spoken. Consumes the utterance. Events dispatched by the utterance update the `speaking` property of the hook state, and so also of [speaker](#speaker).

`pause() => void`

Pauses speaking.

`resume() => void`

Resumes speaking.

`cancel() => void`

Cancels speaking.

#### **options**

**options properties**

`language: string`

BCP 47 language tag describing language and locale.

`selectedVoice: SpeechSynthesisVoice`

The currently selected [SpeechSynthesisVoice](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice) object that will be used if `speak()` is called.

`volume: number`

Volume that will be used when `speak()` is called

`rate: number`

Rate that will be used when `speak()` is called

`pitch: number`

Pitch that will be used when `speak()` is called

**options methods**

`dispatch() => void`

Reference to useReducer dispatch

Update above properties by calling dispatch with the appropriate action in `/store/actions`, e.g.

```
import { setVolume } from `useTextToSpeech/store/actions`

dispatch(setVolume(2)) // updates volume property in state
```

## Issues

[Issues](https://github.com/comatosino/traductora/issues)

Currently, only desktop browsers can fully support this application.

Though [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) state support accross several mobile browsers, implementations differ and there has been initial difficulty in interfacing with mobile OS speech engines.

Will need to check navigator for mobile browsers and render fallback content for now.

## Contact

Questions? Reach out to me at:

GitHub: [comatosino](https://github.com/comatosino)

Email: adamsiii.robert@gmail.com

## License

This project is covered under the [MIT](https://opensource.org/licenses/MIT) license.
