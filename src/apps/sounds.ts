const AudioList: HTMLAudioElement[] = [];

for (let i = 24; i < 96; i++) {
  AudioList[i] = new Audio(`/notes/${i}.wav`);
}

export const setBeepVolume = (volume: number) => {
  for (let i = 24; i < 96; i++) {
    AudioList[i].volume = volume;
  }
};

export const beepNote = (noteNumber: number) => {
  if (AudioList[noteNumber] === undefined) return;
  AudioList[noteNumber].currentTime = 0;
  AudioList[noteNumber].play();
};
