import { LAYOUT_WIDTH_PX } from "@/const/layout";
import { ReactNode } from "react"

interface LayoutWrapperProps {
  children: ReactNode;
}

/**
 * Layout wrapper component
 * Wrap all first layer page components e.g. pages/home/index.tsx using this
 */
export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className={`min-w-[${LAYOUT_WIDTH_PX}px] max-w-[${LAYOUT_WIDTH_PX}px] max-h-screen flex flex-col items-center justify-center overflow-auto p-4`}>
        {children}
      </div>
    </div>
  )
}