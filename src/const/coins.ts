import { EthIcon, UsdcIcon, DaiIcon } from "@/components/Icons"

export enum CoinTickerType {
  ETH = "ETH",
  USDC = "USDC",
  DAI = "DAI",
  WETH = "WETH",
}

export const CoinTickerDetailMap = {
  [CoinTickerType.ETH]: {
    label: "ETH",
    bgClass: "bg-[#6281E3]",
    icon: EthIcon,
  },
  [CoinTickerType.USDC]: {
    label: "USD Coin",
    bgClass: "bg-[#2775CA]",
    icon: UsdcIcon,
  },
  [CoinTickerType.DAI]: {
    label: "Dai",
    bgClass: "bg-[#F5AC37]",
    icon: DaiIcon,
  },
  // [CoinTickerType.WETH]: {
  //   label: "WETH",
  //   bgClass: "bg-[#F5AC37]",
  //   icon: null,
  // },
}
