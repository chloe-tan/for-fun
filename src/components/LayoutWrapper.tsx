import { APP_BG_STYLE, LAYOUT_WIDTH_PX, LAYOUT_HEIGHT_PX } from "@/const/layout";
import { ReactNode, useMemo } from "react"

interface LayoutWrapperProps {
  children: ReactNode;
}

/**
 * Layout wrapper component
 * Wrap all first layer page components e.g. pages/home/index.tsx using this
 */
export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const className = useMemo(() => {
    return `w-[360px] h-[600px] ${APP_BG_STYLE} flex flex-col items-center justify-center border border-gray-300 shadow-xl rounded-lg overflow-auto p-4`;
  }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className={className}>
        {children}
      </div>
    </div>
  )
}