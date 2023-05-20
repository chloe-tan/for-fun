import { CoinTickerDetailMap, CoinTickerType } from "@/const/coins";
import { getEthBalance, getTokenBalance } from "./ethersService";

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

export async function getWalletInfo() {
  try {
    const addr = await FunWallet.getAddress(FUN_ADDRESS, 0, CHAIN_ID, API_KEY)
    // const addr = "0x4C8DB9bb25063a729d819BaCDD0c3EB36003E212";
    // TODO: Promise all
    const { count: ethBalanceCount, usdAmount: ethBalanceUsd } = await getEthBalance(addr);
    // const { count: usdcBalanceCount, usdAmount: usdcBalanceUsd } = await getTokenBalance(addr, CoinTickerType.USDC);

    const returnInfo = {
      address: addr,
      ethBalanceCount,
      ethBalanceUsd,
      usdcBalanceCount: 0,
      usdcBalanceUsd: 0,
      daiBalanceCount: 0,
      daiBalanceUsd: 0,
    }
    return returnInfo;
  } catch (err) {
    console.log(err);
    return null;
  }
}