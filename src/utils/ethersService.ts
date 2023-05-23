import { erc20Abi } from "@/const/abi";
import { CoinTickerDetailMap, CoinTickerType } from "@/const/coins";
import { BigNumber, ethers } from "ethers";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

export async function getEthBalance(address: string, usdPrice: number) {
  const provider = await new ethers.providers.EtherscanProvider("goerli", ETHERSCAN_API_KEY);
  const balance: BigNumber = await provider.getBalance(address);
  console.log("balance_", balance);
  const balanceInUSD: number = parseFloat(ethers.utils.formatEther(balance)) * usdPrice;
  return { count: ethers.utils.formatEther(balance), usdAmount: balanceInUSD };
}

// TODO: Better guardrails
export async function getTokenBalance(address: string, ticker: CoinTickerType, usdPrice: number) {
  const { tokenAddress, decimals } = CoinTickerDetailMap?.[ticker];
  try {
    const provider = await new ethers.providers.EtherscanProvider("goerli", ETHERSCAN_API_KEY);
    const tokenContract = await new ethers.Contract(tokenAddress, erc20Abi, provider);
    const balance = await tokenContract.balanceOf(address);
    const balanceCount: number = Number(ethers.utils.formatUnits(balance, decimals));
    const balanceInUSD: number = balanceCount * usdPrice;
    return { count: balanceCount, usdAmount: balanceInUSD };
  } catch (err: any) {
    console.error("getTokenBalance_error", err.message);
    return { count: 0, usdAmount: 0 }
  }
}