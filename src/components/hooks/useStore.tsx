import { TxnStatus } from "@/const/txn";
import { WalletInfo } from "@/const/wallet";
import { getCoinPricesInUSD } from "@/utils/coingeckoService";
import { getWalletInfo } from "@/utils/fetchFromApiService";
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from "react";

const StoreContext = createContext<any>([{}, () => { }, () => { }]);

export function useStore() {
  return useContext(StoreContext);
}

export function WithStore({ children }: { children: ReactNode }) {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>(null);
  const [coinPricesInfo, setCoinPricesInfo] = useState<any>(null);
  const [isCoinPricesInfoLoading, setIsCoinPricesInfoLoading] = useState<any>(true);
  const [isWalletInfoLoading, setIsWalletInfoLoading] = useState(true);
  const [isOverlayLoading, setIsOverlayLoading] = useState<boolean>(false);
  const [reloadCounter, setReloadCounter] = useState(0);
  const refreshStore = () => setReloadCounter((prev) => prev + 1);

  // For tracking
  const [trackedTxHash, setTrackedTxHash] = useState<string|null>(null);
  const trackedTxHashStatus = useRef<TxnStatus>(TxnStatus.PENDING);

  async function getCoinPricesInfo() {
    setIsCoinPricesInfoLoading(true);
    const info = await getCoinPricesInUSD();
    setCoinPricesInfo(info);
    // To prevent flashing if it loads too fast lol
    setTimeout(() => {
      setIsCoinPricesInfoLoading(false);
    }, 1000);
  }

  async function fetchWallet(isSilent = false) {
    !isSilent && setIsWalletInfoLoading(true);
    const walletInfo: WalletInfo = await getWalletInfo();
    if (walletInfo) {
      setWalletInfo(walletInfo);
    } else {
      setWalletInfo(null);
    }
    setIsWalletInfoLoading(false);
  }

  // Run once on component mount
  // We assume user is already logged in
  useEffect(() => {
    // Fire every 15 seconds to get up to date price info
    const interval = setInterval(getCoinPricesInfo, 10000);
    !walletInfo && fetchWallet(false).catch(console.error);

    return () => {
      clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchWallet(true);
  }, [reloadCounter])

  function startTrackingTxHash(txnHash: string) {
    // Do tracking
    setTrackedTxHash(txnHash);
    // TODO: Interval to ping etherscan api to check on status of txn
  }

  const states = {
    walletInfo, 
    isWalletInfoLoading, 
    coinPricesInfo, 
    isCoinPricesInfoLoading,
    isOverlayLoading,
    trackedTxHash,
    trackedTxHashStatus,
  }

  const reducers = {
    refreshStore,
    setIsOverlayLoading,
    startTrackingTxHash,
  }

  return (
    <StoreContext.Provider value={[states, reducers]}>
      {children}
    </StoreContext.Provider>
  );
}
