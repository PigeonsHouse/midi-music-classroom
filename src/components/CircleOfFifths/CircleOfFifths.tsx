import React, { useMemo } from "react";
import { CircleOfFifthsParts, ScaleType } from "../../definitions/keyLabel";
import { SaveSpacingChordName } from "../SaveSpacingChordName";
import {
  CircleRoot,
  Container,
  MajorMarker,
  MajorPart,
  MinorMarker,
  MinorPart,
  OddBackground,
  Title,
} from "./styled";

type CircleOfFifthsProps = {
  scale?: ScaleType;
  setScale: (scale: ScaleType) => void;
};

export const CircleOfFifths: React.FC<CircleOfFifthsProps> = ({
  scale,
  setScale,
}) => {
  const isDisplayMarker = useMemo(() => scale !== undefined, [scale]);
  const scaleIndex = useMemo(
    () => CircleOfFifthsParts.findIndex((v) => v.majorScaleType === scale),
    [scale],
  );

  return (
    <Container>
      <Title>五度圏</Title>
      <CircleRoot>
        <MajorMarker rotateIndex={scaleIndex} isDisplay={isDisplayMarker} />
        <MinorMarker rotateIndex={scaleIndex} isDisplay={isDisplayMarker} />
        <OddBackground />
        {CircleOfFifthsParts.map((item, index) => (
          <React.Fragment key={item.majorScaleType}>
            <MajorPart
              index={index}
              onClick={() => setScale(item.majorScaleType)}
            >
              <SaveSpacingChordName fontSize={32}>
                {item.majorLabel}
              </SaveSpacingChordName>
            </MajorPart>
            <MinorPart
              index={index}
              onClick={() => setScale(item.majorScaleType)}
            >
              <SaveSpacingChordName fontSize={20}>
                {item.minorLabel}
              </SaveSpacingChordName>
            </MinorPart>
          </React.Fragment>
        ))}
      </CircleRoot>
    </Container>
  );
};
