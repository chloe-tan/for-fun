import { EthIcon, UsdcIcon, DaiIcon } from "@/components/Icons"

export enum CoinTickerType {
  ETH = "ETH",
  USDC = "USDC",
  DAI = "DAI",
  // WETH = "WETH",
}

export const CoinTickerDetailMap = {
  [CoinTickerType.ETH]: {
    label: "ETH",
    bgClass: "bg-[#6281E3]",
    icon: EthIcon,
    tokenAddress: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    cgKey: "ethereum",
    decimals: 18,
  },
  [CoinTickerType.USDC]: {
    label: "USD Coin",
    bgClass: "bg-[#2775CA]",
    icon: UsdcIcon,
    tokenAddress: "0xaa8958047307da7bb00f0766957edec0435b46b5", // goerli
    cgKey: "usd-coin",
    decimals: 6,
  },
  [CoinTickerType.DAI]: {
    label: "Dai",
    bgClass: "bg-[#F5AC37]",
    icon: DaiIcon,
    tokenAddress: "0x855af47cdf980a650ade1ad47c78ec1deebe9093", // goerli
    cgKey: "dai",
    decimals: 6,
  },
  // [CoinTickerType.WETH]: {
  //   label: "WETH",
  //   bgClass: "bg-[#F5AC37]",
  //   icon: null,
  // },
}
