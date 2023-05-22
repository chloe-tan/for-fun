import CircleWrapper from "@/components/CircleWrapper";
import FunTypography from "@/components/FunTypography";
import { useStore } from "@/components/hooks/useStore";
import { CoinTickerDetailMap, CoinTickerType } from "@/const/coins";
import { formatCryptoAndStringify, formatCurrencyAndStringify, formatNumberAndStringify } from "@/utils/frontend/utils";
import { useMemo } from "react";

function DeltaTag({ deltaValue = 0 }) {
  if (deltaValue === 0) return null;

  const deltaText = formatNumberAndStringify(deltaValue, { softDecimalPrecision: 2 });
  const bgClass = deltaValue < 0 ? 'bg-[#CE383814]' : 'bg-[#38CE6E14]'
  const textClass = deltaValue < 0 ? 'text-fred' : 'text-fgreen';
  const renderText = deltaValue < 0 ? `${deltaText}%` : `+${deltaText}%`;
  return (
    <div className={`flex ${bgClass} rounded-1 px-1 ${textClass}`}>
      <FunTypography level={4} textColor={textClass} fontWeight="font-normal">
        {renderText}
      </FunTypography>
    </div>
  )
}

export function CoinListItem({ coinItem, showBalance }: { coinItem: any; showBalance: boolean }) {
  
  const wrapperClassName = `flex flex-row py-2 justify-between items-center`;
  
  return (
    <div className={wrapperClassName}>
      <div id="left-container" className="flex flex-row gap-4 items-center">
        <CircleWrapper size="h-10 w-10" bgColor={CoinTickerDetailMap[coinItem.ticker as CoinTickerType].bgClass} text={CoinTickerDetailMap[coinItem.ticker as CoinTickerType]?.icon?.()} textStyles="pt-0 pr-0" />
        <div className="flex flex-col justify-center">
          <FunTypography fontWeight="font-normal">{CoinTickerDetailMap?.[coinItem.ticker as CoinTickerType].label}</FunTypography>
          <FunTypography level={4} fontWeight="font-normal" textColor="text-fgray">{formatCryptoAndStringify(Number(coinItem.balance), coinItem.ticker)}</FunTypography>
        </div>
      </div>
      {showBalance && (
        <div id="right-container" className="flex flex-col justify-center items-end">
          <FunTypography fontWeight="font-normal">{formatCurrencyAndStringify(coinItem.balanceValue)}</FunTypography>
          <DeltaTag deltaValue={coinItem.deltaPercent} />
        </div>
      )}
    </div>
  )
}

export default function CoinsListSection() {

  const [{ walletInfo }] = useStore();
  const coinsList = useMemo(() => {
    const coinBalanceInfo = walletInfo?.coinBalanceInfo || {};
    const builtList: any[] = [];
    Object.keys(coinBalanceInfo).forEach((coinTicker) => {
      builtList.push({
        ticker: coinTicker,
        balance: coinBalanceInfo[coinTicker].balanceCount,
        balanceValue: coinBalanceInfo[coinTicker].balanceUsd,
        deltaPercent: coinBalanceInfo[coinTicker].delta,
      })
    })
   return builtList;
  }, [walletInfo])

  return (
    <div>
      <FunTypography level={2} overrideStyles="text-[18px] pb-2">Coins</FunTypography>
      <div className="flex flex-col gap-1">
        {coinsList?.map((coinItem) => (
          <CoinListItem key={coinItem.ticker} coinItem={coinItem} showBalance={true} />
        ))}
      </div>
    </div>
  )
}