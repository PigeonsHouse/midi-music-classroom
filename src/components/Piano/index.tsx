import { useCallback, useMemo } from "react";
import {
  DoBlackKey,
  FaBlackKey,
  FourWhiteKey,
  KeyboardOctaveRoot,
  KeyboardRoot,
  LaBlackKey,
  ReBlackKey,
  SoBlackKey,
  ThreeWhiteKey,
} from "./styled";
import { americanKeyLabel, italianKeyLabel } from "../../definitions/keyLabel";

type PianoProps = {
  isSingleOctove: boolean;
  labelType?: "italian" | "american";
  pushingKeyNumbers: number[];
};

const Piano: React.FC<PianoProps> = ({
  isSingleOctove,
  labelType,
  pushingKeyNumbers,
}) => {
  const label =
    labelType === "italian"
      ? italianKeyLabel
      : labelType === "american"
        ? americanKeyLabel
        : [];
  const fixedPushingKeyNumbers = useMemo(() => {
    return isSingleOctove
      ? // isSingleOctoveの場合0~11に畳む
        Array.from(new Set(pushingKeyNumbers.map((num) => num % 12)))
      : pushingKeyNumbers;
  }, [isSingleOctove, pushingKeyNumbers]);

  const octoveElement = useCallback(
    (nth?: number) => {
      const offset = nth === undefined ? 0 : (nth + 2) * 12;
      const isPushed = (number: number) =>
        fixedPushingKeyNumbers.includes(number) ? "pushed" : undefined;
      return (
        <>
          <KeyboardOctaveRoot>
            <ThreeWhiteKey className={isPushed(offset)}>
              {label[0]}
            </ThreeWhiteKey>
            <DoBlackKey className={isPushed(offset + 1)}>{label[1]}</DoBlackKey>
            <ThreeWhiteKey className={isPushed(offset + 2)}>
              {label[2]}
            </ThreeWhiteKey>
            <ReBlackKey className={isPushed(offset + 3)}>{label[3]}</ReBlackKey>
            <ThreeWhiteKey className={isPushed(offset + 4)}>
              {label[4]}
            </ThreeWhiteKey>
            <FourWhiteKey className={isPushed(offset + 5)}>
              {label[5]}
            </FourWhiteKey>
            <FaBlackKey className={isPushed(offset + 6)}>{label[6]}</FaBlackKey>
            <FourWhiteKey className={isPushed(offset + 7)}>
              {label[7]}
            </FourWhiteKey>
            <SoBlackKey className={isPushed(offset + 8)}>{label[8]}</SoBlackKey>
            <FourWhiteKey className={isPushed(offset + 9)}>
              {label[9]}
            </FourWhiteKey>
            <LaBlackKey className={isPushed(offset + 10)}>
              {label[10]}
            </LaBlackKey>
            <FourWhiteKey className={isPushed(offset + 11)}>
              {label[11]}
            </FourWhiteKey>
          </KeyboardOctaveRoot>
        </>
      );
    },
    [label, fixedPushingKeyNumbers],
  );

  return (
    <KeyboardRoot>
      {isSingleOctove ? (
        octoveElement()
      ) : (
        <>
          {octoveElement(0)}
          {octoveElement(1)}
          {octoveElement(2)}
          {octoveElement(3)}
          {octoveElement(4)}
          {octoveElement(5)}
        </>
      )}
    </KeyboardRoot>
  );
};

export default Piano;
