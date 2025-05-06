import { useCallback, useState } from "react";
import { ChordInfo } from "../components/ChordInfo";
import { Piano } from "../components/Piano";
import { useKeyboard } from "./keyboard";
import { useMidiKeyboard } from "./midi";
import { beepNote, useSound } from "./sounds";
import { Title } from "./styled";

export const App = () => {
  // 押しているキーを中央管理する箇所
  const [pushingKeyNumbers, setPushingKeyNumbers] = useState<number[]>([]);
  const updatePushingKeyNumbers = useCallback(
    (newNoteNumber: number, isOn: boolean) => {
      if (isOn) {
        setPushingKeyNumbers((pushedKeyNumbers) =>
          pushingKeyNumbers.includes(newNoteNumber)
            ? pushedKeyNumbers
            : pushedKeyNumbers.concat(newNoteNumber),
        );
        beepNote(newNoteNumber);
      } else {
        setPushingKeyNumbers((pushedKeyNumbers) => {
          const index = pushedKeyNumbers.indexOf(newNoteNumber);
          return index === -1
            ? pushedKeyNumbers
            : pushedKeyNumbers.toSpliced(index, 1);
        });
      }
    },
    [pushingKeyNumbers],
  );

  // キーに表示するラベル関連
  const [keyLabelType, setKeyLabelType] = useState<
    "italian" | "american" | undefined
  >();
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

  // ピアノを折りたたむか
  const [isSingleOctave, setIsSingleOctave] = useState(false);
  const onSwitchSingleOctave = useCallback(
    (ev: React.ChangeEvent) => {
      setIsSingleOctave((ev.currentTarget as HTMLInputElement).checked);
    },
    [setIsSingleOctave],
  );

  // 転回形の分数表記を省略するか
  const [isHideInversion, setIsHideInversion] = useState(false);
  const onSwitchHideFraction = useCallback(
    (ev: React.ChangeEvent) => {
      setIsHideInversion((ev.currentTarget as HTMLInputElement).checked);
    },
    [setIsHideInversion],
  );

  // MIDIキーボード関連
  const { devices, selectDevice } = useMidiKeyboard(updatePushingKeyNumbers);
  const onSelectDevice = useCallback(
    (ev: React.ChangeEvent) => {
      const idx = (ev.currentTarget as HTMLSelectElement).selectedIndex;
      selectDevice(idx);
    },
    [selectDevice],
  );

  // 音声出力関連
  const { volume, setVolume } = useSound();
  const onSlideVolume = useCallback(
    (ev: React.ChangeEvent) => {
      const volume = Number((ev.target as HTMLInputElement).value);
      setVolume(volume);
    },
    [setVolume],
  );

  // PCのキーボード関連
  useKeyboard(updatePushingKeyNumbers);

  return (
    <>
      <Title>🎹学べるWebピアノ🏫</Title>
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontWeight: "bold" }}>オプション</div>
        <div>
          <label>MIDIデバイス：</label>
          <select onChange={onSelectDevice}>
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
        <div>
          <label>音量</label>
          <input
            type="range"
            value={volume}
            onChange={onSlideVolume}
            min="0"
            max="1"
            step="0.05"
          />
          <label>{Math.round(volume * 100)} %</label>
        </div>
        <div>
          <input type="checkbox" onChange={onSwitchHideFraction} />
          <label>転回形の分数表記を省略する</label>
        </div>
      </div>
      <Piano
        isSingleOctave={isSingleOctave}
        labelType={keyLabelType}
        pushingKeyNumbers={pushingKeyNumbers}
      />
      <ChordInfo
        pushingKeyNumbers={pushingKeyNumbers}
        isHideInversion={isHideInversion}
      />
    </>
  );
};
