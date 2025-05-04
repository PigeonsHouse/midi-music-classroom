import { useCallback } from "react";
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
};

const Piano: React.FC<PianoProps> = ({ isSingleOctove, labelType }) => {
  const label =
    labelType === "italian"
      ? italianKeyLabel
      : labelType === "american"
        ? americanKeyLabel
        : [];

  const octoveElement = useCallback(
    () => (
      <>
        <KeyboardOctaveRoot>
          <ThreeWhiteKey>{label[0]}</ThreeWhiteKey>
          <DoBlackKey>{label[1]}</DoBlackKey>
          <ThreeWhiteKey>{label[2]}</ThreeWhiteKey>
          <ReBlackKey>{label[3]}</ReBlackKey>
          <ThreeWhiteKey>{label[4]}</ThreeWhiteKey>
          <FourWhiteKey>{label[5]}</FourWhiteKey>
          <FaBlackKey>{label[6]}</FaBlackKey>
          <FourWhiteKey>{label[7]}</FourWhiteKey>
          <SoBlackKey>{label[8]}</SoBlackKey>
          <FourWhiteKey>{label[9]}</FourWhiteKey>
          <LaBlackKey>{label[10]}</LaBlackKey>
          <FourWhiteKey>{label[11]}</FourWhiteKey>
        </KeyboardOctaveRoot>
      </>
    ),
    [label],
  );

  return (
    <KeyboardRoot>
      {isSingleOctove ? (
        octoveElement()
      ) : (
        <>
          {octoveElement()}
          {octoveElement()}
          {octoveElement()}
          {octoveElement()}
          {octoveElement()}
          {octoveElement()}
        </>
      )}
    </KeyboardRoot>
  );
};

export default Piano;
