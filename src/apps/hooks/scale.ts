import { useMemo, useState } from "react";
import { keyLabel, ScaleType } from "../../definitions/keyLabel";

export const useScale = () => {
  // スケール表示関連
  const [scaleRaw, setScale] = useState<ScaleType | undefined>(undefined);
  // トランスポーズ関連
  const [transposeScale, setTransposeScale] = useState(0);
  const scale = useMemo(() => {
    return transposeScale === 0
      ? scaleRaw
      : keyLabel.american[(12 + transposeScale) % 12];
  }, [transposeScale, scaleRaw]);

  return {
    scale,
    setScale,
    transposeScale,
    setTransposeScale,
  };
};
