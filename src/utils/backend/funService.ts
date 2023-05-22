import { CoinTickerDetailMap, CoinTickerType } from "@/const/coins";
import { getEthBalance, getTokenBalance } from "./ethersService";
import { WalletInfo } from "@/const/wallet";
import { getCoinPricesInUSD } from "../common/coingeckoService";

const ethers = require("ethers")
const { FunWallet, configureEnvironment } = require("fun-wallet")
const { Eoa } = require("fun-wallet/auth")

const FUN_ADDRESS = process.env.FUN_ADDRESS;
const PRIVATE_KEY = process.env.FUN_PRIVATE_KEY;
const API_KEY = process.env.FUN_API_KEY;
const CHAIN_ID = process.env.CHAIN_ID;
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
  funWallet = await new FunWallet({ uniqueId })
  console.debug("fun_wallet_init", funWallet);
  // return funWallet.getAddress();
}

async function transferTokens() {
  // TODO:
}

async function swapTokens({ inToken, outToken, amount }: any) {

  if (!inToken || !outToken || !amount) {
    throw Error(`Missing fields ${inToken}, ${outToken}, ${amount}}`);
  }

  if (funWallet == null || auth == null || uniqueId == null) {
    await initFunWallet();
  }

  const receipt = await funWallet.swap(auth, {
    in: "eth",
    amount: .001,
    out: "dai",
  });
  console.log("swap_result", receipt);
}

// export async function getAddress() {
//   try {
//     if (funWallet == null || auth == null || uniqueId == null) {
//       await initFunWallet();
//     }
//     console.debug("fun_wallet", funWallet)
//     const addr = await funWallet.getAddress();
//     console.debug("address", addr)
//     return addr;
//   } catch (e) {
//     console.error("error_getAddress");
//     return "0x..";
//   }
// }

export async function getWalletInfo(): Promise<WalletInfo> {
  try {
    // const addr = await FunWallet.getAddress(FUN_ADDRESS, 2, CHAIN_ID, API_KEY)
    // const addr = "0x4C8DB9bb25063a729d819BaCDD0c3EB36003E212";
    const addr = "0x150aD6F41c2D56c2f6a6bA73560105aA73b5001b";
    const coinPrices = await getCoinPricesInUSD();
    const [ethData, usdcData, daiData] = await Promise.all([
      getEthBalance(addr, coinPrices?.[CoinTickerDetailMap[CoinTickerType.ETH].cgKey]?.usd),
      getTokenBalance(addr, CoinTickerType.USDC, coinPrices?.[CoinTickerDetailMap[CoinTickerType.USDC].cgKey].usd),
      getTokenBalance(addr, CoinTickerType.DAI, coinPrices?.[CoinTickerDetailMap[CoinTickerType.DAI].cgKey].usd),
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