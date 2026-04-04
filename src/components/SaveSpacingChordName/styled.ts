import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const NamePart = styled.span<{ isSmall: boolean; fontSize: number }>`
  font-size: ${(props) =>
    props.isSmall ? props.fontSize * 0.6 : props.fontSize}px;
  margin: ${(props) => (props.isSmall ? props.fontSize * -0.125 : undefined)}px;
  margin-bottom: ${(props) =>
    props.isSmall ? props.fontSize * 0.125 : undefined}px;
`;
