import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// Maintain a global toast context
const ToastContext = createContext<any>([{}, () => { }, () => { }]);

// Hook
export default function useToast() {
  return useContext(ToastContext);
}

const TOAST_DURATION = 3000;
const defaultToastInfo = {
  prefix: null,
  message: "",
  suffix: null,
  suffixAction: () => { },
}

// Context
export function WithToast({ children }: { children: ReactNode }) {
  const [toastMessageInfo, setToastMessageInfo] = useState(defaultToastInfo);
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