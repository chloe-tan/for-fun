import FunButton from "@/components/FunButton";
import FunTypography from "@/components/FunTypography";
import { useStore } from "@/components/hooks/useStore";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import SwapConfirmationStep from "@/components/swap/SwapConfirmationStep";
import SwapSelectionStep from "@/components/swap/SwapSelectionStep";
import { CoinTickerDetailMap, CoinTickerType } from "@/const/coins";
import { getCoinPricesInUSD } from "@/utils/common/coingeckoService";
import { useEffect, useMemo, useState } from "react";

enum SwapStep {
  SELECTION,
  CONFIRMATION
}

export default function Swap() {

  const [{ coinPricesInfo, isCoinPricesInfoLoading }] = useStore();
  const [step, setStep] = useState<SwapStep>(SwapStep.SELECTION);
  const [selectedFromTicker, setSelectedFromTicker] = useState<CoinTickerType>(CoinTickerType.ETH);
  const [selectedToTicker, setSelectedToTicker] = useState<CoinTickerType | null>(null);
  const [fromTickerAmount, setFromTickerAmount] = useState<number>(0);

  useEffect(() => {
    if (selectedFromTicker === selectedToTicker) {
      // Reset
      setSelectedToTicker(null);
    }
  }, [selectedFromTicker, selectedToTicker])

  const toTickerAmount = useMemo(() => {
    if (selectedFromTicker && selectedToTicker && !isCoinPricesInfoLoading) {
      const toPrice = coinPricesInfo?.[CoinTickerDetailMap?.[selectedToTicker]?.cgKey]?.usd;
      const fromPrice = coinPricesInfo?.[CoinTickerDetailMap?.[selectedFromTicker]?.cgKey]?.usd;
      const conversionValue = (fromPrice / toPrice); 
      return fromTickerAmount * conversionValue;
    }
    return 0
  }, [coinPricesInfo, fromTickerAmount, isCoinPricesInfoLoading, selectedFromTicker, selectedToTicker]);

  return (
    <LayoutWrapper topBarProps={{ showBack: true }}>
      {step === SwapStep.SELECTION && (
        <SwapSelectionStep 
          selectedFromTicker={selectedFromTicker} 
          setSelectedFromTicker={setSelectedFromTicker} 
          selectedToTicker={selectedToTicker} 
          setSelectedToTicker={setSelectedToTicker} 
          fromTickerAmount={fromTickerAmount}
          toTickerAmount={toTickerAmount}
          setFromTickerAmount={setFromTickerAmount}
        />
      )}
      {step === SwapStep.CONFIRMATION && <SwapConfirmationStep />}
    </LayoutWrapper>
  )
}