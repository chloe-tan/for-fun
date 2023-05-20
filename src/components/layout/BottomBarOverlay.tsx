import { HISTORY_ROUTE_BASE, HOME_ROUTE_BASE } from "@/const/routes"
import { useRouter } from "next/router";
import { HistoryIcon, HomeIcon } from "../Icons"
import { useCallback, useMemo } from "react";

const TABS = {
  HOME: {
    route: HOME_ROUTE_BASE,
    icon: HomeIcon,
  },
  HISTORY: {
    route: HISTORY_ROUTE_BASE,
    icon: HistoryIcon,
  },
} as any;

function TabItem({ tabItem }: { tabItem: any }) {
  const router = useRouter();
  const isActive = useMemo(() => router.pathname === tabItem.route, [router.pathname, tabItem.route]);
  const handleClickTab = useCallback(() => {
    if (!isActive) {
      router.push(tabItem.route);
    }
  }, [isActive, router, tabItem.route]);
  return (
    <div className="flex flex-1 p-5 justify-center bg-transparent hover:bg-[#E4E7ECB3]" onClick={handleClickTab}>
      {tabItem?.icon?.({ colorClass: isActive ? "text-fdark" : "text-fgray"})}
    </div>
  )
}

export default function BottomBarOverlay() {
  return (
    <div className="
      absolute bottom-0 left-0 right-0 z-50 flex flex-row 
      bg-gradient-to-br from-white bg-opacity-48 via-transparent to-transparent bg-[#edf1f499]
      backdrop-filter backdrop-blur-[3.45px] border-t border-gray-300 shadow-md rounded-b-lg"
    >
      {Object.keys(TABS)?.map((tabKey) => <TabItem key={tabKey} tabItem={TABS[tabKey]} /> )}
    </div>
  )
}