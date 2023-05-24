import { useEffect, useMemo } from "react";
import FunTypography from "./FunTypography";

interface FunInputProps {
  inputValue: string | null;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
  autoFocus?: boolean;
}

const INPUT_ID = "fun-number-input"
// Supports only numerical input for now
// TODO: Generalize the component
export default function FunInput({ inputValue, setInputValue, autoFocus = false }: FunInputProps) {
  const className = useMemo(() => {
    return `text-fblack focus:outline-none text-end m-0`;
  }, []);

  useEffect(() => {
    autoFocus && document?.getElementById?.(INPUT_ID)?.focus();
  }, [autoFocus])

  return (
    <div>
      <FunTypography level={1}>
        <input
          id={INPUT_ID}
          type="number"
          className={className}
          value={inputValue == null ? "" : inputValue}
          onChange={(e) => {
            const value = Number(e?.target?.value);
            setInputValue?.(value);
          }}
          min={0}
          step={.00001}
          placeholder=""
        />
      </FunTypography>
    </div>
  )
}