import FunTypography from "@/components/FunTypography";

export default function CoinsListSection() {
  const coinsList = [
    { ticker: "eth", tokenCount: 20, tokenValue: 20000, deltaPercent: -1.5},
    { ticker: "usdc", tokenCount: 20, tokenValue: 20000, deltaPercent: 2},
    { ticker: "dai", tokenCount: 1, tokenValue: 1000, deltaPercent: 10},
  ]
  return (
    <div>
      <FunTypography level={2} overrideStyles="text-[18px]">Coins</FunTypography>
    </div>
  )
}