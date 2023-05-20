import LayoutWrapper from "@/components/layout/LayoutWrapper";
import WalletInfoSection from "./WalletInfoSection";
import ActionsSection from "./ActionsSection";
import CoinsListSection from "./CoinsListSection";
import { Fragment } from "react";

export default function Home() {
  return (
    <LayoutWrapper showBottomBar={true}>
      <WalletInfoSection />
      <ActionsSection />
      <CoinsListSection />
    </LayoutWrapper>
  )
}