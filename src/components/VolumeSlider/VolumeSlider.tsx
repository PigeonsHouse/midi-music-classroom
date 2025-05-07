import { useCallback, useMemo } from "react";

type VolumeSliderProps = {
  volume: number;
  setVolume: (volume: number) => void;
};

export const VolumeSlider: React.FC<VolumeSliderProps> = ({
  volume,
  setVolume,
}) => {
  const volumeLabel = useMemo(() => {
    return `${Math.round(volume * 100)} %`;
  }, [volume]);
  const onSlideVolume = useCallback(
    (ev: React.ChangeEvent) => {
      const volume = Number((ev.target as HTMLInputElement).value);
      setVolume(volume);
    },
    [setVolume],
  );

  return (
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
      <label>{volumeLabel}</label>
    </div>
  );
};
