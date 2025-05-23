import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { pianoColor, rulerColor } from "../../definitions/colors";

const pianoWidth = 16;
const bigPianoWidth = 28;
const pianoHeight = 160;
const bigPianoHeight = 200;
const borderWidth = 3;
const rulerHeight = 20;

export const KeyboardRoot = styled.div`
  display: flex;
  padding-top: ${rulerHeight}px;
  margin-bottom: 12px;
`;

export const KeyboardOctaveRoot = styled.div<{ isBigKey: boolean }>`
  position: relative;
  height: ${(props) => (props.isBigKey ? bigPianoHeight : pianoHeight)}px;
  display: flex;
  width: ${(props) => (props.isBigKey ? bigPianoWidth : pianoWidth) * 12}px;
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

export const ThreeWhiteKey = styled.div<{ isBigKey: boolean }>`
  ${WhiteKeyStyle}
  width: ${(props) => ((props.isBigKey ? bigPianoWidth : pianoWidth) * 5) / 3}px;
`;

export const FourWhiteKey = styled.div<{ isBigKey: boolean }>`
  ${WhiteKeyStyle}
  width: ${(props) => ((props.isBigKey ? bigPianoWidth : pianoWidth) * 7) / 4}px;
`;

export const BlackKey = styled.div<{ isBigKey: boolean }>`
  height: 64%;
  background-color: ${pianoColor.blackKey};
  color: ${pianoColor.whiteKey};
  box-sizing: border-box;
  border: ${borderWidth}px solid ${pianoColor.blackKey};
  position: absolute;
  top: 0;
  width: ${(props) => (props.isBigKey ? bigPianoWidth : pianoWidth)}px;
  display: flex;
  justify-content:  center;
  align-items: end;
  &.pushed {
    background-color: ${pianoColor.pushedKey};
    color: ${pianoColor.pushedLabel};
  }
`;

export const absoluteKeyPosition = (index: number, isBigKey: boolean) => css`
  left: ${(isBigKey ? bigPianoWidth : pianoWidth) * index}px;
`;

export const Ruler = styled.div<{ isBigKey: boolean }>`
  box-sizing: border-box;
  position: absolute;
  color: ${rulerColor.label};
  background-color: ${rulerColor.nonDiatonic};
  top: ${-rulerHeight * 0.4}px;
  height: ${rulerHeight * 0.4}px;
  width: ${(props) => (props.isBigKey ? bigPianoWidth : pianoWidth)}px;
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
