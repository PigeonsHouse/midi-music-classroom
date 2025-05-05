import { useCallback, useEffect } from "react";

type KeyNoteMap = {
  [key: string]: number;
};

const keyNoteMap: KeyNoteMap = {
  KeyE: 60,
  Digit4: 61,
  KeyR: 62,
  Digit5: 63,
  KeyT: 64,
  KeyY: 65,
  Digit7: 66,
  KeyU: 67,
  Digit8: 68,
  KeyI: 69,
  Digit9: 70,
  KeyO: 71,
  KeyP: 72,
};

export const useKeyboard = (
  updatePushingKeyNumbers: (newNoteNumber: number, isOn: boolean) => void,
) => {
  const keydownCallback = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.shiftKey || ev.ctrlKey || ev.altKey || ev.metaKey) return;
      updatePushingKeyNumbers(keyNoteMap[ev.code], true);
    },
    [updatePushingKeyNumbers],
  );
  const keyupCallback = useCallback(
    (ev: KeyboardEvent) => {
      updatePushingKeyNumbers(keyNoteMap[ev.code], false);
    },
    [updatePushingKeyNumbers],
  );
  useEffect(() => {
    document.addEventListener("keydown", keydownCallback);
    document.addEventListener("keyup", keyupCallback);
    return () => {
      document.removeEventListener("keydown", keydownCallback);
      document.removeEventListener("keyup", keyupCallback);
    };
  }, [keydownCallback, keyupCallback]);
};
