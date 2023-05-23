import LayoutWrapper from "@/components/layout/LayoutWrapper";
import WalletInfoSection from "./WalletInfoSection";
import ActionsSection from "./ActionsSection";
import CoinsListSection from "./CoinsListSection";

export default function Home() {
  return (
    <LayoutWrapper showBottomBar={true} title="Home">
      <WalletInfoSection />
      <ActionsSection />
      <CoinsListSection />
    </LayoutWrapper>
  )
}