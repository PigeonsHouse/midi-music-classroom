import { useMemo } from "react";
import { keyLabel, ScaleType } from "../../definitions/keyLabel";
import { useLocalStorage } from "../../utils/localStorage";

export const useScale = () => {
  // スケール表示関連
  const [scaleRaw, setScale] = useLocalStorage<ScaleType | undefined>(
    "scaleDisplay",
    undefined,
  );
  // トランスポーズ関連
  const [transposeScale, setTransposeScale] = useLocalStorage<number>(
    "transposeScale",
    0,
  );
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
