import { useCallback, useEffect, useState } from "react";
import { initMidiDevice } from "./utils/midi";

type DeviceMap = {
  [key: string]: MIDIInput;
};

const keyList = [
  "ド",
  "ド♯",
  "レ",
  "レ♯",
  "ミ",
  "ファ",
  "ファ♯",
  "ソ",
  "ソ♯",
  "ラ",
  "ラ♯",
  "シ",
];

const App = () => {
  const [devices, setDevices] = useState<DeviceMap>({});
  const [pushingKeys, setPushingKeys] = useState<string[]>([]);
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
  const midiCallback = useCallback(
    (ev: MIDIMessageEvent) => {
      if (ev.data === null) {
        return;
      }
      if (ev.data[0] / 16 === 14) {
        console.log("pitch");
        return;
      }
      if (ev.data[0] / 16 === 11) {
        console.log("mod");
        return;
      }

      const isOn = ev.data[0] / 16 === 9;

      const noteNumber = ev.data[1];
      const pushKey = keyList[noteNumber % 12];
      console.log(pushKey);

      if (isOn) {
        if (!pushingKeys.includes(pushKey)) {
          setPushingKeys((pushedKeys) => {
            pushedKeys.push(pushKey);
            console.log(pushedKeys);
            return [...pushedKeys];
          });
        }
      } else {
        const index = pushingKeys.indexOf(pushKey);
        setPushingKeys((pushedKeys) => {
          pushedKeys.splice(index, 1);
          return [...pushedKeys];
        });
      }
    },
    [pushingKeys, setPushingKeys],
  );

  useEffect(() => {
    initMidiDevice(addDevice);
  }, [addDevice]);

  useEffect(() => {
    Object.values(devices).map((device) => {
      device.addEventListener("midimessage", midiCallback, false);
    });
    return () => {
      Object.values(devices).map((device) => {
        device.removeEventListener("midimessage", midiCallback, false);
      });
    };
  }, [devices, midiCallback]);

  return (
    <>
      {pushingKeys.map((key) => {
        return <div key={key}>{key}</div>;
      })}
      {/* {Object.entries(devices).map(([name, device]) => (
        <div key={name}>
          {name}: {device.id}
        </div>
      ))} */}
    </>
  );
};

export default App;
