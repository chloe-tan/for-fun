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
  },
  "link" : {
    border: "border-none",
    bg: "bg-transparent",
    textColor: "text-fgray",
  }
} as any

interface FunButtonProps {
  type?: string, // primary | secondary | link
  text: string;
  prefixIcon?: ReactNode;
  onClick?: (p?: any) => void;
  styleClass?: string;
  textClass?: string;
}

export default function FunButton({ type = "primary", text = "", prefixIcon = null, onClick = () => {}, styleClass = "", textClass = "" }: FunButtonProps) {
  const baseClasses = "flex flex-row justify-center items-center p-4 gap-1.5 w-full rounded-2xl hover:opacity-70"
  const borderClass = useMemo(() => typeMap?.[type].border, [type]);
  const backgroundClass = useMemo(() => typeMap?.[type].bg, [type]);
  const textColorClass = useMemo(() => typeMap?.[type].textColor, [type]);
  // Composite
  const buttonClassName = useMemo(() => `${baseClasses} ${borderClass} ${backgroundClass} ${styleClass}`, [borderClass, backgroundClass, styleClass]);
  return (
    <button className={buttonClassName} onClick={onClick}>
      {prefixIcon}
      <FunTypography level={3} textColor={textColorClass} overrideStyles={textClass}>
        {text}
      </FunTypography>
    </button>
  )
}