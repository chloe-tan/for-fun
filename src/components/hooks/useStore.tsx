import { WalletInfo } from "@/const/wallet";
import { getCoinPricesInUSD } from "@/utils/common/coingeckoService";
import { getWalletInfo } from "@/utils/frontend/fetchFromApiService";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext<any>([{}, () => { }, () => { }]);

export function useStore() {
  return useContext(StoreContext);
}

export function WithStore({ children }: { children: ReactNode }) {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>(null);
  const [coinPricesInfo, setCoinPricesInfo] = useState<any>(null);
  const [isCoinPricesInfoLoading, setIsCoinPricesInfoLoading] = useState<any>(true);
  const [isWalletInfoLoading, setIsWalletInfoLoading] = useState(true);
  const [reloadCounter, setReloadCounter] = useState(0);
  const refreshStore = () => setReloadCounter((prev) => prev + 1);

  async function getCoinPricesInfo() {
    setIsCoinPricesInfoLoading(true);
    const info = await getCoinPricesInUSD();
    setCoinPricesInfo(info);
    // To prevent flashing if it loads too fast lol
    setTimeout(() => {
      setIsCoinPricesInfoLoading(false);
    }, 2000);
  }

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
    
    // Fire every 15 seconds to get up to date price info
    const interval = setInterval(getCoinPricesInfo, 15000);
    
    !walletInfo && fetchWallet().catch(console.error);

    return () => {
      clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StoreContext.Provider value={[{ walletInfo, isWalletInfoLoading, coinPricesInfo, isCoinPricesInfoLoading }, { refreshStore }]}>
      {children}
    </StoreContext.Provider>
  );
}
