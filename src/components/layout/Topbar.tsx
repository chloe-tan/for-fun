import { truncateAndShortenStr } from "@/utils/frontend/utils";
import FunTypography from "../FunTypography";
import CircleWrapper from "../CircleWrapper";
import { SettingsIcon } from "../Icons";
import { useStore } from "../hooks/useStore";

export default function TopBar() {
  const [{ walletInfo }] = useStore();
  return (
    <div className="w-full px-6 py-[18px] border border-gray-200 flex flex-row justify-between">
      <div><SettingsIcon /></div>
      <div className="flex items-center gap-2 align-middle">
        <CircleWrapper />
        <FunTypography level={3}>Wallet</FunTypography>
        <FunTypography level={4} fontWeight="font-[400]" textColor="text-fgray">{truncateAndShortenStr(walletInfo?.address, 5, 4)}</FunTypography>
      </div>
    </div>
  )
}