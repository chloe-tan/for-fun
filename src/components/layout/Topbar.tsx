import { truncateAndShortenStr } from "@/utils/frontend/utils";
import FunTypography from "../FunTypography";
import CircleWrapper from "../CircleWrapper";
import { SettingsIcon } from "../Icons";

export default function Topbar() {
  return (
    <div className="w-full px-6 py-4 border border-gray-200 flex flex-row justify-between">
      <div><SettingsIcon /></div>
      <div className="flex items-center gap-2 align-middle">
        <CircleWrapper />
        <FunTypography level={3}>Wallet</FunTypography>
        <FunTypography level={4} fontWeight="font-[400]" textColor="text-fgray">{truncateAndShortenStr("0x8D26ccA0D58913932157dD4b294d4C95066172dF", 5, 4)}</FunTypography>
      </div>
    </div>
  )
}