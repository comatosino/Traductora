import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { addTranslation } from "../../store/userSlice";
import {
  setLanguage,
  setSelectedVoice,
} from "../../hooks/useTextToSpeech/store/actions";
import API, { TranslationReqPayload } from "../../utils/API";

import Box from "@mui/material/Box";
import MicNoneIcon from "@mui/icons-material/MicNone";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { IconButton, Stack, Typography } from "@mui/material";

import { Microphone } from "../../hooks/useSpeechToText/types";
import { Speaker } from "../../hooks/useTextToSpeech/types";
import LangDialog from "../../components/LangDialog";
import { splitLangTag } from "../../utils";

const Main: React.FC<{
  microphone: Microphone;
  speaker: Speaker;
}> = ({ microphone, speaker }): JSX.Element => {
  const { language: srcLang, listening, transcript } = microphone;
  const { language: trgLang, speaking, voices } = speaker;

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

  const [dialogOpen, setDialogOpen] = useState<{ [type: string]: boolean }>({
    target: false,
    source: false,
  });
  const handleOpen = (type: string) => {
    setDialogOpen(() => ({ ...dialogOpen, [type]: true }));
  };
  const handleClose = (type: string, value: string) => {
    if (value) {
      switch (type) {
        case "source":
          microphone.setLanguage(value);
          break;
        case "target":
          const [langCode, countryCode] = splitLangTag(value);

          const lang = voices.find((lang) => lang.code === langCode);
          const country = lang?.countries.find(
            (ctry) => ctry.code === countryCode
          );
          const voice = country?.voices[0];
          speaker.dispatch(setLanguage(value));
          speaker.dispatch(setSelectedVoice(voice!));
          break;
      }
    }
    setDialogOpen(() => ({ ...dialogOpen, [type]: false }));
  };

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

      {/* /////////////////////////////////////////////////////////////////////////////// */}
      <Box
        display={"flex"}
        flexDirection={"row"}
        width={1}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <IconButton onClick={() => handleOpen("source")} disableRipple>
          <img
            loading="lazy"
            width="100"
            src={`https://flagcdn.com/${srcLang
              .substring(3)
              .toLowerCase()}.svg`}
            alt={""}
          />
        </IconButton>
        <LangDialog
          type="source"
          open={dialogOpen.source}
          voices={voices}
          handleClose={handleClose}
        />

        <IconButton>
          <ArrowRightIcon />
        </IconButton>

        <IconButton onClick={() => handleOpen("target")} disableRipple>
          <img
            loading="lazy"
            width="100"
            src={`https://flagcdn.com/${trgLang
              .substring(3)
              .toLowerCase()}.svg`}
            alt={""}
          />
        </IconButton>
        <LangDialog
          type="target"
          open={dialogOpen.target}
          voices={voices}
          handleClose={handleClose}
        />

        {/* /////////////////////////////////////////////////////////////////////////////// */}
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
