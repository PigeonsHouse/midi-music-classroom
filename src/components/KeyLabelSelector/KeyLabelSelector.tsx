import { useCallback } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { LabelType } from "../../definitions/keyLabel";
import { Container, Label, SelectorContainer } from "../OptionCommon";

const selector: { label: string; value: LabelType | "NONE" }[] = [
  { label: "ラベルなし", value: "NONE" },
  { label: "イタリア式 - ドレミ", value: "italian" },
  { label: "アメリカ式 - CDE", value: "american" },
];

type KeyLabelSelectorProps = {
  keyLabelType: LabelType | undefined;
  setKeyLabelType: (type: LabelType | undefined) => void;
};

export const KeyLabelSelector: React.FC<KeyLabelSelectorProps> = ({
  keyLabelType,
  setKeyLabelType,
}) => {
  const changeLabelType = useCallback(
    (ev: SelectChangeEvent) => {
      const selectedOptionValue = ev.target.value as LabelType | "NONE";
      setKeyLabelType(
        selectedOptionValue === "NONE" ? undefined : selectedOptionValue,
      );
    },
    [setKeyLabelType],
  );

  return (
    <Container>
      <Label>音階名表示</Label>
      <SelectorContainer>
        <Select
          onChange={changeLabelType}
          value={keyLabelType ?? "NONE"}
          size="small"
        >
          {selector.map(({ label, value }) => (
            <MenuItem value={value} key={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </SelectorContainer>
    </Container>
  );
};
