import CircleWrapper from "@/components/CircleWrapper";
import FunTypography from "@/components/FunTypography";

export default function WalletInfoSection() {
  return (
    <div id="wallet-info-section" className="flex flex-col items-center jusitfy-center gap-3">
      <div>
        <CircleWrapper text="🚀" size="h-20 w-20" textLevel={1} textStyles="text-[42px]" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <FunTypography level={3} textColor="text-fgray">Wallet Balance</FunTypography>
        <FunTypography level={1} textColor="text-fblack1">$10,000</FunTypography>
      </div>
    </div>
  )
}