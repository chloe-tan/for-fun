import { erc20Abi, routerABI } from "@/const/abi";
import { CoinTickerDetailMap, CoinTickerType } from "@/const/coins";
import { TxnStatus } from "@/const/txn";
import { BigNumber, ethers } from "ethers";

const FUN_ADDRESS = process.env.FUN_ADDRESS;
const FUN_PRIVATE_KEY = process.env.FUN_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const provider = new ethers.providers.EtherscanProvider("goerli", ETHERSCAN_API_KEY);
const uniswapV2RouterAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';



export async function getEthBalance(address: string, usdPrice: number) {
  const balance: BigNumber = await provider.getBalance(address);
  console.log("balance_", balance);
  const balanceInUSD: number = parseFloat(ethers.utils.formatEther(balance)) * usdPrice;
  return { count: ethers.utils.formatEther(balance), usdAmount: balanceInUSD };
}

// TODO: Better guardrails
export async function getTokenBalance(address: string, ticker: CoinTickerType, usdPrice: number) {
  const { tokenAddress, decimals } = CoinTickerDetailMap?.[ticker];
  try {
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

// Estimate the gas required for the swap
export async function estimateGas() {
  try {
    // Set the swap details
    // const tokenIn = CoinTickerDetailMap[CoinTickerType.ETH].tokenAddress; // Address of the token you're swapping from
    // const tokenOut = CoinTickerDetailMap[CoinTickerType.USDC].tokenAddress; // Address of the token you're swapping to
    const tokenIn = '0xDA5B056Cfb861282B4b59d29c9B395bcC238D29B';
    const tokenOut = '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b';

    const amountIn = ethers.utils.parseUnits('1', 18); // Amount of tokenIn to swap
    const amountOutMin = ethers.utils.parseUnits('0', 18); // Minimum amount of tokenOut to receive
    const to = FUN_ADDRESS; // Recipient address
    const deadline = Math.floor(Date.now() / 1000) + 300; // Deadline for the swap (5 minutes from now)

    const wallet = new ethers.Wallet(FUN_PRIVATE_KEY || "", provider);
    const routerContract = new ethers.Contract(uniswapV2RouterAddress, routerABI, wallet);
    const swapFunction = routerContract.functions.swapExactTokensForTokens(
      amountIn,
      amountOutMin,
      [tokenIn, tokenOut],
      to,
      deadline
    ) as any;

    const gasEstimate = await provider.estimateGas(swapFunction);
    console.log('Estimated Gas Limit:', gasEstimate.toString());
    return gasEstimate.toString();
  } catch (error) {
    console.error('Error estimating gas:', error);
  }
}

async function checkTransactionStatus(txHash: string, etherscanApiKey: string) {
  try {
    const provider = new ethers.providers.EtherscanProvider("goerli", etherscanApiKey);
    const receipt = await provider.getTransactionReceipt(txHash);

    if (receipt.status === 1) {
      return TxnStatus.SUCCESS;
    } else if (receipt.status === 0) {
      return TxnStatus.FAIL;
    } else {
      return TxnStatus.PENDING;
    }
  } catch (error) {
    console.error('Error occurred while checking transaction status:', error);
    return 'Error occurred';
  }
}