import FunTypography from "@/components/FunTypography";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function Home() {
  return (
    <LayoutWrapper>
      <FunTypography level={3}>Wallet Balance</FunTypography>
      <FunTypography level={1}>$10,000</FunTypography>
    </LayoutWrapper>
  )
}