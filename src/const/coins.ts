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
    tokenAddress: "",
  },
  [CoinTickerType.USDC]: {
    label: "USD Coin",
    bgClass: "bg-[#2775CA]",
    icon: UsdcIcon,
    tokenAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  [CoinTickerType.DAI]: {
    label: "Dai",
    bgClass: "bg-[#F5AC37]",
    icon: DaiIcon,
    tokenAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },
  // [CoinTickerType.WETH]: {
  //   label: "WETH",
  //   bgClass: "bg-[#F5AC37]",
  //   icon: null,
  // },
}
