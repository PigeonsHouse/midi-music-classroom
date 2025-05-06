import { useMemo } from "react";
import { ScaleType, keyLabel } from "../../definitions/keyLabel";
import { getChords, getDegree } from "../../utils/notes";
import { ChordLabel, Container, InnerContainer } from "./styled";

type ChordInfoProps = {
  pushingKeyNumbers: number[];
  isHideInversion: boolean;
  scale?: ScaleType;
};

export const ChordInfo: React.FC<ChordInfoProps> = ({
  pushingKeyNumbers,
  isHideInversion,
  scale,
}) => {
  const chordInfos = useMemo(() => {
    return getChords(pushingKeyNumbers, isHideInversion);
  }, [pushingKeyNumbers, isHideInversion]);

  const degrees = useMemo(() => {
    if (scale === undefined) return undefined;
    const scaleOffset = keyLabel.american.indexOf(scale);
    return scaleOffset !== -1 ? getDegree(chordInfos, scaleOffset) : undefined;
  }, [chordInfos, scale]);

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
              <div key={baseLabel}>
                {baseLabel}
                {fractionLabel}
              </div>
            );
          })}
        </ChordLabel>
      </InnerContainer>
      {degrees !== undefined && (
        <InnerContainer>
          ディグリー名
          <ChordLabel>
            {degrees.map(({ degreeLabel, type, chordFunction }) => {
              return (
                <div key={degreeLabel} className={chordFunction}>
                  {degreeLabel}
                  {type}
                </div>
              );
            })}
          </ChordLabel>
        </InnerContainer>
      )}
    </Container>
  );
};
