import { ReactNode } from "react";
import FunTypography from "./FunTypography";

interface CircleWrapperProps {
  text?: ReactNode;
  bgColor?: string;
  size?: string;
  textLevel?: number;
  textStyles?: string;
  wrapperStyles?: string;
}

export default function CircleWrapper({ text = "🚀", bgColor = "bg-[#F7C478]", size = "h-6 w-6", textLevel = 4, textStyles = "", wrapperStyles = "" }: CircleWrapperProps) {
  return (
    <div className={`rounded-full ${size} ${bgColor} flex items-center justify-center ${wrapperStyles}`}>
      <FunTypography level={textLevel} overrideStyles={`leading-[14px] align-middle ${textStyles}`}>
        {text}
      </FunTypography>
    </div>
  )
}