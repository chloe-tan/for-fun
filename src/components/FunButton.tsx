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
  textFontWeight?: string;
  isDisabled?: boolean;
}

export default function FunButton({ type = "primary", text = "", prefixIcon = null, onClick = () => {}, styleClass = "", textFontWeight = "font-semibold", isDisabled = false }: FunButtonProps) {
  const baseClasses = "flex flex-row justify-center items-center p-4 gap-1.5 w-full rounded-2xl"
  const borderClass = useMemo(() => typeMap?.[type].border, [type]);
  const backgroundClass = useMemo(() => typeMap?.[type].bg, [type]);
  const textColorClass = useMemo(() => typeMap?.[type].textColor, [type]);
  const hoverAndOpacityClass = useMemo(() => isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-70", [isDisabled]);
  // Composite
  const buttonClassName = useMemo(() => `${baseClasses} ${hoverAndOpacityClass} ${borderClass} ${backgroundClass} ${styleClass}`, [hoverAndOpacityClass, borderClass, backgroundClass, styleClass]);
  return (
    <button className={buttonClassName} onClick={(e) => !isDisabled && onClick?.(e)}>
      {prefixIcon}
      <FunTypography level={3} textColor={textColorClass} fontWeight={textFontWeight}>
        {text}
      </FunTypography>
    </button>
  )
}