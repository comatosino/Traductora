import MicNoneIcon from "@mui/icons-material/MicNone";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
  Stack,
  Box,
  FormHelperText,
  Typography,
} from "@mui/material";

import { Microphone } from "../../hooks/useSpeechToText/types";
import { Speaker } from "../../hooks/useTextToSpeech/types";

import languages from "../../utils/maps/languages.json";
import countries from "../../utils/maps/countries.json";

import { useCallback, useEffect, useState } from "react";
import {
  setLanguage,
  setSelectedVoice,
} from "../../hooks/useTextToSpeech/store/actions";
import { useAppDispatch } from "../../store/hooks";
import { addTranslation } from "../../store/userSlice";
import API, { TranslationReqPayload } from "../../utils/API";
import { splitLangTag } from "../../utils";

const Main: React.FC<{
  microphone: Microphone;
  speaker: Speaker;
  langTags: string[];
}> = ({ microphone, speaker, langTags }): JSX.Element => {
  const { language: srcLang, listening, transcript } = microphone;
  const { language: trgLang, speaking } = speaker;

  const userDispatch = useAppDispatch();

  const [status, setStatus] = useState("Ready!");

  const [call, setCall] = useState({
    text: "",
    countryCode: "",
  });

  const [response, setResponse] = useState({
    text: "",
    countryCode: "",
  });

  useEffect(() => {
    if (speaking) setStatus("Speaking...");
    else if (!speaking && status === "Speaking...") setStatus("Ready!");
  }, [speaking]);

  useEffect(() => {
    if (!listening && status === "Listening...") setStatus("Ready!");
  }, [listening]);

  const translate = useCallback(
    async (transcript: string) => {
      setStatus("Translating...");
      setCall({
        text: transcript,
        countryCode: srcLang.substring(3),
      });

      // don't send request to api if languages are the same
      if (srcLang.substring(0, 2) === trgLang.substring(0, 2)) {
        setResponse({
          text: transcript,
          countryCode: srcLang.substring(3),
        });
        speaker.speak(transcript);
      } else {
        const payload: TranslationReqPayload = {
          srcLang,
          text: transcript,
          trgLang,
        };
        const response = await API.translate(payload);
        const translation = response.data;

        setResponse({
          text: translation.targetText,
          countryCode: trgLang.substring(3),
        });
        userDispatch(addTranslation(translation));
        speaker.speak(translation.targetText);
      }
    },
    [speaker, srcLang, trgLang, userDispatch]
  );

  useEffect(() => {
    if (transcript) translate(transcript);
  }, [translate, transcript]);

  const setSourceLang = (src: string) => {
    microphone.setLanguage(src);
  };

  const handleSetSourceLang = (e: SelectChangeEvent<string>) => {
    setSourceLang(e.target.value);
  };

  const setTargetLang = (trg: string) => {
    const voices = speaker.getVoiceMap();
    if (voices) {
      const defaultVoice = voices[trg][0];
      speaker.dispatch(setLanguage(trg));
      speaker.dispatch(setSelectedVoice(defaultVoice));
    }
  };

  const handleSetTargetLang = (e: SelectChangeEvent<string>) => {
    setTargetLang(e.target.value);
  };

  const handleSwapLangs = () => {
    const srcTemp = srcLang;
    const trgTemp = trgLang;
    setSourceLang(trgTemp);
    setTargetLang(srcTemp);
  };

  const handleListen = () => {
    setStatus("Listening...");
    setCall({
      text: "",
      countryCode: "",
    });
    setResponse({
      text: "",
      countryCode: "",
    });
    microphone.listen();
  };

  const [srcLangCode, srcCountryCode] = splitLangTag(srcLang);
  const [trgLangCode, trgCountryCode] = splitLangTag(trgLang);

  return (
    <Stack
      id={"main"}
      position={"relative"}
      boxSizing={"border-box"}
      justifyContent={"center"}
      spacing={1}
      minHeight={0.8}
      maxHeight={0.8}
      padding={3}
    >
      <Stack
        position={"absolute"}
        top={0}
        left={0}
        right={0}
        padding={5}
        spacing={1}
      >
        {call.text && (
          <Stack padding={1} flexDirection={"row"} alignItems={"center"}>
            <img
              height="20"
              src={`https://flagcdn.com/${call.countryCode.toLowerCase()}.svg`}
              alt={""}
            />
            <Typography fontSize={14} paddingLeft={1}>
              {call.text}
            </Typography>
          </Stack>
        )}

        {response.text && (
          <Stack
            justifyContent={"flex-end"}
            alignItems={"center"}
            flexDirection={"row"}
            padding={1}
          >
            <Typography fontSize={14} paddingRight={1} textAlign={"right"}>
              {response.text}
            </Typography>
            <img
              height="20"
              src={`https://flagcdn.com/${response.countryCode.toLowerCase()}.svg`}
              alt={""}
            />
          </Stack>
        )}
      </Stack>

      <Box
        display={"flex"}
        flexDirection={"row"}
        width={1}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Box width={150}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="src-lang">
              {`
                ${languages[srcLangCode]["endonym"]} •
                ${languages[srcLangCode]["exonym"]["en"]}
              `}
            </InputLabel>
            <Select
              label="Source Language"
              id="src-lang"
              name="source"
              value={microphone.language || ""}
              onChange={handleSetSourceLang}
            >
              {langTags.map((tag) => {
                const [, countryCode] = splitLangTag(tag);
                return (
                  <MenuItem key={tag} value={tag}>
                    <img
                      loading="lazy"
                      width="100"
                      src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
                      alt={""}
                    />
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText sx={{ overflow: "visible" }}>
              {countries[srcCountryCode]}
            </FormHelperText>
          </FormControl>
        </Box>

        <IconButton onClick={handleSwapLangs}>
          <SwapHorizIcon />
        </IconButton>

        <Box width={150}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="src-lang">
              {`
                ${languages[trgLangCode]["endonym"]} •
                ${languages[trgLangCode]["exonym"]["en"]}
              `}
            </InputLabel>

            <Select
              label="Target Language"
              id="trg-lang"
              name="target"
              value={speaker.language || ""}
              onChange={handleSetTargetLang}
            >
              {langTags.map((tag) => {
                const [, country] = splitLangTag(tag);
                return (
                  <MenuItem key={tag} value={tag}>
                    <img
                      loading="lazy"
                      width="100"
                      src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
                      alt={""}
                    />
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText>{countries[trgCountryCode]}</FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <Box
        position={"absolute"}
        bottom={50}
        left={0}
        right={0}
        display={"flex"}
        justifyContent={"center"}
      >
        <IconButton
          onClick={handleListen}
          disabled={status !== "Ready!"}
          aria-label="microphone"
        >
          <MicNoneIcon sx={{ fontSize: "5em" }} />
        </IconButton>
      </Box>
      <Typography
        textAlign={"center"}
        position={"absolute"}
        bottom={20}
        left={0}
        right={0}
      >
        {status}
      </Typography>
    </Stack>
  );
};

export default Main;
