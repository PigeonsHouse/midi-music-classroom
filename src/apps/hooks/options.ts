import { type LabelType } from "../../definitions/keyLabel";
import { useLocalStorage } from "../../utils/localStorage";

export const useOptions = () => {
  // キーに表示するラベル関連
  const [keyLabelType, setKeyLabelType] = useLocalStorage<
    LabelType | undefined
  >("keyLabelType", undefined);
  // ピアノを折りたたむか
  const [isSingleOctave, setIsSingleOctave] = useLocalStorage<boolean>(
    "isSingleOctave",
    false,
  );
  // 転回形の分数表記を省略するか
  const [isHideInversion, setIsHideInversion] = useLocalStorage<boolean>(
    "isHideInversion",
    false,
  );

  return {
    keyLabelType,
    setKeyLabelType,
    isSingleOctave,
    setIsSingleOctave,
    isHideInversion,
    setIsHideInversion,
  };
};
