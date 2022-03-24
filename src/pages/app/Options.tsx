import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

import {
  TextToSpeechOptions,
  TextToSpeechActions,
  SpeechSynthesisVoiceMap,
} from "../../hooks/useTextToSpeech/types";
import { SpeechToTextOptions } from "../../hooks/useSpeechToText/types";

import languages from "../../utils/maps/languages.json";
import countries from "../../utils/maps/countries.json";

import {
  setPitch,
  setRate,
  setSelectedVoice,
  setVolume,
} from "../../hooks/useTextToSpeech/store/actions";
import { splitLangTag } from "../../utils";

const Options: React.FC<{
  micOptions: SpeechToTextOptions;
  speakOptions: TextToSpeechOptions;
  getVoices: () => SpeechSynthesisVoiceMap | undefined;
}> = ({ micOptions, speakOptions, getVoices }): JSX.Element => {
  const altVoices = getVoices()![speakOptions.language];
  const [trgLangCode, trgCountryCode] = splitLangTag(speakOptions.language);

  const handleSetVoice = (e: SelectChangeEvent<string>) => {
    const voice = altVoices.find((voice) => voice.name === e.target.value);
    if (voice) speakOptions.dispatch(setSelectedVoice(voice));
  };

  return (
    <Stack
      id={"options"}
      spacing={3}
      padding={3}
      maxHeight={0.8}
      minHeight={0.8}
      boxSizing={"border-box"}
    >
      <Typography component="h2">
        <Divider>Voice Options</Divider>
      </Typography>

      <FormControl>
        <InputLabel>{`${languages[trgLangCode]["exonym"]["en"]} (${countries[trgCountryCode]}) Alternate Voices`}</InputLabel>
        <Select
          labelId="alt-voice-select-label"
          id="alt-voice-select"
          value={speakOptions.selectedVoice?.name || ""}
          label={`${languages[trgLangCode]["exonym"]["en"]} (${countries[trgCountryCode]}) Alternate Voices`}
          onChange={handleSetVoice}
        >
          {altVoices.map((voice) => {
            return (
              <MenuItem key={voice.name} value={voice.name}>
                {voice.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Typography id="volume-slider">Volume</Typography>
      <Slider
        name={TextToSpeechActions[TextToSpeechActions.SET_VOLUME]}
        aria-labelledby="volume-slider"
        value={speakOptions.volume}
        getAriaValueText={() => `${speakOptions.volume}`}
        valueLabelDisplay="auto"
        step={0.25}
        marks
        min={0}
        max={1}
        onChange={(_e, value) =>
          speakOptions.dispatch(setVolume(value as number))
        }
      />
      <Typography id="pitch-slider">Pitch</Typography>
      <Slider
        name={TextToSpeechActions[TextToSpeechActions.SET_PITCH]}
        aria-labelledby="pitch-slider"
        value={speakOptions.pitch}
        getAriaValueText={() => `${speakOptions.pitch}`}
        valueLabelDisplay="auto"
        step={0.25}
        marks
        min={0}
        max={2}
        onChange={(_e, value) =>
          speakOptions.dispatch(setPitch(value as number))
        }
      />

      <Typography id="rate-slider">Rate</Typography>
      <Slider
        name={TextToSpeechActions[TextToSpeechActions.SET_RATE]}
        aria-labelledby="rate-slider"
        value={speakOptions.rate}
        getAriaValueText={() => `${speakOptions.rate}`}
        valueLabelDisplay="auto"
        step={0.1}
        marks
        min={0.1}
        max={10}
        onChange={(_e, value) =>
          speakOptions.dispatch(setRate(value as number))
        }
      />
    </Stack>
  );
};

export default Options;
