import { useCallback } from "react";

type HideInversionProps = {
  isHideInversion: boolean;
  setIsHideInversion: (isHide: boolean) => void;
};

export const HideInversion: React.FC<HideInversionProps> = ({
  isHideInversion,
  setIsHideInversion,
}) => {
  const onSwitchHideFraction = useCallback(
    (ev: React.ChangeEvent) => {
      setIsHideInversion((ev.currentTarget as HTMLInputElement).checked);
    },
    [setIsHideInversion],
  );

  return (
    <div>
      <input
        type="checkbox"
        checked={isHideInversion}
        onChange={onSwitchHideFraction}
      />
      <label>転回形の分数表記を省略する</label>
    </div>
  );
};
