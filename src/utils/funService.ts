import { estimateGas } from '@/utils/ethersService';
import { CoinTickerDetailMap, CoinTickerType } from "@/const/coins";
import { getEthBalance, getTokenBalance } from "./ethersService";
import { WalletInfo } from "@/const/wallet";
import { getCoinPricesInUSD } from "./coingeckoService";
const { FunWallet, configureEnvironment } = require("fun-wallet")
const { Eoa } = require("fun-wallet/auth");
const { fundWallet } = require("fun-wallet/utils");
const { GaslessSponsor } = require("fun-wallet/sponsors/GaslessSponsor")

const WALLET_INDEX = process.env.WALLET_INDEX
const FUN_ADDRESS = process.env.FUN_ADDRESS
const PRIVATE_KEY = process.env.FUN_PRIVATE_KEY
const API_KEY = process.env.FUN_API_KEY
const GAS_SPONSOR_ADDRESS = process.env.SPONSOR_ADDRESS

// FIXME: Are there typescript types from fun lib?
let funWallet: any = null;
let auth: any = null;
let uniqueId: any = null;

async function initFunWallet() {
  console.debug("init_fun_wallet_start")
  await configureEnvironment({
    apiKey: API_KEY,
    chain: 5, // TODO: Enums
  })
  console.debug("configure_env")
  auth = await new Eoa({ privateKey: PRIVATE_KEY })
  console.debug("auth_init", auth);
  uniqueId = await auth.getUniqueId()
  console.debug("unique_id", uniqueId);
  funWallet = await new FunWallet({ uniqueId, index: WALLET_INDEX })
  console.debug("fun_wallet_init", funWallet);
  return funWallet.getAddress();
}

export async function estimateSwapGas({ 
  funApiKey, 
  addressPk, 
  walletIndex, 
  swapConfig = {
    inTokenAddress: "0xaa8958047307da7bb00f0766957edec0435b46b5",
    outTokenAddress: "0x855af47cdf980a650ade1ad47c78ec1deebe9093",
    amount: 0.0001, 
  } 
}: any) {
  try {
    await configureEnvironment({
      chain: 5,
      apiKey: funApiKey,
    })
    const auth = new Eoa({ privateKey: addressPk })
    console.log(">wallet_auth", auth);
    const uniqueId = await auth.getUniqueId()
    const wallet = new FunWallet({ uniqueId, index: Number(walletIndex) })
    const gas = await wallet.estimateGas(auth, swapConfig);
    return {
      success: true,
      gasEstimate: gas,
    };
  } catch (err: any) {
    console.log("An error was encountered during swap gas estimate", err.message);
    return {
      success: false,
      gasEstimate: null,
    }
  }
}


export async function swapTokens({ 
  funApiKey, 
  sponsorAddress, 
  addressPk, 
  walletIndex, 
  swapConfig = {
    inTokenAddress: "0xaa8958047307da7bb00f0766957edec0435b46b5",
    outTokenAddress: "0x855af47cdf980a650ade1ad47c78ec1deebe9093",
    amount: 0.0001, 
  } 
}: any) {
  try {
    await configureEnvironment({
      chain: 5,
      apiKey: funApiKey,
    })
    const auth = new Eoa({ privateKey: addressPk })
    console.log(">wallet_auth", auth);
    const uniqueId = await auth.getUniqueId()
    const wallet = new FunWallet({ uniqueId, index: Number(walletIndex) })
    console.log(">wallet", wallet)
    console.log(">wallet_address", await wallet.getAddress());
    const receipt = await wallet.swap(auth, swapConfig);
    console.log("receipt", receipt);
    return {
      success: true,
      receipt: receipt,
    };
  } catch (err: any) {
    console.log("An error was encountered during swap", err.message);
    return {
      success: false,
      receipt: null,
    }
  }
}

export async function getWalletInfo(): Promise<WalletInfo> {
  try {
    // const addr = await FunWallet.getAddress(FUN_ADDRESS, 2, CHAIN_ID, API_KEY)
    // const addr = "0x150aD6F41c2D56c2f6a6bA73560105aA73b5001b";
    // const addr = FUN_ADDRESS;

    const addr = FUN_ADDRESS || "";
    const coinPrices = await getCoinPricesInUSD();
    const [ethData, usdcData, daiData] = await Promise.all([
      getEthBalance(addr, coinPrices?.[CoinTickerDetailMap?.[CoinTickerType.ETH].cgKey]?.usd || 0),
      getTokenBalance(addr, CoinTickerType.USDC, coinPrices?.[CoinTickerDetailMap[CoinTickerType.USDC].cgKey]?.usd || 0),
      getTokenBalance(addr, CoinTickerType.DAI, coinPrices?.[CoinTickerDetailMap[CoinTickerType.DAI].cgKey]?.usd || 0),
    ])

    const returnInfo = {
      address: addr,
      coinBalanceInfo: {
        [CoinTickerType.ETH]: {
          balanceCount: ethData.count,
          balanceUsd: ethData.usdAmount,
          delta: coinPrices?.[CoinTickerDetailMap[CoinTickerType.ETH].cgKey]?.usd_24h_change,
        },
        [CoinTickerType.USDC]: {
          balanceCount: usdcData.count,
          balanceUsd: usdcData.usdAmount,
          delta: coinPrices?.[CoinTickerDetailMap[CoinTickerType.USDC].cgKey]?.usd_24h_change,
        },
        [CoinTickerType.DAI]: {
          balanceCount: daiData.count,
          balanceUsd: daiData.usdAmount,
          delta: coinPrices?.[CoinTickerDetailMap[CoinTickerType.DAI].cgKey]?.usd_24h_change,
        }
      }
    } as WalletInfo;
    return returnInfo;
  } catch (err) {
    console.log(err);
    return null;
  }
}
