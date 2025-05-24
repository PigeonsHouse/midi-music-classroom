import styled from "@emotion/styled";
import { scrollBarColor } from "../../definitions/colors";
import { css } from "@emotion/css";

export const ScrollBarContainer = styled.div`
  width: 100%;
  background-color: ${scrollBarColor.background};
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const ScrollBarButton = styled.button`
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${scrollBarColor.buttonText};
  background-color: ${scrollBarColor.button};
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${scrollBarColor.buttonHover};
  }
`;

export const ScrollBarSliderStyle = css`
  && {
  margin: 0 16px;
  }
`;
