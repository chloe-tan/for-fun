import { truncateAndShortenStr } from "@/utils/frontend/utils";
import FunTypography from "../FunTypography";
import CircleWrapper from "../CircleWrapper";
import { LeftArrowIcon, SettingsIcon } from "../Icons";
import { useStore } from "../hooks/useStore";
import { useRouter } from "next/router";
import FunButton from "../FunButton";

export interface TopBarProps {
  showBack?: boolean;
}

export default function TopBar({ showBack = false }: TopBarProps) {
  const router = useRouter();
  const [{ walletInfo }] = useStore();
  return (
    <div className="w-full px-6 py-[18px] border border-gray-200 flex flex-row justify-between">
      <div>
        {showBack ? (
          <FunButton text="Back" type="link" prefixIcon={<LeftArrowIcon />} styleClass="p-0" textClass="font-normal" onClick={() => router?.back()} />
        ): (
          <SettingsIcon />
        )}
      </div>
      <div className="flex items-center gap-2 align-middle">
        <CircleWrapper />
        <FunTypography level={3}>Wallet</FunTypography>
        <FunTypography level={4} fontWeight="font-[400]" textColor="text-fgray">{truncateAndShortenStr(walletInfo?.address, 5, 4)}</FunTypography>
      </div>
    </div>
  )
}