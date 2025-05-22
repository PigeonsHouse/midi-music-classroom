import { useCallback } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Container, Label, SelectorContainer } from "../OptionCommon";

export type DeviceMap = {
  [key: string]: MIDIInput;
};

type MIDIDeviceSelectorProps = {
  devices: DeviceMap;
  selectDevice: (deviceName: string) => void;
};

export const MIDIDeviceSelector: React.FC<MIDIDeviceSelectorProps> = ({
  devices,
  selectDevice,
}) => {
  const onSelectDevice = useCallback(
    (ev: SelectChangeEvent) => {
      selectDevice(ev.target.value);
    },
    [selectDevice],
  );

  return (
    <Container>
      <Label>MIDIデバイス</Label>
      <SelectorContainer>
        <Select onChange={onSelectDevice} size="small" defaultValue="NONE">
          <MenuItem value="NONE">なし</MenuItem>
          {Object.keys(devices).map((deviceName) => (
            <MenuItem key={deviceName} value={deviceName}>
              {deviceName}
            </MenuItem>
          ))}
        </Select>
      </SelectorContainer>
    </Container>
  );
};
