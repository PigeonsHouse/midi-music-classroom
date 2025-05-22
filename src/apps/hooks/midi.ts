import { useCallback, useEffect, useState } from "react";
import { DeviceMap } from "../../components/MIDIDeviceSelector";

type AddDevice = (dev: MIDIInput) => void;

const initMidiDevice = async (addDevice: AddDevice) => {
  try {
    const access = await navigator.requestMIDIAccess();
    const inputIterator = access.inputs.values();
    for (
      let input = inputIterator.next();
      !input.done;
      input = inputIterator.next()
    ) {
      const value = input.value;
      addDevice(value);
    }
  } catch {
    // MIDIのリクエストを禁止したらこっちに流れる
    return;
  }
};

export const useMidiKeyboard = (
  updatePushingKeyNumbers: (newNoteNumber: number, isOn: boolean) => void,
) => {
  const [devices, setDevices] = useState<DeviceMap>({});
  const [targetDeviceName, setTargetDeviceName] = useState<string>("NONE");

  const addDevice = useCallback(
    (newDevice: MIDIInput) => {
      setDevices((devices) => {
        if (newDevice.name) {
          devices[newDevice.name] = newDevice;
          return { ...devices };
        }
        return devices;
      });
    },
    [setDevices],
  );
  const selectDevice = useCallback(
    (deviceName: string) => {
      if (Object.keys(devices).includes(deviceName)) {
        setTargetDeviceName(deviceName);
        return;
      }
      setTargetDeviceName("NONE");
    },
    [devices],
  );
  const midiCallback = useCallback(
    (ev: MIDIMessageEvent) => {
      if (ev.data === null) {
        return;
      }
      // PITCHベンド
      if (ev.data[0] / 16 === 14) {
        console.log("pitch");
        return;
      }
      // MODULATION
      if (ev.data[0] / 16 === 11) {
        console.log("mod");
        return;
      }

      // 60がC4。12ずつで1オクターブ上下する。
      const noteNumber = ev.data[1];

      const isOn = ev.data[0] / 16 === 9;
      updatePushingKeyNumbers(noteNumber, isOn);
    },
    [updatePushingKeyNumbers],
  );

  useEffect(() => {
    // デバイスの取得
    initMidiDevice(addDevice);
  }, [addDevice]);
  useEffect(() => {
    // ターゲットのデバイスが更新されたらcallbackを登録
    if (targetDeviceName === "NONE") return;
    const device = devices[targetDeviceName];
    device.addEventListener("midimessage", midiCallback, false);
    // callbackが重複しないよう、useEffectが更新される際にEventListenerを削除する
    return () => device.removeEventListener("midimessage", midiCallback, false);
  }, [devices, midiCallback, targetDeviceName]);

  return {
    devices,
    selectDevice,
  };
};
