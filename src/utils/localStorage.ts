import { useCallback, useEffect, useState } from "react";

type AllowType = string | number | boolean | undefined;

export const useLocalStorage = <T extends AllowType>(
  keyLabel: string,
  initialValue: T,
): [T, (v: T) => void] => {
  const [state, innerSetState] = useState<T>(initialValue);

  const setState = useCallback(
    (value: T) => {
      innerSetState(value);
      localStorage.setItem(keyLabel, String(value));
    },
    [keyLabel, innerSetState],
  );

  useEffect(() => {
    const value = localStorage.getItem(keyLabel);
    if (value === null) return;
    if (value === "undefined") {
      innerSetState(undefined as T);
    } else if (value === "true" || value === "false") {
      innerSetState((value === "true") as T);
    } else if (!isNaN(Number(value))) {
      innerSetState(Number(value) as T);
    } else {
      innerSetState(value as T);
    }
  }, [keyLabel, initialValue, innerSetState]);

  return [state, setState];
};
