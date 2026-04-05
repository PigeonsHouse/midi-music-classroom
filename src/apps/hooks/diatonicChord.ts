import { useCallback, useMemo } from "react";
import { DiatonicChordButtonData } from "../../components/DiatonicChordButtons";
import {
  CircleOfFifthsParts,
  keyLabel,
  ScaleType,
} from "../../definitions/keyLabel";

export const useDiatonicChord = (
  scale: ScaleType,
  transposeScale: number,
  updatePushingKeyNumbers: (newNoteNumber: number, isOn: boolean) => void,
): DiatonicChordButtonData[] => {
  const pushAndReleaseChord = useCallback(
    (rootNoteNumber: number, type: "major" | "minor") => {
      const pushAndReleaseAbsoluteKey = (noteNumber: number) => {
        const transposeNoteNumber = noteNumber - transposeScale;
        updatePushingKeyNumbers(transposeNoteNumber, true);
        setTimeout(
          () => updatePushingKeyNumbers(transposeNoteNumber, false),
          100,
        );
      };

      pushAndReleaseAbsoluteKey(rootNoteNumber);
      pushAndReleaseAbsoluteKey(rootNoteNumber + (type === "major" ? 4 : 3));
      pushAndReleaseAbsoluteKey(rootNoteNumber + 7);
    },
    [updatePushingKeyNumbers],
  );

  const scaleIndex = useMemo(
    () => CircleOfFifthsParts.findIndex((v) => v.majorScaleType === scale),
    [scale],
  );

  const rootNoteNumber = useMemo(
    () =>
      ((keyLabel.american.findIndex((label) => label === scale) + 6) % 12) + 42,
    [scale],
  );

  return [
    {
      label: CircleOfFifthsParts[scaleIndex].majorLabel,
      onClick: () => pushAndReleaseChord(rootNoteNumber, "major"),
    },
    {
      label: CircleOfFifthsParts[(scaleIndex + 11) % 12].minorLabel,
      onClick: () => pushAndReleaseChord(rootNoteNumber + 2, "minor"),
    },
    {
      label: CircleOfFifthsParts[(scaleIndex + 1) % 12].minorLabel,
      onClick: () => pushAndReleaseChord(rootNoteNumber + 4, "minor"),
    },
    {
      label: CircleOfFifthsParts[(scaleIndex + 11) % 12].majorLabel,
      onClick: () => pushAndReleaseChord(rootNoteNumber + 5, "major"),
    },
    {
      label: CircleOfFifthsParts[(scaleIndex + 1) % 12].majorLabel,
      onClick: () => pushAndReleaseChord(rootNoteNumber + 7, "major"),
    },
    {
      label: CircleOfFifthsParts[scaleIndex].minorLabel,
      onClick: () => pushAndReleaseChord(rootNoteNumber + 9, "minor"),
    },
  ];
};
