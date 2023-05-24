import { truncateAndShortenStr } from "@/utils/utils";
import FunTypography from "../FunTypography";
import CircleWrapper from "../CircleWrapper";
import { LeftArrowIcon, SettingsIcon } from "../Icons";
import { useStore } from "../hooks/useStore";
import { useRouter } from "next/router";
import FunButton from "../FunButton";
import { useCallback } from "react";

interface TopBarProps {
  showBack?: boolean;
  onBack?: (p?: any) => void;
}

export default function TopBar({ showBack = false, onBack }: TopBarProps) {
  const router = useRouter();
  const [{ walletInfo }] = useStore();
  const py = showBack ? "py-6" : "py-[18px]";
  const handleOnClick = useCallback(() => {
    onBack ? onBack?.() : router?.back();
  }, [onBack, router]);
  return (
    <div className={`w-full px-6 ${py} border border-gray-200 flex flex-row justify-between`}>
      <div>
        {showBack ? (
          <FunButton text="Back" type="link" prefixIcon={<LeftArrowIcon />} styleClass="py-0 px-0" textFontWeight="font-normal" onClick={handleOnClick} />
        ): (
          <SettingsIcon />
        )}
      </div>
      <div className="flex items-center gap-2 align-middle">
        <CircleWrapper />
        <FunTypography level={3}>Wallet</FunTypography>
        <FunTypography 
          level={4} 
          fontWeight="font-[400]" 
          textColor="text-fgray" 
          tooltipText={walletInfo?.address}
        >
          {truncateAndShortenStr(walletInfo?.address, 5, 4)}
        </FunTypography>
      </div>
    </div>
  )
}