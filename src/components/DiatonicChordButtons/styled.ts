import styled from "@emotion/styled";
import { appColor } from "../../definitions/colors";

export const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
`;

export const ButtonRowContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const Button = styled.button`
  width: 120px;
  height: 80px;
  padding: 0;
  border: none;
  background-color: ${appColor.option};
  border-radius: 8px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;
