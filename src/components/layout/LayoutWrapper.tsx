import { APP_BG_STYLE, LAYOUT_WIDTH_PX, LAYOUT_HEIGHT_PX } from "@/const/layout";
import { Fragment, ReactNode, useMemo } from "react"
import BottomBarOverlay from "./BottomBarOverlay";
import ToastComponent from "../ToastComponent";
import { useStore } from "../hooks/useStore";
import LoadingSplash from "../LoadingSplash";
import TopBar from "./TopBar";
import type { TopBarProps } from "./TopBar";

interface LayoutWrapperProps {
  children: ReactNode;
  showBottomBar?: boolean;
  topBarProps?: TopBarProps;
}

/**
 * Layout wrapper component
 * Wrap all first layer page components e.g. pages/home/index.tsx using this
 */
export default function LayoutWrapper({ children, showBottomBar = false, topBarProps = {} }: LayoutWrapperProps) {
  const [{ isWalletInfoLoading, isOverlayLoading }] = useStore();
  const opacityClass = useMemo(() => isOverlayLoading ? "opacity-20" : "", [isOverlayLoading]);
  const className = useMemo(() => {
    return `relative w-[360px] h-[600px] ${APP_BG_STYLE} flex flex-col items-center border border-gray-300 shadow-xl rounded-lg`;
  }, []);
  const innerPaddingClass = showBottomBar ? `pb-[64px]` : "";
  return (
    <Fragment>
      {isOverlayLoading || isWalletInfoLoading ? <LoadingSplash /> : null}
      <div className={opacityClass}>
        <div className="flex items-center justify-center h-screen bg-white">
          <div className={className}>
            {!isWalletInfoLoading && (
              <>
                <TopBar {...topBarProps} />
                <div className={`w-full h-full px-6 pt-4 pb-6 overflow-auto ${innerPaddingClass}`}>
                  {children}
                </div>
                {showBottomBar ? <BottomBarOverlay /> : null}
                <ToastComponent />
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}