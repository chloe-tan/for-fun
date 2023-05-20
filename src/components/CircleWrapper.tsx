import { ReactNode } from "react";
import FunTypography from "./FunTypography";

interface CircleWrapperProps {
  text?: ReactNode;
  bgColor?: string;
  size?: string;
  textLevel?: number;
  textStyles?: string;
}

export default function CircleWrapper({ text = "🚀", bgColor = "bg-[#F7C478]", size = "h-6 w-6", textLevel = 4, textStyles = "" }: CircleWrapperProps) {
  return (
    <div className={`rounded-full ${size} ${bgColor} flex items-center justify-center`}>
      <FunTypography level={textLevel} overrideStyles={`leading-[14px] align-middle pt-[3px] pr-[1px] ${textStyles}`}>
        {text}
      </FunTypography>
    </div>
  )
}