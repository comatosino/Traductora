import { useMemo } from "react";
import { Speaker } from "./useTextToSpeech/types";

const useLangTags = (speaker: Speaker): { langTags: string[] } => {
  const langTags = useMemo<string[]>(() => {
    const voices = speaker.getVoiceArray();
    if (voices.length) {
      const tags = voices.map((voice) => voice.lang);
      return [...new Set(tags)];
    }
    return [];
  }, []);

  return { langTags };
};

export default useLangTags;
