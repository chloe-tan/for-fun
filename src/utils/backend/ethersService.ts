import axios from 'axios';
import { BigNumber } from "ethers";
import { getEthPriceInUSD, getTokenPriceInUSD } from '../common/coingeckoService';

const { ethers } = require('ethers');
const provider = ethers.getDefaultProvider('goerli');

const tokenAbi = [
  // Standard ERC20 ABI
  'function balanceOf(address) view returns (uint)',
];

export async function getEthBalance(address: string) {
  const balance: BigNumber = await provider.getBalance(address);
  console.log("balance_", balance);
  const { ethPriceUSD, usdDelta } = await getEthPriceInUSD();
  const balanceInUSD: number = parseFloat(ethers.utils.formatEther(balance)) * ethPriceUSD;
  return { count: ethers.utils.formatEther(balance), usdAmount: balanceInUSD, delta: usdDelta };
}

// TODO: Better guardrails
export async function getTokenBalance(address: string, tokenAddress: string) {
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
  const balance = await tokenContract.balanceOf(address);
  const tokenPriceUSD: number = await getTokenPriceInUSD(tokenAddress);
  const balanceInUSD: number = parseFloat(ethers.utils.formatEther(balance)) * tokenPriceUSD;
  // TODO: Delta
  return { count: ethers.utils.formatEther(balance), usdAmount: balanceInUSD, delta: 0 };
}