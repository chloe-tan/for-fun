import CircleWrapper from "@/components/CircleWrapper";
import FunTypography from "@/components/FunTypography";
import { useStore } from "@/components/hooks/useStore";
import { formatCurrencyAndStringify } from "@/utils/frontend/utils";
import { useMemo } from "react";

export default function WalletInfoSection() {
  const [{ walletInfo }] = useStore();
  // TODO: use prices in store frontend
  // Sum of all usd balances
  const walletBalance = useMemo(() => {
    return Object.keys(walletInfo?.coinBalanceInfo).reduce((acc, cur) => acc + walletInfo?.coinBalanceInfo?.[cur]?.balanceUsd, 0);
  }, [walletInfo])
  return (
    <div id="wallet-info-section" className="flex flex-col items-center jusitfy-center gap-3">
      <div>
        <CircleWrapper text="🚀" size="h-20 w-20" textLevel={1} textStyles="text-[41px]" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <FunTypography level={3} textColor="text-fgray">Wallet Balance</FunTypography>
        <FunTypography level={1} textColor="text-fblack1">{formatCurrencyAndStringify(walletBalance)}</FunTypography>
      </div>
    </div>
  )
}