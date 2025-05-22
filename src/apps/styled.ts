import styled from "@emotion/styled";
import { appColor } from "../definitions/colors";

export const Title = styled.h1`
  margin: 0;
  text-align: center;
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
  &:hover {
    background-color: ${appColor.highlightOptionTitleBase};
  }
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
