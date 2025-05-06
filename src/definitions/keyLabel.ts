export const keyLabel = {
  italian: [
    "ド",
    "ド♯",
    "レ",
    "レ♯",
    "ミ",
    "ファ",
    "ファ♯",
    "ソ",
    "ソ♯",
    "ラ",
    "ラ♯",
    "シ",
  ] as const,
  american: [
    "C",
    "C♯",
    "D",
    "D♯",
    "E",
    "F",
    "F♯",
    "G",
    "G♯",
    "A",
    "A♯",
    "B",
  ] as const,
};

export type LabelType = keyof typeof keyLabel;

export const chordLabels = [
  // 三和音
  { name: "", intervals: [0, 4, 7] },
  { name: "m", intervals: [0, 3, 7] },
  { name: "m(♭5)", intervals: [0, 3, 6] },
  { name: "sus2", intervals: [0, 2, 7] },
  { name: "sus4", intervals: [0, 5, 7] },
  { name: "aug", intervals: [0, 4, 8] },

  // 四和音
  { name: "M7", intervals: [0, 4, 7, 11] },
  { name: "m7", intervals: [0, 3, 7, 10] },
  { name: "7", intervals: [0, 4, 7, 10] },
  { name: "mM7", intervals: [0, 3, 7, 11] },
  { name: "m7(♭5)", intervals: [0, 3, 6, 10] },
  { name: "dim7", intervals: [0, 3, 6, 9] },
];
