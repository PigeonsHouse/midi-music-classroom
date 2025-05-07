import { useCallback } from "react";
import { keyLabel, ScaleType } from "../../definitions/keyLabel";

type ScaleDisplayProps = {
  disabled: boolean;
  scale: ScaleType | undefined;
  setScale: (scale: ScaleType | undefined) => void;
};

export const ScaleDisplay: React.FC<ScaleDisplayProps> = ({
  disabled,
  scale,
  setScale,
}) => {
  const onSelectScale = useCallback((ev: React.ChangeEvent) => {
    const idx = (ev.currentTarget as HTMLSelectElement).selectedIndex;
    if (idx) {
      setScale(keyLabel.american[idx - 1]);
    } else {
      setScale(undefined);
    }
  }, []);

  return (
    <div>
      <label>メジャースケール表示：</label>
      <select value={scale ?? ""} onChange={onSelectScale} disabled={disabled}>
        <option value="">なし</option>
        {keyLabel.american.map((keyScale) => (
          <option key={keyScale} value={keyScale}>
            {keyScale}
          </option>
        ))}
      </select>
    </div>
  );
};
