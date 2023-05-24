import { CoinTickerDetailMap, CoinTickerType } from "@/const/coins";
import { CoinListItem } from "@/pages/home/CoinsListSection";
import FunTypography from "./FunTypography";
import { useCallback, useMemo, useState } from "react";
import CircleWrapper from "./CircleWrapper";
import { ChevronDownIcon } from "./Icons";

function CoinMenuPopoverContent({ selectedTicker, onChangeSelection, hideTickers }: { selectedTicker: CoinTickerType; onChangeSelection: Function; hideTickers: CoinTickerType[] }) {
  return (
    <div>
      <div className="flex flex-col p-3 gap-1 z-20 w-full bg-white rounded-[16px]">
        {Object.keys(CoinTickerType).filter((coinTicker: string) => !hideTickers.includes(coinTicker as CoinTickerType)).map((coinTicker) => {
          const isActive = selectedTicker === coinTicker;
          return (
            <div
              key={coinTicker}
              className={`px-3 rounded-[12px] ${isActive ? "bg-[#00000014]" : "bg-transparent"} hover:bg-gray-200`}
              onClick={() => !isActive && onChangeSelection?.(coinTicker)}
            >
              <CoinListItem coinItem={{ ticker: coinTicker }} showBalance={false} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface FunCoinSelectProps {
  selectedTicker: CoinTickerType;
  setSelectedTicker: React.Dispatch<React.SetStateAction<CoinTickerType | null>>
  showPlaceholderOption?: boolean;
  diffKey: string;
  hideTickers?: CoinTickerType[];
}

// TODO: Further abstract into a general select component
export default function FunCoinSelect({ selectedTicker, setSelectedTicker, diffKey = "", hideTickers = [] }: FunCoinSelectProps) {

  const selectContainerId = `selected-container-${diffKey}`
  const menuContainerId = `option-menu-popup-${diffKey}`
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const handleOpenMenu = useCallback(() => setIsMenuOpened(true), []);
  const handleCloseMenu = useCallback(() => setIsMenuOpened(false), []);

  function clickListener(e: MouseEvent) {
    const clickedContainer = e.target;
    const selectContainer = document.getElementById(selectContainerId);
    const menuContainer = document.getElementById(menuContainerId);
    // @ts-ignore
    if ((selectContainer && selectContainer?.contains?.(clickedContainer)) || (menuContainer && menuContainer?.contains?.(clickedContainer))) {
      handleOpenMenu();
      return;
    }
    // All other clicks should close the menu
    handleCloseMenu();
  }

  // @ts-ignore
  window.addEventListener('click', clickListener.bind(this));

  const onChangeSelection = useCallback((newSelection: any) => {
    setSelectedTicker(newSelection);
    handleCloseMenu();
  }, [setSelectedTicker, handleCloseMenu]);

  return (
    <div className="">
      <div
        id={selectContainerId}
        onClick={handleOpenMenu}
        className={`
          flex flex-row gap-4 justify-between items-center 
          p-2 rounded-[100px] shadow-sm focus:outline-none focus:ring-2 
          focus:ring-blue-600 focus:border-blue-600 bg-[#F2F2F2] 
          hover:opacity-70 cursor-pointer ${isMenuOpened ? "bg-gray-300" : "bg-[#F2F2F2]"}`
        }
      >
        <div className="flex flex-row flex-no-wrap gap-2">
          <CircleWrapper
            bgColor={CoinTickerDetailMap?.[selectedTicker]?.bgClass || "bg-[#00000014]"}
            text={CoinTickerDetailMap[selectedTicker]?.iconSmall?.() || ""}
          />
          <FunTypography fontWeight="font-normal" textColor="text-fblack">{selectedTicker || "Choose Coin"}</FunTypography>
        </div>
        <ChevronDownIcon sizeClass="h-5 w-4" />
      </div>
      {isMenuOpened ? (
        <div id={menuContainerId} className="fixed z-50 mt-2 w-[312px] rounded-[16px] left-[50%] transform translate-x-[-50%] shadow-md border">
          <CoinMenuPopoverContent selectedTicker={selectedTicker} onChangeSelection={onChangeSelection} hideTickers={hideTickers} />
        </div>
      ) : null}
    </div>
  )
}