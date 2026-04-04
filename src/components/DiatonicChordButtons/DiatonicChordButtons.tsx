import { Button, ButtonContainer, ButtonRowContainer } from "./styled";

export type DiatonicChordButtonData = {
  onClick: () => void;
  label: string;
};

const DiatonicChordButton: React.FC<{ data: DiatonicChordButtonData, degree: string }> = ({
  data,
  degree,
}) => <Button onClick={data.onClick}>{data.label} ({degree})</Button>;

type DiatonicChordButtonsProps = {
  buttonDataList: DiatonicChordButtonData[];
};

export const DiatonicChordButtons: React.FC<DiatonicChordButtonsProps> = ({
  buttonDataList,
}) => {
  const isValid = buttonDataList.length === 6;

  return isValid ? (
    <ButtonContainer>
      ダイアトニックコードを鳴らす
      <ButtonRowContainer>
        <DiatonicChordButton data={buttonDataList[3]} degree="Ⅳ" />
        <DiatonicChordButton data={buttonDataList[0]} degree="Ⅰ" />
        <DiatonicChordButton data={buttonDataList[4]} degree="Ⅴ" />
      </ButtonRowContainer>
      <ButtonRowContainer>
        <DiatonicChordButton data={buttonDataList[1]} degree="Ⅱm" />
        <DiatonicChordButton data={buttonDataList[5]} degree="Ⅵm" />
        <DiatonicChordButton data={buttonDataList[2]} degree="Ⅲm" />
      </ButtonRowContainer>
    </ButtonContainer>
  ) : undefined;
};
