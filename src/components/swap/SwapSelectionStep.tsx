import React, { Fragment, useMemo } from "react";
import FunTypography from "../FunTypography";
import FunButton from "../FunButton";
import SwapDivider from "./SwapDivider";
import { CoinTickerType } from "@/const/coins";
import { useStore } from "../hooks/useStore";
import { formatCryptoAndStringify } from "@/utils/frontend/utils";
import FunSelect from "../FunSelect";
import FunInput from "../FunInput";

function FromContainer({ selectedFromTicker, setSelectedFromTicker, fromTickerAmount, setFromTickerAmount }: any) {
  const [{ walletInfo }] = useStore();
  const selectedCoinBalance = useMemo(() => {
    return walletInfo?.coinBalanceInfo?.[selectedFromTicker].balanceCount;
  }, [walletInfo, selectedFromTicker])
  return (
    <div className="flex flex-col gap-6">
      <div id="coin-input" className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <FunTypography level={3} fontWeight="font-normal" textColor="text-fgray">From</FunTypography>
          <FunSelect diffKey="from" selectedTicker={selectedFromTicker} setSelectedTicker={setSelectedFromTicker} />
        </div>
        <div className="flex flex-col items-end max-w-[130px]]">
          <FunTypography level={4} fontWeight="font-normal" textColor="text-fgray" overrideStyles="text-end">Available Balance</FunTypography>
          <FunTypography level={4} fontWeight="font-normal" textColor="text-fblack" overrideStyles="text-end">
            {formatCryptoAndStringify(Number(selectedCoinBalance), selectedFromTicker, true, { softDecimalPrecision: 5})}
          </FunTypography>
        </div>
      </div>
      <div id="amount-input" className="flex flex-1 flex-row items-center justify-end w-full">
        <FunInput inputValue={fromTickerAmount} setInputValue={setFromTickerAmount} />
        <FunTypography level={1} textColor="text-fgray">{selectedFromTicker}</FunTypography>
      </div>
    </div>
  )
}

function ToContainer({ selectedToTicker, setSelectedToTicker }: any) {
  return (
    <div className="flex flex-col gap-6 min-h-[128px]">
      <div id="coin-input" className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <FunTypography level={3} fontWeight="font-normal" textColor="text-fgray">To</FunTypography>
          <FunSelect diffKey="to" selectedTicker={selectedToTicker} setSelectedTicker={setSelectedToTicker} />
        </div>
      </div>
      {selectedToTicker ? (
        <div id="amount-input" className="flex flex-row items-center">
          <FunTypography level={1} textColor="text-fblack">|&nbsp;</FunTypography>
          <FunTypography level={1} textColor="text-fgray">{selectedToTicker}</FunTypography>
        </div>
      ): null}
    </div>
  )
}

interface SwapSelectionStepProps {
  selectedFromTicker: CoinTickerType;
  selectedToTicker: CoinTickerType | null;
  setSelectedFromTicker: React.Dispatch<React.SetStateAction<CoinTickerType>>;
  setSelectedToTicker: React.Dispatch<React.SetStateAction<CoinTickerType | null>>
  fromTickerAmount: number;
  setFromTickerAmount: React.Dispatch<React.SetStateAction<number>>;
  toTickerAmount: number;
  setToTickerAmount: React.Dispatch<React.SetStateAction<number>>;
}

export default function SwapSelectionStep(props: SwapSelectionStepProps) {
  const { 
    selectedFromTicker, 
    selectedToTicker, 
    setSelectedFromTicker, 
    setSelectedToTicker,
    fromTickerAmount,
    setFromTickerAmount,
    toTickerAmount,
    setToTickerAmount,
  } = props;
  const [{ walletInfo }] = useStore();
  const hasInsufficentBalance = useMemo(() => {
    return fromTickerAmount > walletInfo?.coinBalanceInfo?.[selectedFromTicker]?.balanceCount;
  }, [fromTickerAmount, selectedFromTicker, walletInfo?.coinBalanceInfo])
  const isButtonDisabled = useMemo(() => {
    // Form incomplete or insufficient funds
    return !selectedFromTicker || !fromTickerAmount || !selectedToTicker || !toTickerAmount || hasInsufficentBalance;
  }, [fromTickerAmount, hasInsufficentBalance, selectedFromTicker, selectedToTicker, toTickerAmount])
  const buttonText = useMemo(() => {
    return hasInsufficentBalance ? "Insufficient Balance" : "Review";
  }, [hasInsufficentBalance])
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <FunTypography level={2} overrideStyles="pt-2 pb-6">Swap</FunTypography>
        <FromContainer 
          selectedFromTicker={selectedFromTicker} 
          setSelectedFromTicker={setSelectedFromTicker} 
          fromTickerAmount={fromTickerAmount}
          setFromTickerAmount={setFromTickerAmount}
        />
        <SwapDivider />
        <ToContainer selectedToTicker={selectedToTicker} setSelectedToTicker={setSelectedToTicker} />
      </div>
      <FunButton type="primary" text={buttonText} isDisabled={isButtonDisabled} />
    </div>
  )
}