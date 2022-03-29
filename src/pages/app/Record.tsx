import React from "react";

import "./scrollbar.css";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";

import languages from "../../hooks/maps/languages.json";
import countries from "../../hooks/maps/countries.json";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteTranslation } from "../../store/userSlice/thunks";
import { splitLangTag } from "../../utils";
import { Translation } from "../../utils/API";

const Record: React.FC = (): JSX.Element => {
  const userDispatch = useAppDispatch();
  const translations = useAppSelector(
    (state) => state.user.profile?.translations
  );

  if (!translations || !translations.length) {
    return (
      <Stack
        maxHeight={0.8}
        minHeight={0.8}
        padding={1}
        boxSizing={"border-box"}
        justifyContent={"center"}
      >
        <Typography textAlign={"center"}>No history to display!</Typography>
      </Stack>
    );
  }

  return (
    <Stack
      id={"history"}
      overflow={"auto"}
      maxHeight={0.8}
      minHeight={0.8}
      padding={1}
      boxSizing={"border-box"}
    >
      {translations.map((translation: Translation) => {
        const [srcLangCode, srcCountryCode] = splitLangTag(translation.source);
        const [trgLangCode, trgCountryCode] = splitLangTag(translation.target);
        return (
          <Box
            key={translation._id}
            height={1}
            margin={1}
            position={"relative"}
          >
            <Card elevation={10}>
              <Box position={"absolute"} top={5} right={5}>
                <IconButton
                  onClick={() =>
                    userDispatch(deleteTranslation(translation._id))
                  }
                  aria-label="delete"
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
              <CardContent>
                <Stack spacing={1} paddingBottom={1}>
                  <Typography>{languages[srcLangCode].endonym}</Typography>

                  <Stack direction={"row"}>
                    <img
                      loading="lazy"
                      width="50"
                      src={`https://flagcdn.com/${srcCountryCode.toLowerCase()}.svg`}
                      alt={""}
                    />
                  </Stack>

                  <Typography>
                    {`
                      ${languages[srcLangCode].exonyms.en || "English"} •
                      ${countries[srcCountryCode]}
                    `}
                  </Typography>
                  <Typography>{translation.sourceText}</Typography>
                </Stack>
                <Divider variant="middle" />
                <Stack spacing={1} alignItems={"flex-end"} paddingTop={1}>
                  <Typography>{languages[trgLangCode].endonym}</Typography>
                  <img
                    loading="lazy"
                    width="50"
                    src={`https://flagcdn.com/${trgCountryCode.toLowerCase()}.svg`}
                    alt={""}
                  />
                  <Typography>
                    {`
                      ${languages[trgLangCode].exonyms.en || "English"} •
                      ${countries[trgCountryCode]}
                    `}
                  </Typography>
                  <Typography>{translation.targetText}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        );
      })}
    </Stack>
  );
};
export default Record;
