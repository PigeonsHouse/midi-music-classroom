import { useMemo } from "react";
import { getChords } from "../../utils/notes";
import { ChordLabel, Container } from "./styled";

type ChordInfoProps = {
  pushingKeyNumbers: number[];
  isHideInversion: boolean;
};

export const ChordInfo: React.FC<ChordInfoProps> = ({
  pushingKeyNumbers,
  isHideInversion,
}) => {
  const chordNames = useMemo(() => {
    return getChords(pushingKeyNumbers, isHideInversion);
  }, [pushingKeyNumbers, isHideInversion]);

  return (
    <Container>
      コード名
      <ChordLabel>
        {chordNames.map((name) => (
          <span key={name}>{name} </span>
        ))}
      </ChordLabel>
    </Container>
  );
};
