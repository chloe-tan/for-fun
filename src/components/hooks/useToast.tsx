import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useStore } from './useStore';
import { TxnStatus } from '@/const/txn';
import { useRouter } from 'next/router';

// Maintain a global toast context
const ToastContext = createContext<any>([{}, () => { }, () => { }]);

// Hook
export default function useToast() {
  return useContext(ToastContext);
}

const TOAST_DURATION = 5000;
const defaultToastInfo = {
  prefix: null,
  message: "",
  suffix: null,
  suffixAction: () => { },
} as ToastMessageInfo

export type ToastMessageInfo = {
  prefix: ReactNode;
  message: string;
  suffix: ReactNode;
  suffixAction: (p?:any) => void
}

// Context
export function WithToast({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [{ trackedTxHash, trackedTxHashStatus }] = useStore();
  const [toastMessageInfo, setToastMessageInfo] = useState<ToastMessageInfo>(defaultToastInfo);
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = ({ prefix = null, message = "", suffix = null, suffixAction = () => { } }) => {
    setToastMessageInfo({ prefix, message, suffix, suffixAction });
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
        setToastMessageInfo(defaultToastInfo);
      }, TOAST_DURATION); // Adjust the duration as needed

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showToast]);

  // Tracking tx
  useEffect(() => {
    const curStatus = trackedTxHashStatus.current;
    if (curStatus === TxnStatus.SUCCESS || curStatus === TxnStatus.FAIL) {
      showToastMessage?.({ message: `Transaction ${trackedTxHashStatus.current}`, suffixAction: () => router.push(`https://goerli.etherscan.io/tx/${trackedTxHash}`) })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackedTxHash, trackedTxHashStatus.current])

  const states = {
    showToast,
    toastMessageInfo
  }

  const reducers = {
    showToastMessage
  }

  return (
    <ToastContext.Provider value={[states, reducers]}>
      {children}
    </ToastContext.Provider>
  )
};
