import { useCallback } from "react";
import Slider from "@mui/material/Slider";
import { Container, Label, SelectorContainer } from "../OptionCommon";

type VolumeSliderProps = {
  volume: number;
  setVolume: (volume: number) => void;
};

export const VolumeSlider: React.FC<VolumeSliderProps> = ({
  volume,
  setVolume,
}) => {
  const getVolumeLabel = useCallback((volume: number) => {
    return `${Math.round(volume * 100)} %`;
  }, []);
  const onSlideVolume = useCallback(
    (_: Event, newValue: number | number[]) => {
      if (Array.isArray(newValue)) {
        return;
      }
      setVolume(newValue);
    },
    [setVolume],
  );

  return (
    <Container>
      <Label>音量（{getVolumeLabel(volume)}）</Label>
      <SelectorContainer>
        <Slider
          step={0.05}
          marks
          min={0}
          max={1}
          value={volume}
          onChange={onSlideVolume}
        />
      </SelectorContainer>
    </Container>
  );
};
