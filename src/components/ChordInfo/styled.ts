import styled from "@emotion/styled";
import { appColor, chordColor } from "../../definitions/colors";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
`;

export const InnerContainer = styled.div`
  min-width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${appColor.option};
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ChordLabel = styled.div`
  font-size: 80px;
  font-weight: bold;
  & div.tonic {
    color: ${chordColor.tonic};
  }
  & div.subdominant {
    color: ${chordColor.subdominant};
  }
  & div.dominant {
    color: ${chordColor.dominant};
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
`;
