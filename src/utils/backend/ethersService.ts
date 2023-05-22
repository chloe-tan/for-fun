import { BigNumber } from "ethers";

const { ethers } = require('ethers');
const provider = ethers.getDefaultProvider('goerli');

const tokenAbi = [
  // Standard ERC20 ABI
  'function balanceOf(address) view returns (uint)',
];

export async function getEthBalance(address: string, usdPrice: number) {
  const balance: BigNumber = await provider.getBalance(address);
  console.log("balance_", balance);
  const balanceInUSD: number = parseFloat(ethers.utils.formatEther(balance)) * usdPrice;
  return { count: ethers.utils.formatEther(balance), usdAmount: balanceInUSD };
}

// TODO: Better guardrails
export async function getTokenBalance(address: string, tokenAddress: string, usdPrice: number) {
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
  const balance = await tokenContract.balanceOf(address);
  const balanceInUSD: number = parseFloat(ethers.utils.formatEther(balance)) * usdPrice;
  // TODO: Delta
  return { count: ethers.utils.formatEther(balance), usdAmount: balanceInUSD };
}