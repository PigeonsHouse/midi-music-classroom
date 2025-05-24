import { useCallback } from "react";
import Slider, {} from "@mui/material/Slider";
import {
  ScrollBarButton,
  ScrollBarContainer,
  ScrollBarSliderStyle,
} from "./styled";

type ScrollBarProps = {
  scrollValue: number;
  setScrollValue: (value: number) => void;
  maxScrollValue: number;
};

export const ScrollBar: React.FC<ScrollBarProps> = ({
  scrollValue,
  setScrollValue,
  maxScrollValue,
}) => {
  const moveStep = Math.max(50, maxScrollValue / 12);
  const handleScroll = useCallback(
    (_: Event, newValue: number | number[]) => {
      if (Array.isArray(newValue)) {
        return;
      }
      setScrollValue(newValue);
    },
    [setScrollValue],
  );
  const handleScrollLeft = useCallback(() => {
    setScrollValue(scrollValue - moveStep);
  }, [scrollValue, setScrollValue]);
  const handleScrollRight = useCallback(() => {
    setScrollValue(scrollValue + moveStep);
  }, [scrollValue, setScrollValue]);

  return (
    <ScrollBarContainer>
      <ScrollBarButton onClick={handleScrollLeft}>◀︎</ScrollBarButton>
      <Slider
        className={ScrollBarSliderStyle}
        value={scrollValue}
        min={0}
        max={maxScrollValue}
        onChange={handleScroll}
      />
      <ScrollBarButton onClick={handleScrollRight}>▶︎</ScrollBarButton>
    </ScrollBarContainer>
  );
};
