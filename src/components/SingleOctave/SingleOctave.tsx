import { useCallback } from "react";
import Switch from "@mui/material/Switch";
import { Container, Label, SelectorContainer } from "../OptionCommon";

type SingleOctave = {
  isSingleOctave: boolean;
  setIsSingleOctave: (isSingleOctave: boolean) => void;
};

export const SingleOctave: React.FC<SingleOctave> = ({
  isSingleOctave,
  setIsSingleOctave,
}) => {
  const onSwitchSingleOctave = useCallback(
    (ev: React.ChangeEvent) => {
      setIsSingleOctave((ev.currentTarget as HTMLInputElement).checked);
    },
    [setIsSingleOctave],
  );

  return (
    <Container>
      <Label>1オクターブに畳む</Label>
      <SelectorContainer>
        <Switch checked={isSingleOctave} onChange={onSwitchSingleOctave} />
      </SelectorContainer>
    </Container>
  );
};
