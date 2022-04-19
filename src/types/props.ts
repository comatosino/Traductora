import { Page } from './app';
import { TextToSpeechVoiceArray } from '../hooks/useTextToSpeech/types';

export type HeaderProps = {
  handleLogout: () => void;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
};

export type FooterProps = {
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
};

export type LangDialogProps = {
  name: string;
  type: string;
  open: boolean;
  voices: TextToSpeechVoiceArray;
  handleClose: (name: string, type: string, value: string) => void;
};
