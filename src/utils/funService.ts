import { CoinTickerDetailMap, CoinTickerType } from "@/const/coins";
import { getEthBalance, getTokenBalance } from "./ethersService";
import { WalletInfo } from "@/const/wallet";
import { getCoinPricesInUSD } from "./coingeckoService";
const { FunWallet, configureEnvironment } = require("fun-wallet")
const { Eoa } = require("fun-wallet/auth");

const WALLET_INDEX = process.env.WALLET_INDEX
const FUN_ADDRESS = process.env.FUN_ADDRESS
const PRIVATE_KEY = process.env.FUN_PRIVATE_KEY
const API_KEY = process.env.FUN_API_KEY

const CHAIN_ID = 5;
const DEFAULT_IN_TOKEN = CoinTickerDetailMap[CoinTickerType.ETH].tokenAddress;
const DEFAULT_OUT_TOKEN = CoinTickerDetailMap[CoinTickerType.USDC].tokenAddress;
const DEFAULT_SWAP_AMOUNT = 0.0001

// Called by frontend
export async function swapTokens({ 
  funApiKey = API_KEY, 
  addressPk = PRIVATE_KEY, 
  walletIndex = WALLET_INDEX, 
  swapConfig = {
    in: DEFAULT_IN_TOKEN,
    out: DEFAULT_OUT_TOKEN,
    amount: DEFAULT_SWAP_AMOUNT, 
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

// Called by backend api - so not calling fun apis to prevent errors in the rest api, 
// just use the predetermined FUN_ADDRESS for the provided PK
export async function getWalletInfo(): Promise<WalletInfo> {
  try {
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
