import Switch from "@mui/material/Switch";
import { Container, Label, SelectorContainer } from "../OptionCommon";
import { useCallback } from "react";

type KeySizeSelectorProps = {
  isBigKey: boolean;
  setIsBigKey: (isBigKey: boolean) => void;
};

export const KeySizeSelector: React.FC<KeySizeSelectorProps> = ({
  isBigKey,
  setIsBigKey,
}) => {
  const onSwitchKeySize = useCallback(
    (ev: React.ChangeEvent) => {
      setIsBigKey((ev.currentTarget as HTMLInputElement).checked);
    },
    [setIsBigKey],
  );

  return (
    <Container>
      <Label>ピアノを大きくする</Label>
      <SelectorContainer>
        <Switch checked={isBigKey} onChange={onSwitchKeySize} />
      </SelectorContainer>
    </Container>
  );
};
