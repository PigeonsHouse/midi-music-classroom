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
  isSingleOctave: boolean;
  labelType?: LabelType;
  pushingKeyNumbers: number[];
  scale?: ScaleType;
};

export const Piano: React.FC<PianoProps> = ({
  isSingleOctave,
  labelType,
  pushingKeyNumbers,
  scale,
}) => {
  const scaleOffset = scale ? keyLabel.american.indexOf(scale) : undefined;
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
      const octaveOffset = nth === undefined ? 0 : (nth + 2) * 12;
      return (
        <>
          <KeyboardOctaveRoot>
            {octaveMaterial.map((KeyElement, index) => {
              const keyClassName = cx(
                KeyElement === BlackKey
                  ? absoluteKeyPosition(index)
                  : undefined,
                isPushed(octaveOffset + index),
              );
              const rulerType = getRulerType(index);
              const rulerClassName = cx(
                absoluteKeyPosition(index),
                rulerType,
                isPushed(octaveOffset + index),
              );
              const rulerLabel = rulerType === "root" ? "R" : undefined;
              return (
                <Fragment key={index}>
                  <KeyElement className={keyClassName}>
                    {label[index]}
                  </KeyElement>
                  {scale && (
                    <Ruler className={rulerClassName}>{rulerLabel}</Ruler>
                  )}
                </Fragment>
              );
            })}
          </KeyboardOctaveRoot>
        </>
      );
    },
    [getRulerType, isPushed, label, octaveMaterial, scale],
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
