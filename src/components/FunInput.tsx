import { Fragment, useMemo } from "react";
import FunTypography from "./FunTypography";

interface FunInputProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<number>>
}

// Supports only numerical input for now
// TODO: Generalize the component
export default function FunInput({ inputValue, setInputValue }: FunInputProps) {
  const className = useMemo(() => {
    return `text-fblack focus:outline-none text-end m-0`;
  }, []);
  return (
    <Fragment>
      <FunTypography level={1}>
        <input
          id="ghost-input"
          type="number"
          className={className}
          value={inputValue}
          onChange={(e) => {
            const value = Number(e?.target?.value);
            setInputValue?.(value);
          }}
          min={0}
          step={0.0001}
        />
      </FunTypography>
    </Fragment>
  )
}