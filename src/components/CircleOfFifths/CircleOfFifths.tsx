import React, { useMemo } from "react";
import { ScaleType } from "../../definitions/keyLabel";
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

const CircleOfFifthsParts: {
  majorLabel: string;
  minorLabel: string;
  majorScaleType: ScaleType;
}[] = [
  {
    majorLabel: "C",
    minorLabel: "Am",
    majorScaleType: "C",
  },
  {
    majorLabel: "G",
    minorLabel: "Em",
    majorScaleType: "G",
  },
  {
    majorLabel: "D",
    minorLabel: "Bm",
    majorScaleType: "D",
  },
  {
    majorLabel: "A",
    minorLabel: "F♯m",
    majorScaleType: "A",
  },
  {
    majorLabel: "E",
    minorLabel: "C♯m",
    majorScaleType: "E",
  },
  {
    majorLabel: "B",
    minorLabel: "G♯m",
    majorScaleType: "B",
  },
  {
    majorLabel: "F♯",
    minorLabel: "D♯m",
    majorScaleType: "F♯",
  },
  {
    majorLabel: "D♭",
    minorLabel: "B♭m",
    majorScaleType: "C♯",
  },
  {
    majorLabel: "A♭",
    minorLabel: "Fm",
    majorScaleType: "G♯",
  },
  {
    majorLabel: "E♭",
    minorLabel: "Cm",
    majorScaleType: "D♯",
  },
  {
    majorLabel: "B♭",
    minorLabel: "Gm",
    majorScaleType: "A♯",
  },
  {
    majorLabel: "F",
    minorLabel: "Dm",
    majorScaleType: "F",
  },
] as const;

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
