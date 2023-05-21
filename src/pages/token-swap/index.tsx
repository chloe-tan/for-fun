import FunButton from "@/components/FunButton";
import FunTypography from "@/components/FunTypography";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import SwapConfirmationStep from "@/components/swap/SwapConfirmationStep";
import SwapSelectionStep from "@/components/swap/SwapSelectionStep";
import { CoinTickerType } from "@/const/coins";
import { useState } from "react";

enum SwapStep {
  SELECTION,
  CONFIRMATION
}

export default function Swap() {

  const [step, setStep] = useState<SwapStep>(SwapStep.SELECTION);
  const [selectedFromTicker, setSelectedFromTicker] = useState<CoinTickerType>(CoinTickerType.ETH);
  const [selectedToTicker, setSelectedToTicker] = useState<CoinTickerType | null>(null);

  return (
    <LayoutWrapper topBarProps={{ showBack: true }}>
      {step === SwapStep.SELECTION && <SwapSelectionStep selectedFromTicker={selectedFromTicker} setSelectedFromTicker={setSelectedFromTicker} selectedToTicker={selectedToTicker} setSelectedToTicker={setSelectedToTicker} />}
      {step === SwapStep.CONFIRMATION && <SwapConfirmationStep />}
    </LayoutWrapper>
  )
}