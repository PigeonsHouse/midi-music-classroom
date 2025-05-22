import { useCallback } from "react";
import Switch from "@mui/material/Switch";
import { Container, Label, SelectorContainer } from "../OptionCommon";

type HideInversionProps = {
  isHideInversion: boolean;
  setIsHideInversion: (isHide: boolean) => void;
};

export const HideInversion: React.FC<HideInversionProps> = ({
  isHideInversion,
  setIsHideInversion,
}) => {
  const onSwitchHideFraction = useCallback(
    (ev: React.ChangeEvent) => {
      setIsHideInversion((ev.currentTarget as HTMLInputElement).checked);
    },
    [setIsHideInversion],
  );

  return (
    <Container>
      <Label>転回形の分数表記を省略する</Label>
      <SelectorContainer>
        <Switch checked={isHideInversion} onChange={onSwitchHideFraction} />
      </SelectorContainer>
    </Container>
  );
};
