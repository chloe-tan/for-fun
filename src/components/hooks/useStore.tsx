import { WalletInfo } from "@/const/wallet";
import { getWalletInfo } from "@/utils/frontend/fetchFromApiService";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext<any>([{}, () => { }, () => { }]);

export function useStore() {
  return useContext(StoreContext);
}

export function WithStore({ children }: { children: ReactNode }) {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>(null);
  const [isWalletInfoLoading, setIsWalletInfoLoading] = useState(true);
  const [reloadCounter, setReloadCounter] = useState(0);
  const refreshStore = () => setReloadCounter((prev) => prev + 1);

  // Run once on component mount
  // We assume user is already logged in
  useEffect(() => {
    async function fetchWallet() {
      setIsWalletInfoLoading(true);
      const walletInfo: WalletInfo = await getWalletInfo();
      if (walletInfo) {
        setWalletInfo(walletInfo);
      } else {
        setWalletInfo(null);
      }
      setIsWalletInfoLoading(false);
    }
    !walletInfo && fetchWallet().catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StoreContext.Provider value={[{ walletInfo, isWalletInfoLoading }, { refreshStore }]}>
      {children}
    </StoreContext.Provider>
  );
}
