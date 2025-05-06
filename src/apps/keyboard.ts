import { useCallback, useEffect } from "react";

type KeyNoteMap = {
  [key: string]: number;
};

const keyNoteMap: KeyNoteMap = {
  KeyA: 44,
  KeyZ: 45,
  KeyS: 46,
  KeyX: 47,
  KeyC: 48,
  KeyF: 49,
  KeyV: 50,
  KeyG: 51,
  KeyB: 52,
  KeyN: 53,
  KeyJ: 54,
  KeyM: 55,
  KeyK: 56,
  Comma: 57,
  KeyL: 58,
  Period: 59,
  Slash: 60,
  Quote: 61,
  IntlRo: 62,
  Backslash: 63,

  Digit1: 56,
  KeyQ: 57,
  Digit2: 58,
  KeyW: 59,
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
  Minus: 73,
  BracketLeft: 74,
  Equal: 75,
  BracketRight: 76,
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
