import { useCallback, useState } from "react";
import { beepNote } from "./sounds";

export const usePushingKeys = (transposeScale: number) => {
  const [pushingKeyNumbers, setPushingKeyNumbers] = useState<number[]>([]);
  const updatePushingKeyNumbers = useCallback(
    (newNoteNumber: number, isOn: boolean) => {
      newNoteNumber += transposeScale;
      const numberUpdateCallback = isOn
        ? (pushedKeyNumbers: number[]) => {
            const isExist = pushingKeyNumbers.includes(newNoteNumber);
            if (isExist) {
              return pushedKeyNumbers;
            } else {
              beepNote(newNoteNumber);
              return pushedKeyNumbers.concat(newNoteNumber);
            }
          }
        : (pushedKeyNumbers: number[]) => {
            const index = pushedKeyNumbers.indexOf(newNoteNumber);
            return index === -1
              ? pushedKeyNumbers
              : pushedKeyNumbers.toSpliced(index, 1);
          };
      setPushingKeyNumbers(numberUpdateCallback);
    },
    [pushingKeyNumbers, transposeScale],
  );

  return {
    pushingKeyNumbers,
    updatePushingKeyNumbers,
  };
};
