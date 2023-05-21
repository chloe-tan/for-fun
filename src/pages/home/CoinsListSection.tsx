import CircleWrapper from "@/components/CircleWrapper";
import FunTypography from "@/components/FunTypography";
import { useStore } from "@/components/hooks/useStore";
import { CoinTickerDetailMap, CoinTickerType } from "@/const/coins";
import { formatCryptoAndStringify } from "@/utils/frontend/utils";
import { useMemo } from "react";

function DeltaTag({ deltaValue = 0 }) {
  if (deltaValue === 0) return null;

  const bgClass = deltaValue < 0 ? 'bg-[#CE383814]' : 'bg-[#38CE6E14]'
  const textClass = deltaValue < 0 ? 'text-fred' : 'text-fgreen';
  const renderText = deltaValue < 0 ? `${deltaValue}%` : `+${deltaValue}%`;
  return (
    <div className={`flex ${bgClass} rounded-1 px-1 ${textClass}`}>
      <FunTypography level={4} textColor={textClass} fontWeight="font-normal">
        {renderText}
      </FunTypography>
    </div>
  )
}

function CoinListItem({ coinItem }: { coinItem: any }) {
  return (
    <div className="flex flex-row py-2 justify-between items-center">
      <div id="left-container" className="flex flex-row gap-4 items-center">
        <CircleWrapper size="h-10 w-10" bgColor={CoinTickerDetailMap[coinItem.ticker as CoinTickerType].bgClass} text={CoinTickerDetailMap[coinItem.ticker as CoinTickerType]?.icon?.()} textStyles="pt-0 pr-0" />
        <div className="flex flex-col justify-center">
          <FunTypography fontWeight="font-normal">{CoinTickerDetailMap?.[coinItem.ticker as CoinTickerType].label}</FunTypography>
          <FunTypography level={4} fontWeight="font-normal" textColor="text-fgray">{formatCryptoAndStringify(coinItem.balance, coinItem.ticker)}</FunTypography>
        </div>
      </div>
      <div id="right-container" className="flex flex-col justify-center items-end">
        <FunTypography fontWeight="font-normal">{coinItem.balanceValue.toLocaleString('en-US', { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</FunTypography>
        <DeltaTag deltaValue={coinItem.deltaPercent} />
      </div>
    </div>
  )
}

export default function CoinsListSection() {

  const [{ walletInfo }] = useStore();
  const coinsList = useMemo(() => {
    return [
      { ticker: CoinTickerType.ETH, balance: walletInfo?.ethBalanceCount, balanceValue: walletInfo?.ethBalanceUsd, deltaPercent: -1.5 },
        { ticker: CoinTickerType.USDC, balance: walletInfo?.usdcBalanceCount, balanceValue: walletInfo?.usdcBalanceUsd, deltaPercent: 2},
        { ticker: CoinTickerType.DAI, balance: walletInfo?.daiBalanceCount, balanceValue: walletInfo?.daiBalanceUsd, deltaPercent: 10}
    ]
  }, [])

  return (
    <div>
      <FunTypography level={2} overrideStyles="text-[18px] pb-2">Coins</FunTypography>
      <div className="flex flex-col gap-1">
        {coinsList?.map((coinItem) => (
          <CoinListItem key={coinItem.ticker} coinItem={coinItem} />
        ))}
      </div>
    </div>
  )
}