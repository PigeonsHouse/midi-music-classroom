import styled from "@emotion/styled";
import { appColor } from "../definitions/colors";

export const Title = styled.h1`
  margin: 8px 0;
  text-align: center;
`;

export const OptionContainerScroller = styled.div`
  max-height: 120px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 8px;
`;

export const OptionContainerWrapper = styled.div`
  padding: 0 8px;
`;

export const OptionContainer = styled.details`
  text-align: center;
  background-color: ${appColor.option};
  max-width: 1024px;
  margin: auto;
  margin-bottom: 12px;
  border-radius: 4px;
  overflow: hidden;
`;

export const OptionTitle = styled.summary`
  display: block;
  font-weight: bold;
  background-color: ${appColor.optionTitleBase};
  color: ${appColor.optionTitle};
  @media (hover: hover) {
    &:hover {
      background-color: ${appColor.highlightOptionTitleBase};
    }
  }
  padding: 4px 0;
`;

export const OptionItemContainer = styled.div`
  max-width: 640px;
  margin: auto;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
`;

export const PianoScroller = styled.div`
  overflow-x: auto;
  text-align: center;
`;

export const PianoWrapper = styled.div`
  display: inline-block;
  padding: 0 8px;
`;
