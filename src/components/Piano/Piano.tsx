import { cx } from "@emotion/css";
import React, { Fragment, useCallback, useMemo } from "react";
import { LabelType, ScaleType, keyLabel } from "../../definitions/keyLabel";
import { clusteringNotes } from "../../utils/notes";
import {
  BlackKey,
  FourWhiteKey,
  KeyboardOctaveRoot,
  KeyboardRoot,
  Ruler,
  ThreeWhiteKey,
  absoluteKeyPosition,
} from "./styled";

type PianoProps = {
  isBigKey: boolean;
  isScaleDisplay: boolean;
  isSingleOctave: boolean;
  labelType?: LabelType;
  pushingKeyNumbers: number[];
  scale: ScaleType;
  updatePushingKeyNumbers: (keyNumber: number, isOn: boolean) => void;
};

export const Piano: React.FC<PianoProps> = ({
  isBigKey,
  isScaleDisplay,
  isSingleOctave,
  labelType,
  pushingKeyNumbers,
  scale,
  updatePushingKeyNumbers,
}) => {
  const scaleOffset = isScaleDisplay
    ? keyLabel.american.indexOf(scale)
    : undefined;
  const label = useMemo(() => {
    return labelType ? keyLabel[labelType] : [];
  }, [labelType]);
  const fixedPushingKeyNumbers = useMemo(() => {
    return isSingleOctave
      ? // isSingleOctaveの場合0~11に畳む
        clusteringNotes(pushingKeyNumbers)
      : pushingKeyNumbers;
  }, [isSingleOctave, pushingKeyNumbers]);
  const octaveMaterial = useMemo(
    () => [
      ThreeWhiteKey,
      BlackKey,
      ThreeWhiteKey,
      BlackKey,
      ThreeWhiteKey,
      FourWhiteKey,
      BlackKey,
      FourWhiteKey,
      BlackKey,
      FourWhiteKey,
      BlackKey,
      FourWhiteKey,
    ],
    [],
  );

  const getRulerType = useCallback(
    (index: number) => {
      if (scaleOffset === undefined) return undefined;
      const degree = (12 + index - scaleOffset) % 12;
      if (degree === 0) return "root";
      if ([2, 4, 5, 7, 9, 11].includes(degree)) return "diatonic";
      return undefined;
    },
    [scaleOffset],
  );
  const isPushed = useCallback(
    (number: number) =>
      fixedPushingKeyNumbers.includes(number) ? "pushed" : undefined,
    [fixedPushingKeyNumbers],
  );
  const octaveElement = useCallback(
    (nth?: number) => {
      const isSingle = nth === undefined;
      const octaveOffset = (isSingle ? 5 : nth + 2) * 12;
      return (
        <KeyboardOctaveRoot isBigKey={isBigKey}>
          {octaveMaterial.map((KeyElement, index) => {
            const keyClassName = cx(
              KeyElement === BlackKey
                ? absoluteKeyPosition(index, isBigKey)
                : undefined,
              isPushed(isSingle ? index : octaveOffset + index),
            );
            const rulerType = getRulerType(index);
            const rulerClassName = cx(
              absoluteKeyPosition(index, isBigKey),
              rulerType,
              isPushed(isSingle ? index : octaveOffset + index),
            );
            const rulerLabel = rulerType === "root" ? "R" : undefined;
            const pushKey = () =>
              updatePushingKeyNumbers(octaveOffset + index, true);
            const releaseKey = () =>
              updatePushingKeyNumbers(octaveOffset + index, false);
            const touchMove = (e: React.TouchEvent) => {
              e.preventDefault();
              const touch = e.touches[0];
              const target = document.elementFromPoint(
                touch.clientX,
                touch.clientY,
              );
              if (target && target.classList.contains("key")) {
                pushKey();
              }
            };

            return (
              <Fragment key={index}>
                <KeyElement
                  className={keyClassName}
                  isBigKey={isBigKey}
                  onMouseDown={pushKey}
                  onMouseUp={releaseKey}
                  onMouseLeave={releaseKey}
                  onTouchStart={pushKey}
                  onTouchEnd={releaseKey}
                  onTouchMove={touchMove}
                >
                  {label[index]}
                </KeyElement>
                {isScaleDisplay && (
                  <Ruler className={rulerClassName} isBigKey={isBigKey}>
                    {rulerLabel}
                  </Ruler>
                )}
              </Fragment>
            );
          })}
        </KeyboardOctaveRoot>
      );
    },
    [
      getRulerType,
      isPushed,
      label,
      octaveMaterial,
      scale,
      isScaleDisplay,
      isBigKey,
      fixedPushingKeyNumbers,
      updatePushingKeyNumbers,
    ],
  );

  return (
    <KeyboardRoot>
      {isSingleOctave ? (
        octaveElement()
      ) : (
        <>
          {octaveElement(0)}
          {octaveElement(1)}
          {octaveElement(2)}
          {octaveElement(3)}
          {octaveElement(4)}
          {octaveElement(5)}
        </>
      )}
    </KeyboardRoot>
  );
};
