import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { pianoColor, rulerColor } from "../../definitions/colors";

const pianoWidth = 16;
const pianoHeight = 160;
const borderWidth = 3;
const rulerHeight = 20;

export const KeyboardRoot = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${rulerHeight}px;
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
    color: ${pianoColor.pushedLabel};
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

export const BlackKey = styled.div`
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
    color: ${pianoColor.pushedLabel};
  }
`;

export const absoluteKeyPosition = (index: number) => css`
  left: ${pianoWidth * index}px;
`;

export const Ruler = styled.div`
  box-sizing: border-box;
  position: absolute;
  color: ${rulerColor.label};
  background-color: ${rulerColor.nonDiatonic};
  top: ${-rulerHeight * 0.4}px;
  height: ${rulerHeight * 0.4}px;
  width: ${pianoWidth}px;
  border-left: 1px solid ${rulerColor.outline};
  &.pushed {
    background-color: ${rulerColor.pushedNonDiatonic};
  }
  &.root {
    top: ${-rulerHeight}px;
    height: ${rulerHeight}px;
    background-color: ${rulerColor.root};
    text-align: center;
    &.pushed {
      background-color: ${rulerColor.pushedRoot};
    }
  }
  &.diatonic {
    top: ${-rulerHeight * 0.8}px;
    height: ${rulerHeight * 0.8}px;
    background-color: ${rulerColor.diatonic};
    &.pushed {
      background-color: ${rulerColor.pushedDiatonic};
    }
  }
`;

// export const DoBlackKey = styled.div`
//   ${BlackKeyStyle}
//   left: ${pianoWidth}px;
// `;

// export const ReBlackKey = styled.div`
//   ${BlackKeyStyle}
//   left: ${pianoWidth * 3}px;
// `;

// export const FaBlackKey = styled.div`
//   ${BlackKeyStyle}
//   left: ${pianoWidth * 6}px;
// `;

// export const SoBlackKey = styled.div`
//   ${BlackKeyStyle}
//   left: ${pianoWidth * 8}px;
// `;

// export const LaBlackKey = styled.div`
//   ${BlackKeyStyle}
//   left: ${pianoWidth * 10}px;
// `;
