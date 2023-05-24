import { useStore } from "@/components/hooks/useStore";
import useToast from "@/components/hooks/useToast";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import SwapConfirmationStep from "@/components/swap/SwapConfirmationStep";
import SwapSelectionStep from "@/components/swap/SwapSelectionStep";
import { CoinTickerDetailMap, CoinTickerType } from "@/const/coins";
import { HISTORY_ROUTE_BASE, HOME_ROUTE_BASE, TOKEN_SWAP_ROUTE_BASE } from "@/const/routes";
import { swapTokens } from "@/utils/funService";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

enum SwapStep {
  SELECTION,
  CONFIRMATION
}

export default function Swap({ swapEnvs }: any) {
  const router = useRouter();
  const [, { showToastMessage }] = useToast();
  const [, { refreshStore, startTrackingTxHash }] = useStore();
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
    if (selectedFromTicker && selectedToTicker && coinPricesInfo) {
      const toPrice = coinPricesInfo?.[CoinTickerDetailMap?.[selectedToTicker]?.cgKey]?.usd;
      const fromPrice = coinPricesInfo?.[CoinTickerDetailMap?.[selectedFromTicker]?.cgKey]?.usd;
      const conversionValue = (fromPrice / toPrice);
      return fromTickerAmount * conversionValue;
    }
    return 0
  }, [coinPricesInfo, fromTickerAmount, selectedFromTicker, selectedToTicker]);

  const onClickReview = useCallback(() => {
    // Fix the toTickerAmount
    setToTickerAmountConfirmed(toTickerAmount);
    setStep(SwapStep.CONFIRMATION);
  }, [toTickerAmount]);

  const onClickConfirm = useCallback(async () => {
    setIsOverlayLoading(true);

    const swapResp = await swapTokens({
      ...swapEnvs,
      swapConfig: {
        in: CoinTickerDetailMap[selectedFromTicker].tokenAddress,
        out: CoinTickerDetailMap[selectedToTicker as CoinTickerType].tokenAddress,
        amount: fromTickerAmount,
      }
    })

    if (!swapResp.success) { // TODO:
      alert('An error occured during the swap. Please try again.')
    }

    if (swapResp.success) {
      const receipt = swapResp.receipt;
      const txHash = receipt.txid;
      const opHash = receipt.ophash;
      router.push(HOME_ROUTE_BASE);
      refreshStore?.(); // fetch latest wallet info
      showToastMessage?.({ message: "Transaction Submitted", suffixAction: () => { window.open(`https://goerli.etherscan.io/tx/${txHash}`, "_blank") } });
      void startTrackingTxHash?.(txHash);
    }

    setIsOverlayLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromTickerAmount, refreshStore, router, selectedFromTicker, selectedToTicker, setIsOverlayLoading, showToastMessage, swapEnvs])

  const onTopbarBack = useCallback(() => {
    if (step === SwapStep.SELECTION) {
      router.push(HOME_ROUTE_BASE);
    } else {
      setStep(SwapStep.SELECTION);
    }
  }, [router, step])

  return (
    <LayoutWrapper topBarProps={{ showBack: true, onBack: onTopbarBack }} title="Swap">
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

export async function getStaticProps() {
  return {
    props: {
      swapEnvs: {
        addressPk: process.env.FUN_PRIVATE_KEY || "",
        funApiKey: process.env.FUN_API_KEY || "",
        sponsorAddress: process.env.SPONSOR_ADDRESS || "",
        walletIndex: process.env.WALLET_INDEX || "",
      }
    },
  };
}
