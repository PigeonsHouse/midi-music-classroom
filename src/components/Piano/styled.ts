import styled from "@emotion/styled";
import { pianoColor } from "../../definitions/colors";

const pianoWidth = 16;
const pianoHeight = 160;
const borderWidth = 3;

export const KeyboardRoot = styled.div`
  display: flex;
  justify-content: center;
`;

export const KeyboardOctaveRoot = styled.div`
  position: relative;
  height: ${pianoHeight}px;
  display: flex;
  width: ${pianoWidth * 12}px;
  font-size: 12px;
  &:last-child {
    border-right: ${borderWidth}px solid ${pianoColor.blackKey};
  }
`;

const WhiteKeyStyle = `
  background-color: ${pianoColor.whiteKey};
  color: ${pianoColor.blackKey};
  border: ${borderWidth}px solid ${pianoColor.blackKey};
  border-right: none;
  display: flex;
  justify-content:  center;
  align-items: end;
  &.pushed {
    background-color: ${pianoColor.pushedKey};
  }
`;

export const ThreeWhiteKey = styled.div`
  ${WhiteKeyStyle}
  width: ${(pianoWidth * 5) / 3}px;
`;

export const FourWhiteKey = styled.div`
  ${WhiteKeyStyle}
  width: ${(pianoWidth * 7) / 4}px;
`;

const BlackKeyStyle = `
  height: 64%;
  background-color: ${pianoColor.blackKey};
  color: ${pianoColor.whiteKey};
  box-sizing: border-box;
  border: ${borderWidth}px solid ${pianoColor.blackKey};
  position: absolute;
  top: 0;
  width: ${pianoWidth}px;
  display: flex;
  justify-content:  center;
  align-items: end;
  &.pushed {
    background-color: ${pianoColor.pushedKey};
  }
`;

export const DoBlackKey = styled.div`
  ${BlackKeyStyle}
  left: ${pianoWidth}px;
`;

export const ReBlackKey = styled.div`
  ${BlackKeyStyle}
  left: ${pianoWidth * 3}px;
`;

export const FaBlackKey = styled.div`
  ${BlackKeyStyle}
  left: ${pianoWidth * 6}px;
`;

export const SoBlackKey = styled.div`
  ${BlackKeyStyle}
  left: ${pianoWidth * 8}px;
`;

export const LaBlackKey = styled.div`
  ${BlackKeyStyle}
  left: ${pianoWidth * 10}px;
`;
