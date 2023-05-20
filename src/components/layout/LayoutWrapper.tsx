import { APP_BG_STYLE, LAYOUT_WIDTH_PX, LAYOUT_HEIGHT_PX } from "@/const/layout";
import { ReactNode, useMemo } from "react"
import BottomBarOverlay from "./BottomBarOverlay";
import TopBar from "./TopBar";

interface LayoutWrapperProps {
  children: ReactNode;
  showBottomBar?: boolean;
}

/**
 * Layout wrapper component
 * Wrap all first layer page components e.g. pages/home/index.tsx using this
 */
export default function LayoutWrapper({ children, showBottomBar = false }: LayoutWrapperProps) {
  const className = useMemo(() => {
    return `relative w-[360px] h-[600px] ${APP_BG_STYLE} flex flex-col items-center border border-gray-300 shadow-xl rounded-lg`;
  }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className={className}>
        <TopBar />
        <div className="w-full px-6 py-4 overflow-auto">
          {children}
          {showBottomBar ? <BottomBarOverlay /> : null}
        </div>
      </div>
    </div>
  )
}