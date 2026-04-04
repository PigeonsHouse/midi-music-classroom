import { useMemo } from "react";
import { Container, NamePart } from "./styled";

type SaveSpacingChordNameProps = {
  children: string;
  fontSize?: number;
};

export const SaveSpacingChordName: React.FC<SaveSpacingChordNameProps> = ({
  children,
  fontSize,
}) => {
  const fixedFontSize = fontSize ?? 12;

  const splittedChordName = useMemo(() => {
    const signChars = ["♯", "♭"];
    const regex = new RegExp(`([${signChars.map((c) => `\\${c}`).join("")}])`);
    return children
      .split(regex)
      .filter(Boolean)
      .map((part) => ({
        text: part,
        isSign: signChars.includes(part),
      }));
  }, [children]);

  return (
    <Container>
      {splittedChordName.map(({ text, isSign }) => (
        <NamePart key={text} isSmall={isSign} fontSize={fixedFontSize}>
          {text}
        </NamePart>
      ))}
    </Container>
  );
};
