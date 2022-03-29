import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TextToSpeechVoiceArray } from "../hooks/useTextToSpeech/types";

interface LangDialogProps {
  type: string;
  open: boolean;
  voices: TextToSpeechVoiceArray;
  handleClose: (type: string, value: string) => void;
}

const LangDialog: React.FC<LangDialogProps> = (props): JSX.Element => {
  const { type, open, voices, handleClose } = props;

  return (
    <Dialog scroll="paper" open={open} onClose={() => handleClose(type, "")}>
      <DialogTitle>{`Select a ${type} language`}</DialogTitle>
      <DialogContent className="hide-scrollbar">
        <List sx={{ pt: 0 }} subheader={<li />}>
          {voices.map((lang: any) => (
            <li key={lang.code}>
              <ul>
                <ListSubheader sx={{ borderRadius: 1 }}>
                  {`
                      ${lang.endonym} •
                      ${lang.exonyms?.en || "English"}
                  `}
                </ListSubheader>
                {lang.countries.map(
                  (country: {
                    code: string;
                    name_en: string;
                    voices: SpeechSynthesisVoice[];
                  }) => (
                    <ListItemButton
                      key={country.code}
                      onClick={() =>
                        handleClose(type, `${lang.code}-${country.code}`)
                      }
                    >
                      <ListItemIcon>
                        <img
                          src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                          width="30"
                          alt={`${country.name_en}`}
                        />
                      </ListItemIcon>
                      <ListItemText primary={country.name_en} />
                    </ListItemButton>
                  )
                )}
              </ul>
            </li>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default LangDialog;
