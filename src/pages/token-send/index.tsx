import FunTypography from "@/components/FunTypography";
import FunUnsupported from "@/components/FunUnsupported";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function Send() {
  return (
    <LayoutWrapper topBarProps={{ showBack: true }}>
      <div className="flex flex-col gap-3">
        <FunTypography level={2} overrideStyles="pt-2 pb-2">Send</FunTypography>
        <FunUnsupported />
      </div>
    </LayoutWrapper>
  )
}