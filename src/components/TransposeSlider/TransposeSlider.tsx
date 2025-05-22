import { useCallback, useMemo } from "react";
import Slider from "@mui/material/Slider";
import { keyLabel } from "../../definitions/keyLabel";
import { Container, Label, SelectorContainer } from "../OptionCommon";
import { Annotation } from "./styled";

type TransposeSliderProps = {
  transposeScale: number;
  setTransposeScale: (scale: number) => void;
};

export const TransposeSlider: React.FC<TransposeSliderProps> = ({
  transposeScale,
  setTransposeScale,
}) => {
  const keyName = useMemo(() => {
    return keyLabel.american[(12 + transposeScale) % 12];
  }, [transposeScale]);
  const onSlideTranspose = useCallback(
    (_: Event, newValue: number | number[]) => {
      if (Array.isArray(newValue)) {
        return;
      }
      setTransposeScale(newValue);
    },
    [setTransposeScale],
  );

  return (
    <Container>
      <Label>トランスポーズ{transposeScale !== 0 && `（${keyName}）`}</Label>
      <SelectorContainer>
        <Slider
          step={1}
          marks
          min={-6}
          max={6}
          value={transposeScale}
          onChange={onSlideTranspose}
        />
        {transposeScale !== 0 && (
          <Annotation>
            ※下のキーボードの光る位置もトランスポーズします。
          </Annotation>
        )}
      </SelectorContainer>
    </Container>
  );
};
