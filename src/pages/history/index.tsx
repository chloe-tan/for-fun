import FunTypography from "@/components/FunTypography";
import FunUnsupported from "@/components/FunUnsupported";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function History() {
  return (
    <LayoutWrapper showBottomBar={true}>
      <div className="flex flex-col gap-3">
        <FunTypography level={2}>Transactions</FunTypography>
        <FunUnsupported />
      </div>
    </LayoutWrapper>
  )
}