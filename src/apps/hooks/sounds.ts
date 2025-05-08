import { useEffect } from "react";
import { useLocalStorage } from "../../utils/localStorage";

const AudioList: HTMLAudioElement[] = [];

for (let i = 24; i < 96; i++) {
  // github pagesでトップページがパス付きになっているので、window.locationをベースに付けている
  // SPAのため、不整合はないはず
  AudioList[i] = new Audio(`${window.location}/notes/${i}.wav`);
}

const setBeepVolume = (volume: number) => {
  for (let i = 24; i < 96; i++) {
    AudioList[i].volume = volume;
  }
};

export const beepNote = (noteNumber: number) => {
  if (AudioList[noteNumber] === undefined) return;
  AudioList[noteNumber].currentTime = 0;
  AudioList[noteNumber].play();
};

export const useSound = () => {
  const [volume, setVolume] = useLocalStorage<number>("volume", 0.5);
  useEffect(() => {
    setBeepVolume(volume);
  }, [volume]);

  return {
    volume,
    setVolume,
  };
};
