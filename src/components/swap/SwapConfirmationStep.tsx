import FunButton from "../FunButton";
import { CoinTickerDetailMap, CoinTickerType } from "@/const/coins";
import CircleWrapper from "../CircleWrapper";
import FunTypography from "../FunTypography";
import SwapDivider from "./SwapDivider";
import { formatCryptoAndStringify, formatCurrencyAndStringify } from "@/utils/utils";
import { useMemo } from "react";
import { useStore } from "../hooks/useStore";

function LineItem({ ticker, amount }: { ticker: CoinTickerType; amount: number }) {
  return (
    <div className="flex flex-row px-3 justify-between items-center">
      <div className="flex flex-row gap-4 items-center">
        <CircleWrapper size="h-10 w-10" text={CoinTickerDetailMap[ticker].icon?.()} bgColor={CoinTickerDetailMap[ticker].bgClass}></CircleWrapper>
        <FunTypography level={3} textColor="text-fblack">{ticker}</FunTypography>
      </div>
      <div>
        <FunTypography level={4} fontWeight="font-normal" textColor="text-fblack">{formatCryptoAndStringify(Number(amount), ticker)}</FunTypography>
      </div>
    </div>
  )
}

function SwapOverview(props: SwapConfirmationStepProps) {
  const { selectedFromTicker, fromTickerAmount, selectedToTicker, toTickerAmount } = props;
  return (
    <div className="pb-6">
      <div className="flex flex-col py-2 pb-8 items-center gap-3">
        <CircleWrapper size="h-12 w-12" text={CoinTickerDetailMap[selectedFromTicker].icon?.()} bgColor={CoinTickerDetailMap[selectedFromTicker].bgClass}></CircleWrapper>
        <FunTypography level={2} textColor="font-fblack" overrideStyles="text-[24px] leading-[32px]">Swapping</FunTypography>
      </div>
      <div>
        <LineItem ticker={selectedFromTicker} amount={fromTickerAmount} />
        <div className="px-6"><SwapDivider /></div>
        <LineItem ticker={selectedToTicker} amount={toTickerAmount} />
      </div>
    </div>
  )
}

// Using gas estimate consts on 24 may. TODO: Live queries.
const avgUniswapGasInGwei = 129819 // Checking aginst uniswapv2: https://crypto.com/defi/dashboard/gas-fees
const pricePerGasInGwei = 40; // https://ethereumprice.org/gas/
const priceOfGweiInEth = 10e-9;
const gasFeeEstimateInEth = avgUniswapGasInGwei * pricePerGasInGwei * priceOfGweiInEth;

// Currently only support gas payment in eth
function SwapCostBreakdown() {
  const [{ coinPricesInfo }] = useStore();
  const gasFeeEstimateInUsd = useMemo(() => {
    const priceOfEthInUsd = coinPricesInfo?.[CoinTickerDetailMap?.[CoinTickerType.ETH]?.cgKey]?.usd;
    return gasFeeEstimateInEth * priceOfEthInUsd;
  }, [coinPricesInfo])
  return (
    <div className="flex flex-col gap-4 pb-6">
      <FunTypography level={4} textColor="text-fblack">Cost</FunTypography>
      <div id="gas" className="flex flex-row justify-between items-align">
        <FunTypography level={4} textColor="text-fgray" fontWeight="font-normal">Gas Fee</FunTypography>
        <div className="flex flex-row">
          <FunTypography level={4} textColor="text-fgray" fontWeight="font-normal">{formatCryptoAndStringify(Number(gasFeeEstimateInEth), CoinTickerType.ETH)} •&nbsp;</FunTypography>
          <FunTypography level={4} textColor="text-fblack" fontWeight="font-normal">{formatCurrencyAndStringify(gasFeeEstimateInUsd)}</FunTypography>
        </div>
      </div>
      <hr className="bg-[#00000014]" />
      <div id="total" className="flex flex-row justify-between items-align">
        <FunTypography level={4} textColor="text-fblack">Total</FunTypography>
        <div className="flex flex-row">
          <FunTypography level={4} textColor="text-fgray">{formatCryptoAndStringify(Number(gasFeeEstimateInEth), CoinTickerType.ETH)} •&nbsp;</FunTypography>
          <FunTypography level={4} textColor="text-fblack">{formatCurrencyAndStringify(gasFeeEstimateInUsd)}</FunTypography>
        </div>
      </div>
    </div>
  )
}


interface SwapConfirmationStepProps {
  selectedFromTicker: CoinTickerType;
  selectedToTicker: CoinTickerType;
  fromTickerAmount: number;
  toTickerAmount: number;
  onClickConfirm: (p?: any) => void;
}

export default function SwapConfirmationStep(props: SwapConfirmationStepProps) {
  return (
    <div className="flex flex-col h-full mb-4">
      <SwapOverview {...props} />
      <SwapCostBreakdown />
      <FunButton type="primary" text="Confirm & Swap" onClick={props.onClickConfirm} />
    </div>
  )
}