import styled from "@emotion/styled";
import { chordColor, circleOfFifthsColor } from "../../definitions/colors";

const CircleRadius = 360;
const RadiusMajor = CircleRadius * 0.41;
const RadiusMinor = CircleRadius * 0.25;

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 20px;
`;

export const CircleRoot = styled.div`
  position: relative;
  margin-top: 4px;
  width: ${CircleRadius}px;
  height: ${CircleRadius}px;
  background-color: ${circleOfFifthsColor.background};
  border-radius: 9999px;
`;

export const MajorMarker = styled.div<{
  rotateIndex: number;
  isDisplay: boolean;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background: ${(props) =>
    props.isDisplay
      ? `conic-gradient(
    from ${-45 + 30 * props.rotateIndex}deg,
    ${chordColor.subdominant} 0deg 30deg,
    ${chordColor.tonic} 30deg 60deg,
    ${chordColor.dominant} 60deg 90deg,
    transparent 90deg 360deg
  )`
      : undefined};
  mask-image: radial-gradient(circle, transparent 47%, black 47.5%);
`;

export const MinorMarker = styled.div<{
  rotateIndex: number;
  isDisplay: boolean;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 67%;
  height: 67%;
  border-radius: 9999px;
  border: 1px solid ${circleOfFifthsColor.border};
  background: ${(props) =>
    props.isDisplay
      ? `conic-gradient(
    from ${-45 + 30 * props.rotateIndex}deg,
    ${chordColor.subdominant} 0deg 30deg,
    ${chordColor.tonic} 30deg 60deg,
    ${chordColor.tonic} 60deg 90deg,
    transparent 90deg 360deg
  )`
      : undefined};
  mask-image: radial-gradient(circle, transparent 37%, black 37.5%);
`;

export const OddBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  opacity: 0.1;
  background: repeating-conic-gradient(
    from 15deg,
    ${circleOfFifthsColor.oddBackground} 0deg 30deg,
    transparent 30deg 60deg
  );
`;

export const MajorPart = styled.div<{ index: number }>`
  position: absolute;
  font-weight: bold;
  cursor: pointer;
  transform: translate(
    calc(
      ${(props) =>
          CircleRadius / 2 +
          RadiusMajor * Math.sin((props.index / 12) * 2 * Math.PI)}px -
        50%
    ),
    calc(
      ${(props) =>
          CircleRadius / 2 +
          RadiusMajor * -Math.cos((props.index / 12) * 2 * Math.PI)}px -
        50%
    )
  );
`;

export const MinorPart = styled.div<{ index: number }>`
  position: absolute;
  font-weight: bold;
  cursor: pointer;
  transform: translate(
    calc(
      ${(props) =>
          CircleRadius / 2 +
          RadiusMinor * Math.sin((props.index / 12) * 2 * Math.PI)}px -
        50%
    ),
    calc(
      ${(props) =>
          CircleRadius / 2 +
          RadiusMinor * -Math.cos((props.index / 12) * 2 * Math.PI)}px -
        50%
    )
  );
`;
