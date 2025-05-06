import { useEffect, useState } from "react";

const AudioList: HTMLAudioElement[] = [];

for (let i = 24; i < 96; i++) {
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
  const [volume, setVolume] = useState(0.5);
  useEffect(() => {
    setBeepVolume(volume);
  }, [volume]);

  return {
    volume,
    setVolume,
  };
};
