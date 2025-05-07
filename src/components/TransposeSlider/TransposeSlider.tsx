import { useCallback } from "react";
import { keyLabel } from "../../definitions/keyLabel";

type TransposeSliderProps = {
  transposeScale: number;
  setTransposeScale: (scale: number) => void;
};

export const TransposeSlider: React.FC<TransposeSliderProps> = ({
  transposeScale,
  setTransposeScale,
}) => {
  const onSlideTranspose = useCallback(
    (ev: React.ChangeEvent) => {
      const volume = Number((ev.target as HTMLInputElement).value);
      setTransposeScale(volume);
    },
    [setTransposeScale],
  );

  return (
    <div>
      <label>トランスポーズ</label>
      <input
        type="range"
        value={transposeScale}
        onChange={onSlideTranspose}
        min="-6"
        max="6"
        step="1"
      />
      <div>
        <label>キー：{keyLabel.american[(12 + transposeScale) % 12]}</label>
      </div>
      {transposeScale !== 0 && (
        <div>
          <small>※下のキーボードの光る位置もトランスポーズします。</small>
        </div>
      )}
    </div>
  );
};
