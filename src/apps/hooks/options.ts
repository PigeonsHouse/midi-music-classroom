import { useState } from "react";
import type { LabelType, ScaleType } from "../../definitions/keyLabel";

export const useOptions = () => {
  // キーに表示するラベル関連
  const [keyLabelType, setKeyLabelType] = useState<LabelType | undefined>();
  // ピアノを折りたたむか
  const [isSingleOctave, setIsSingleOctave] = useState(false);
  // 転回形の分数表記を省略するか
  const [isHideInversion, setIsHideInversion] = useState(false);
  // スケール表示関連
  const [scale, setScale] = useState<ScaleType | undefined>(undefined);
  // トランスポーズ関連
  const [transposeScale, setTransposeScale] = useState(0);

  return {
    keyLabelType,
    setKeyLabelType,
    isSingleOctave,
    setIsSingleOctave,
    isHideInversion,
    setIsHideInversion,
    scale,
    setScale,
    transposeScale,
    setTransposeScale,
  };
};
