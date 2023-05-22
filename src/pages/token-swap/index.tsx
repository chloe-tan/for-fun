import { useStore } from "@/components/hooks/useStore";
import useToast from "@/components/hooks/useToast";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import SwapConfirmationStep from "@/components/swap/SwapConfirmationStep";
import SwapSelectionStep from "@/components/swap/SwapSelectionStep";
import { CoinTickerDetailMap, CoinTickerType } from "@/const/coins";
import { HISTORY_ROUTE_BASE, HOME_ROUTE_BASE, TOKEN_SWAP_ROUTE_BASE } from "@/const/routes";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

enum SwapStep {
  SELECTION,
  CONFIRMATION
}

export default function Swap() {
  const router = useRouter();
  const [, { showToastMessage }] = useToast();
  const [{ coinPricesInfo, isCoinPricesInfoLoading }, { setIsOverlayLoading }] = useStore();
  const [step, setStep] = useState<SwapStep>(SwapStep.SELECTION);
  const [selectedFromTicker, setSelectedFromTicker] = useState<CoinTickerType>(CoinTickerType.ETH);
  const [selectedToTicker, setSelectedToTicker] = useState<CoinTickerType | null>(null);
  const [fromTickerAmount, setFromTickerAmount] = useState<number>(0);
  const [toTickerAmountConfirmed, setToTickerAmountConfirmed] = useState<number>(0);

  useEffect(() => {
    if (selectedFromTicker === selectedToTicker) {
      // Reset
      setSelectedToTicker(null);
    }
  }, [selectedFromTicker, selectedToTicker])

  const toTickerAmount = useMemo(() => {
    // Only trigger update if values are valid, coin price is not loading
    if (selectedFromTicker && selectedToTicker && !isCoinPricesInfoLoading) {
      const toPrice = coinPricesInfo?.[CoinTickerDetailMap?.[selectedToTicker]?.cgKey]?.usd;
      const fromPrice = coinPricesInfo?.[CoinTickerDetailMap?.[selectedFromTicker]?.cgKey]?.usd;
      const conversionValue = (fromPrice / toPrice);
      return fromTickerAmount * conversionValue;
    }
    return 0
  }, [coinPricesInfo, fromTickerAmount, isCoinPricesInfoLoading, selectedFromTicker, selectedToTicker]);

  const onClickReview = useCallback(() => {
    // Fix the toTickerAmount
    setToTickerAmountConfirmed(toTickerAmount);
    setStep(SwapStep.CONFIRMATION);
  }, [toTickerAmount]);

  const onClickConfirm = useCallback(() => {  
    // TODO: Fire async txn function
    setIsOverlayLoading(true);
    
    setTimeout(() => {
      router.push(HOME_ROUTE_BASE);
      showToastMessage?.({ message: "Transaction Submitted", suffixAction: () => { router.push(HISTORY_ROUTE_BASE) } })
      setIsOverlayLoading(false);
    }, 5000)
  }, [router, setIsOverlayLoading, showToastMessage])

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
          onClickReview={onClickReview}
        />
      )}
      {step === SwapStep.CONFIRMATION && (
        <SwapConfirmationStep
          selectedFromTicker={selectedFromTicker}
          selectedToTicker={selectedToTicker as CoinTickerType}
          fromTickerAmount={fromTickerAmount}
          // Confirmed value
          toTickerAmount={toTickerAmountConfirmed}
          onClickConfirm={onClickConfirm}
        />
      )}
    </LayoutWrapper>
  )
}