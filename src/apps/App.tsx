import { useCallback, useEffect, useState } from "react";
import { Piano } from "../components/Piano";
import { initMidiDevice } from "../utils/midi";
import { Title } from "./styled";

type DeviceMap = {
  [key: string]: MIDIInput;
};

export const App = () => {
  const [devices, setDevices] = useState<DeviceMap>({});
  const [targetDeviceName, setTargetDeviceName] = useState<
    string | undefined
  >();
  const [pushingKeyNumbers, setPushingKeyNumbers] = useState<number[]>([]);
  const [keyLabelType, setKeyLabelType] = useState<
    "italian" | "american" | undefined
  >();
  const [isSingleOctave, setIsSingleOctave] = useState(false);

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
    (ev: React.ChangeEvent) => {
      const idx = (ev.currentTarget as HTMLSelectElement).selectedIndex;
      if (idx === 0) {
        setTargetDeviceName(undefined);
        return;
      }
      setTargetDeviceName(Object.keys(devices)[idx - 1]);
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
      if (isOn) {
        if (pushingKeyNumbers.includes(noteNumber)) return;
        setPushingKeyNumbers((pushedKeyNumbers) => {
          pushedKeyNumbers.push(noteNumber);
          return [...pushedKeyNumbers];
        });
      } else {
        const index = pushingKeyNumbers.indexOf(noteNumber);
        if (index === -1) return;
        setPushingKeyNumbers((pushedKeyNumbers) => {
          pushedKeyNumbers.splice(index, 1);
          return [...pushedKeyNumbers];
        });
      }
    },
    [pushingKeyNumbers, setPushingKeyNumbers],
  );
  const changeLabelType = useCallback(
    (ev: React.ChangeEvent) => {
      switch ((ev.currentTarget as HTMLSelectElement).selectedIndex) {
        case 1:
          setKeyLabelType("italian");
          break;
        case 2:
          setKeyLabelType("american");
          break;
        default:
          setKeyLabelType(undefined);
          break;
      }
    },
    [setKeyLabelType],
  );
  const onSwitchSingleOctave = useCallback(
    (ev: React.ChangeEvent) => {
      setIsSingleOctave((ev.currentTarget as HTMLInputElement).checked);
    },
    [setIsSingleOctave],
  );

  useEffect(() => {
    // デバイスの取得
    initMidiDevice(addDevice);
  }, [addDevice]);

  useEffect(() => {
    // ターゲットのデバイスが更新されたらcallbackを登録
    if (targetDeviceName === undefined) return;
    devices[targetDeviceName].addEventListener(
      "midimessage",
      midiCallback,
      false,
    );
    // callbackが重複しないよう、useEffectが更新される際にEventListenerを削除する
    return () => {
      devices[targetDeviceName].removeEventListener(
        "midimessage",
        midiCallback,
        false,
      );
    };
  }, [devices, midiCallback, targetDeviceName]);

  return (
    <>
      <Title>🎹学べるWebピアノ🏫</Title>
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontWeight: "bold" }}>オプション</div>
        <div>
          <label>MIDIデバイス：</label>
          <select onChange={selectDevice}>
            <option>なし</option>
            {Object.keys(devices).map((deviceName) => (
              <option key={deviceName}>{deviceName}</option>
            ))}
          </select>
        </div>
        <div>
          <label>音階名表示：</label>
          <select onChange={changeLabelType}>
            <option>ラベルなし</option>
            <option>イタリア式 - ドレミ</option>
            <option>アメリカ式 - CDE</option>
          </select>
        </div>
        <div>
          <input type="checkbox" onChange={onSwitchSingleOctave} />
          <label>1オクターブに畳む</label>
        </div>
      </div>
      <Piano
        isSingleOctave={isSingleOctave}
        labelType={keyLabelType}
        pushingKeyNumbers={pushingKeyNumbers}
      />
    </>
  );
};
