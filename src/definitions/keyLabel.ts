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
export type ScaleType = (typeof keyLabel.american)[number];

export const chordType = {
  Major: "",
  Minor: "m",
  MinorFlatFive: "m(♭5)",
  SusTwo: "sus2",
  SusFour: "sus4",
  Augment: "aug",
  MajorSeventh: "M7",
  MinorSeventh: "m7",
  Seventh: "7",
  MinorMajorSeventh: "mM7",
  MinorSeventhFlatFive: "m7(♭5)",
  DiminishedSeventh: "dim7",
} as const;

export type ChordType = (typeof chordType)[keyof typeof chordType];

export const chordLabels: { name: ChordType; intervals: number[] }[] = [
  // 三和音
  { name: chordType.Major, intervals: [0, 4, 7] },
  { name: chordType.Minor, intervals: [0, 3, 7] },
  { name: chordType.MinorFlatFive, intervals: [0, 3, 6] },
  { name: chordType.SusTwo, intervals: [0, 2, 7] },
  { name: chordType.SusFour, intervals: [0, 5, 7] },
  { name: chordType.Augment, intervals: [0, 4, 8] },

  // 四和音
  { name: chordType.MajorSeventh, intervals: [0, 4, 7, 11] },
  { name: chordType.MinorSeventh, intervals: [0, 3, 7, 10] },
  { name: chordType.Seventh, intervals: [0, 4, 7, 10] },
  { name: chordType.MinorMajorSeventh, intervals: [0, 3, 7, 11] },
  { name: chordType.MinorSeventhFlatFive, intervals: [0, 3, 6, 10] },
  { name: chordType.DiminishedSeventh, intervals: [0, 3, 6, 9] },
];
