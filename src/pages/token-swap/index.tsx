import FunTypography from "@/components/FunTypography";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function Swap() {
  return (
    <LayoutWrapper topBarProps={{ showBack: true }}>
      <div className="flex flex-col gap-3">
        <FunTypography level={2}>Swap</FunTypography>
      </div>
    </LayoutWrapper>
  )
}