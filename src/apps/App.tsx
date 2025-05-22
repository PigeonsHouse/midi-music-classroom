import { ChordInfo } from "../components/ChordInfo";
import { HideInversion } from "../components/HideInversion";
import { KeyLabelSelector } from "../components/KeyLabelSelector";
import { MIDIDeviceSelector } from "../components/MIDIDeviceSelector";
import { Piano } from "../components/Piano";
import { ScaleDisplay } from "../components/ScaleDisplay";
import { SingleOctave } from "../components/SingleOctave";
import { TransposeSlider } from "../components/TransposeSlider";
import { VolumeSlider } from "../components/VolumeSlider";
import {
  useKeyboard,
  useMidiKeyboard,
  useOptions,
  usePushingKeys,
  useScale,
  useSound,
} from "./hooks";
import {
  OptionContainer,
  OptionItemContainer,
  OptionTitle,
  Title,
} from "./styled";

export const App = () => {
  const {
    isOpenOption,
    toggleOption,
    keyLabelType,
    setKeyLabelType,
    isSingleOctave,
    setIsSingleOctave,
    isHideInversion,
    setIsHideInversion,
  } = useOptions();

  // スケール関連
  const {
    isScaleDisplay,
    setIsScaleDisplay,
    scale,
    setScale,
    transposeScale,
    setTransposeScale,
  } = useScale();

  // 押しているキーを中央管理する箇所
  const { pushingKeyNumbers, updatePushingKeyNumbers } =
    usePushingKeys(transposeScale);

  // MIDIキーボード関連
  const { devices, selectDevice } = useMidiKeyboard(updatePushingKeyNumbers);

  // 音声出力関連
  const { volume, setVolume } = useSound();

  // PCのキーボード関連
  useKeyboard(updatePushingKeyNumbers);

  return (
    <>
      <Title>鳩屋敷のWebピアノ</Title>
      <OptionContainer open={isOpenOption}>
        <OptionTitle onClick={toggleOption}>オプション</OptionTitle>
        <OptionItemContainer>
          <VolumeSlider volume={volume} setVolume={setVolume} />
          <MIDIDeviceSelector devices={devices} selectDevice={selectDevice} />
          <KeyLabelSelector
            keyLabelType={keyLabelType}
            setKeyLabelType={setKeyLabelType}
          />
          <SingleOctave
            isSingleOctave={isSingleOctave}
            setIsSingleOctave={setIsSingleOctave}
          />
          <HideInversion
            isHideInversion={isHideInversion}
            setIsHideInversion={setIsHideInversion}
          />
          <TransposeSlider
            transposeScale={transposeScale}
            setTransposeScale={setTransposeScale}
          />
          <ScaleDisplay
            isScaleDisplay={isScaleDisplay}
            setIsScaleDisplay={setIsScaleDisplay}
            scale={scale}
            setScale={setScale}
            disabled={transposeScale !== 0}
          />
        </OptionItemContainer>
      </OptionContainer>
      <Piano
        isSingleOctave={isSingleOctave}
        labelType={keyLabelType}
        pushingKeyNumbers={pushingKeyNumbers}
        scale={scale}
      />
      <ChordInfo
        pushingKeyNumbers={pushingKeyNumbers}
        isHideInversion={isHideInversion}
        scale={scale}
      />
    </>
  );
};
