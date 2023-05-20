import FunTypography from "./FunTypography";

export default function CircleWrapper({ text = "🚀", bgColor = "bg-[#F7C478]", size = "h-6 w-6" }) {
  return (
    <div className={`rounded-full ${size} ${bgColor} flex items-center justify-center`}>
      <FunTypography level={4} overrideStyles="leading-[14px] align-middle pt-[3px] pr-[1px]">
        {text}
      </FunTypography>
    </div>
  )
}