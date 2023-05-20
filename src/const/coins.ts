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
    icon: null
  },
  [CoinTickerType.USDC]: {
    label: "USD Coin",
    bgClass: "bg-[#2775CA]",
    icon: null
  },
  [CoinTickerType.DAI]: {
    label: "Dai",
    bgClass: "bg-[#F5AC37]",
    icon: null,
  },
  [CoinTickerType.WETH]: {
    label: "WETH",
    bgClass: "bg-[#F5AC37]",
    icon: null,
  },
}
