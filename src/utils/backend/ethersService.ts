import axios from 'axios';
import { BigNumber } from "ethers";

const { ethers } = require('ethers');
const provider = ethers.getDefaultProvider('goerli');

const tokenAbi = [
  // Standard ERC20 ABI
  'function balanceOf(address) view returns (uint)',
];

async function getEthPriceInUSD(): Promise<number> {
  const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
  const ethPriceUSD: number = response.data.ethereum.usd;
  return ethPriceUSD;
}

async function getTokenPriceInUSD(tokenId: string): Promise<number> {
  const response = await axios.get(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenId}&vs_currencies=usd`);
  const tokenPriceUSD: number = response.data[tokenId.toLowerCase()].usd;
  return tokenPriceUSD;
}


export async function getEthBalance(address: string) {
  const balance: BigNumber = await provider.getBalance(address);
  console.log("balance_", balance);
  const ethPriceUSD: number = await getEthPriceInUSD();
  const balanceInUSD: number = parseFloat(ethers.utils.formatEther(balance)) * ethPriceUSD;
  return { count: ethers.utils.formatEther(balance), usdAmount: balanceInUSD };
}

// TODO: Better guardrails
export async function getTokenBalance(address: string, tokenAddress: string) {
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
  const balance = await tokenContract.balanceOf(address);
  const tokenPriceUSD: number = await getTokenPriceInUSD(tokenAddress);
  const balanceInUSD: number = parseFloat(ethers.utils.formatEther(balance)) * tokenPriceUSD;
  return { count: ethers.utils.formatEther(balance), usdAmount: balanceInUSD };
}