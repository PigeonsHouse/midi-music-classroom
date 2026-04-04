import { useMemo } from "react";
import { ScaleType, keyLabel } from "../../definitions/keyLabel";
import { getChords, getDegree } from "../../utils/notes";
import { ChordLabel, Container, InnerContainer, LabelWrapper } from "./styled";
import { SaveSpacingChordName } from "../SaveSpacingChordName";

type ChordInfoProps = {
  isScaleDisplay: boolean;
  pushingKeyNumbers: number[];
  isHideInversion: boolean;
  scale: ScaleType;
};

export const ChordInfo: React.FC<ChordInfoProps> = ({
  isScaleDisplay,
  pushingKeyNumbers,
  isHideInversion,
  scale,
}) => {
  const chordInfos = useMemo(() => {
    return getChords(pushingKeyNumbers, isHideInversion);
  }, [pushingKeyNumbers, isHideInversion]);

  const degrees = useMemo(() => {
    if (!isScaleDisplay) return undefined;
    const scaleOffset = keyLabel.american.indexOf(scale);
    return scaleOffset !== -1 ? getDegree(chordInfos, scaleOffset) : undefined;
  }, [chordInfos, scale, isScaleDisplay]);

  return (
    <Container>
      <InnerContainer>
        コード名
        <ChordLabel>
          {chordInfos.map(({ key, type, rootKey }) => {
            const baseLabel = `${keyLabel.american[key]}${type}`;
            const fractionLabel =
              rootKey !== undefined ? `/${keyLabel.american[rootKey]}` : "";
            return (
              <LabelWrapper key={baseLabel}>
                <SaveSpacingChordName fontSize={80}>
                  {baseLabel}
                </SaveSpacingChordName>
                {fractionLabel}
              </LabelWrapper>
            );
          })}
        </ChordLabel>
      </InnerContainer>
      {degrees !== undefined && (
        <InnerContainer>
          ディグリー名
          <ChordLabel>
            {degrees.map(({ degreeLabel, type, chordFunction }) => (
              <LabelWrapper key={degreeLabel} className={chordFunction}>
                <SaveSpacingChordName fontSize={80}>
                  {degreeLabel}
                </SaveSpacingChordName>
                <SaveSpacingChordName fontSize={80}>
                  {type}
                </SaveSpacingChordName>
              </LabelWrapper>
            ))}
          </ChordLabel>
        </InnerContainer>
      )}
    </Container>
  );
};
