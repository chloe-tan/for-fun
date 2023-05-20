import { ReactNode, useMemo } from "react";
import FunTypography from "./FunTypography";

const typeMap = {
  "primary": {
    border: "border border-[#2B2F43]",
    bg: "bg-[#2B2F43]",
    textColor: "text-fwhite",
  }, 
  "secondary": {
    border: "border border-[#E4E7EC]",
    bg: "bg-[#E4E7EC]",
    textColor: "text-fdarkblue",
  }
} as any

interface FunButtonProps {
  type: string, // primary | secondary
  text: string;
  prefixIcon: ReactNode;
}

export default function FunButton({ type = "primary", text = "", prefixIcon = null }: FunButtonProps) {
  const baseClasses = "flex flex-row justify-center items-center p-4 gap-1.5 w-full rounded-2xl hover:opacity-70"
  const borderClass = useMemo(() => typeMap?.[type].border, [type]);
  const backgroundClass = useMemo(() => typeMap?.[type].bg, [type]);
  const textColorClass = useMemo(() => typeMap?.[type].textColor, [type]);
  // Composite
  const buttonClassName = useMemo(() => `${baseClasses} ${borderClass} ${backgroundClass}`, [borderClass, backgroundClass]);
  return (
    <button className={buttonClassName}>
      {prefixIcon}
      <FunTypography level={3} textColor={textColorClass}>
        {text}
      </FunTypography>
    </button>
  )
}