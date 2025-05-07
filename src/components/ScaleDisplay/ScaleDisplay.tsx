import { useCallback } from "react";
import { keyLabel, ScaleType } from "../../definitions/keyLabel";

type ScaleDisplayProps = {
  scale: ScaleType | undefined;
  setScale: (scale: ScaleType | undefined) => void;
};

export const ScaleDisplay: React.FC<ScaleDisplayProps> = ({
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
      <select onChange={onSelectScale}>
        <option selected={scale === undefined}>なし</option>
        {keyLabel.american.map((keyScale) => (
          <option key={keyScale} value={keyScale} selected={scale === keyScale}>
            {keyScale}
          </option>
        ))}
      </select>
    </div>
  );
};
