import CircleWrapper from "../CircleWrapper"
import { SwapIcon } from "../Icons"

function Line() {
  return (
    <div className="h-[1px] rounded-[16px] bg-gray-300 flex flex-1" />
  )
}

export default function SwapDivider() {
  return (
    <div className="flex flex-row gap-4 w-full items-center py-6">
      <Line />
      <CircleWrapper size="h-9 w-9" bgColor="bg-white" wrapperStyles="shadow-sm border border-gray-200" text={<SwapIcon sizeClass="h-5 w-5" />} />
      <Line />
    </div>
  )
}