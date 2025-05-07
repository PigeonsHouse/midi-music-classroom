import { useCallback } from "react";
import { LabelType } from "../../definitions/keyLabel";

const selector: { label: string; value: LabelType | "" }[] = [
  { label: "ラベルなし", value: "" },
  { label: "イタリア式 - ドレミ", value: "italian" },
  { label: "アメリカ式 - CDE", value: "american" },
];

type KeyLabelSelectorProps = {
  keyLabelType: LabelType | undefined;
  setKeyLabelType: (type: LabelType | undefined) => void;
};

export const KeyLabelSelector: React.FC<KeyLabelSelectorProps> = ({
  keyLabelType,
  setKeyLabelType,
}) => {
  const changeLabelType = useCallback(
    (ev: React.ChangeEvent) => {
      const index = (ev.currentTarget as HTMLSelectElement).selectedIndex;
      const selectedOptionValue = selector[index].value;
      setKeyLabelType(
        selectedOptionValue === "" ? undefined : selectedOptionValue,
      );
    },
    [setKeyLabelType],
  );

  return (
    <div>
      <label>音階名表示：</label>
      <select onChange={changeLabelType}>
        {selector.map(({ label, value }) => (
          <option
            selected={(keyLabelType ?? "") === value}
            value={value}
            key={value}
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
