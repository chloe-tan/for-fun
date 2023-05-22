import FunButton from "@/components/FunButton";
import FunTypography from "@/components/FunTypography";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import SwapConfirmationStep from "@/components/swap/SwapConfirmationStep";
import SwapSelectionStep from "@/components/swap/SwapSelectionStep";
import { CoinTickerType } from "@/const/coins";
import { useEffect, useState } from "react";

enum SwapStep {
  SELECTION,
  CONFIRMATION
}

export default function Swap() {

  const [step, setStep] = useState<SwapStep>(SwapStep.SELECTION);
  const [selectedFromTicker, setSelectedFromTicker] = useState<CoinTickerType>(CoinTickerType.ETH);
  const [selectedToTicker, setSelectedToTicker] = useState<CoinTickerType | null>(null);
  const [fromTickerAmount, setFromTickerAmount] = useState<number>(0);
  const [toTickerAmount, setToTickerAmount] = useState<number>(0);

  useEffect(() => {
    // Update conversion to to ticker amount
    console.log("fire")
  }, [fromTickerAmount])

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
          setToTickerAmount={setToTickerAmount}
        />
      )}
      {step === SwapStep.CONFIRMATION && <SwapConfirmationStep />}
    </LayoutWrapper>
  )
}