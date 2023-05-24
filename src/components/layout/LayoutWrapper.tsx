import { APP_BG_STYLE, LAYOUT_WIDTH_PX, LAYOUT_HEIGHT_PX } from "@/const/layout";
import { Fragment, ReactNode, useMemo } from "react"
import BottomBarOverlay from "./BottomBarOverlay";
import ToastComponent from "../ToastComponent";
import { useStore } from "../hooks/useStore";
import TopBar from "./TopBarX";
import LoadingSplash from "../LoadingSplash";
import Head from "next/head";

interface LayoutWrapperProps {
  children: ReactNode;
  showBottomBar?: boolean;
  topBarProps?: any;
  title?: string;
}

/**
 * Layout wrapper component
 * Wrap all first layer page components e.g. pages/home/index.tsx using this
 */
export default function LayoutWrapper({ children, showBottomBar = false, topBarProps = {}, title = "" }: LayoutWrapperProps) {
  const [{ isWalletInfoLoading, isOverlayLoading }] = useStore();
  const opacityClass = useMemo(() => isOverlayLoading ? "opacity-20" : "", [isOverlayLoading]);
  const className = useMemo(() => {
    return `relative w-[360px] h-[600px] ${APP_BG_STYLE} flex flex-col items-center border border-gray-300 shadow-xl rounded-lg`;
  }, []);
  const innerPaddingClass = showBottomBar ? `pb-[64px]` : "";
  const pageTitle = `Fun${title ? ` | ${title}` : ""}`;
  return (
    <Fragment>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:type" content="website" />
        {/* TODO: OgImage metas go here */}
      </Head>
      {isOverlayLoading || isWalletInfoLoading ? <LoadingSplash /> : null}
      <div className={opacityClass}>
        <div className="flex items-center justify-center h-screen bg-white overflow-hidden">
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