import { useCallback } from "react";

export type DeviceMap = {
  [key: string]: MIDIInput;
};

type MIDIDeviceSelectorProps = {
  devices: DeviceMap;
  selectDevice: (index: number) => void;
};

export const MIDIDeviceSelector: React.FC<MIDIDeviceSelectorProps> = ({
  devices,
  selectDevice,
}) => {
  const onSelectDevice = useCallback(
    (ev: React.ChangeEvent) => {
      const idx = (ev.currentTarget as HTMLSelectElement).selectedIndex;
      selectDevice(idx);
    },
    [selectDevice],
  );

  return (
    <div>
      <label>MIDIデバイス：</label>
      <select onChange={onSelectDevice}>
        <option>なし</option>
        {Object.keys(devices).map((deviceName) => (
          <option key={deviceName}>{deviceName}</option>
        ))}
      </select>
    </div>
  );
};
