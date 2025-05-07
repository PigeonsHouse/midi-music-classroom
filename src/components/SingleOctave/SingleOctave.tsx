import { useCallback } from "react";

type SingleOctave = {
  isSingleOctave: boolean;
  setIsSingleOctave: (isSingleOctave: boolean) => void;
};

export const SingleOctave: React.FC<SingleOctave> = ({
  isSingleOctave,
  setIsSingleOctave,
}) => {
  const onSwitchSingleOctave = useCallback(
    (ev: React.ChangeEvent) => {
      setIsSingleOctave((ev.currentTarget as HTMLInputElement).checked);
    },
    [setIsSingleOctave],
  );

  return (
    <div>
      <input
        type="checkbox"
        checked={isSingleOctave}
        onChange={onSwitchSingleOctave}
      />
      <label>1オクターブに畳む</label>
    </div>
  );
};
