import { useCallback } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { keyLabel, ScaleType } from "../../definitions/keyLabel";
import { Container, Label, SelectorContainer } from "../OptionCommon";

type ScaleDisplayProps = {
  disabled: boolean;
  isScaleDisplay: boolean;
  setIsScaleDisplay: (isScaleDisplay: boolean) => void;
  scale: ScaleType;
  setScale: (scale: ScaleType) => void;
};

export const ScaleDisplay: React.FC<ScaleDisplayProps> = ({
  disabled,
  isScaleDisplay,
  setIsScaleDisplay,
  scale,
  setScale,
}) => {
  const onSwitchScale = useCallback(
    (ev: React.ChangeEvent) => {
      setIsScaleDisplay((ev.currentTarget as HTMLInputElement).checked);
    },
    [setIsScaleDisplay],
  );
  const onSelectScale = useCallback((ev: SelectChangeEvent) => {
    const newScale = ev.target.value;
    if (newScale) {
      setScale(newScale as ScaleType);
    }
  }, []);

  return (
    <>
      <Container>
        <Label>メジャースケールを表示する</Label>
        <SelectorContainer>
          <Switch
            checked={disabled || isScaleDisplay}
            onChange={onSwitchScale}
            disabled={disabled}
          />
        </SelectorContainer>
      </Container>
      {(isScaleDisplay || disabled) && (
        <Container>
          <Label>表示するスケール</Label>
          <SelectorContainer>
            <Select
              value={scale}
              onChange={onSelectScale}
              disabled={disabled}
              size="small"
            >
              {keyLabel.american.map((keyScale) => (
                <MenuItem key={keyScale} value={keyScale}>
                  {keyScale}
                </MenuItem>
              ))}
            </Select>
          </SelectorContainer>
        </Container>
      )}
    </>
  );
};
