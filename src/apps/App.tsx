import { ChordInfo } from "../components/ChordInfo";
import { CircleOfFifths } from "../components/CircleOfFifths";
import { HideInversion } from "../components/HideInversion";
import { KeyLabelSelector } from "../components/KeyLabelSelector";
import { MIDIDeviceSelector } from "../components/MIDIDeviceSelector";
import { Piano } from "../components/Piano";
import { ScaleDisplay } from "../components/ScaleDisplay";
import { ScrollBar } from "../components/ScrollBar";
import { SingleOctave } from "../components/SingleOctave";
import { TransposeSlider } from "../components/TransposeSlider";
import { VolumeSlider } from "../components/VolumeSlider";
import {
  useKeyboard,
  useMidiKeyboard,
  useOptions,
  usePushingKeys,
  useScale,
  useScrollBar,
  useSound,
} from "./hooks";
import {
  Container,
  OptionArrowContainer,
  OptionContainer,
  OptionContainerScroller,
  OptionContainerWrapper,
  OptionItemContainer,
  OptionTitle,
  PianoScroller,
  PianoWrapper,
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
    setScaleForce,
    transposeScale,
    setTransposeScale,
  } = useScale();

  // 押しているキーを中央管理する箇所
  const { pushingKeyNumbers, updatePushingKeyNumbers } =
    usePushingKeys(transposeScale);

  // スクロールバーの表示関連
  const {
    scrollRef,
    isViewScrollBar,
    scrollValue,
    setScrollValue,
    maxScrollValue,
  } = useScrollBar();

  // MIDIキーボード関連
  const { devices, selectDevice } = useMidiKeyboard(updatePushingKeyNumbers);

  // 音声出力関連
  const { volume, setVolume } = useSound();

  // PCのキーボード関連
  useKeyboard(updatePushingKeyNumbers);

  return (
    <Container>
      <Title>鳩屋敷のWebピアノ</Title>
      <OptionContainerWrapper>
        <OptionContainer open={isOpenOption}>
          <OptionTitle onClick={toggleOption}>
            オプション
            <OptionArrowContainer>
              {isOpenOption ? "▲" : "▼"}
            </OptionArrowContainer>
          </OptionTitle>
          <OptionContainerScroller>
            <OptionItemContainer>
              <VolumeSlider volume={volume} setVolume={setVolume} />
              <MIDIDeviceSelector
                devices={devices}
                selectDevice={selectDevice}
              />
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
          </OptionContainerScroller>
        </OptionContainer>
      </OptionContainerWrapper>
      <PianoScroller ref={scrollRef}>
        <PianoWrapper>
          <Piano
            isScaleDisplay={isScaleDisplay}
            isSingleOctave={isSingleOctave}
            labelType={keyLabelType}
            pushingKeyNumbers={pushingKeyNumbers}
            scale={scale}
            updatePushingKeyNumbers={updatePushingKeyNumbers}
          />
        </PianoWrapper>
      </PianoScroller>
      {isViewScrollBar && (
        <ScrollBar
          scrollValue={scrollValue}
          setScrollValue={setScrollValue}
          maxScrollValue={maxScrollValue}
        />
      )}
      <ChordInfo
        isScaleDisplay={isScaleDisplay}
        pushingKeyNumbers={pushingKeyNumbers}
        isHideInversion={isHideInversion}
        scale={scale}
      />
      <CircleOfFifths
        scale={isScaleDisplay ? scale : undefined}
        setScale={setScaleForce}
      />
    </Container>
  );
};
