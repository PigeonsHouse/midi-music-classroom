import styled from "@emotion/styled";
import { chordColor } from "../../definitions/colors";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
`;

export const InnerContainer = styled.div`
  min-width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
