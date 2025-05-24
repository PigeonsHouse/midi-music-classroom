import React, { useCallback } from "react";
import { type LabelType } from "../../definitions/keyLabel";
import { useLocalStorage } from "../../utils/localStorage";

export const useOptions = () => {
  // オプションコンテナを開くか
  const [isOpenOption, setIsOpenOption] = useLocalStorage<boolean>(
    "isOpenOptionContainer",
    false,
  );
  const toggleOption = useCallback(
    (e: React.MouseEvent<HTMLDetailsElement>) => {
      e.preventDefault();
      setIsOpenOption(!isOpenOption);
    },
    [isOpenOption, setIsOpenOption],
  );

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
    isOpenOption,
    toggleOption,
    keyLabelType,
    setKeyLabelType,
    isSingleOctave,
    setIsSingleOctave,
    isHideInversion,
    setIsHideInversion,
  };
};
