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

export async function swapTokens({ funApiKey, sponsorAddress, addressPk, walletIndex }: any) {
  await configureEnvironment({
    chain: 5,
    apiKey: funApiKey,
    // gasSponsor: {
    //   sponsorAddress: sponsorAddress,
    // }
  })
  const auth = new Eoa({ privateKey: addressPk })
  const uniqueId = await auth.getUniqueId()
  const wallet = new FunWallet({ uniqueId, index: Number(walletIndex) })
  console.log(">wallet", wallet)
  console.log(">wallet_address", await wallet.getAddress());
  // const gas = await wallet.estimateGas(auth, {
  //   in: "eth",
  //   amount: 0.000001,
  //   out: "dai",
  // });

  // const funder_auth = new Eoa({ privateKey: "0xf3240969c0e94963177e33dcbcbf2a03acc4782d22f3587b63a56b9e37ba2fa0" })
  // console.log("funder_auth", funder_auth);
  // const paymasterAddress = await gasSponsor.getPaymasterAddress()
  // const fund_resp = await fundWallet(funder_auth, wallet, 0.005) // if gasless
  // console.log("fund_wallet_done", fund_resp);

  const receipt = await wallet.swap(auth, {
    in: "eth",
    amount: 0.001,
    out: "dai",
  });
  return receipt;
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


// TODO: Move to another service file
const FAUCETURL = "https://kjj7i5hi79.execute-api.us-west-2.amazonaws.com/prod/demo-faucet/"
export const handleFundWallet = async function (addr: any = process.env.FUN_ADDRESS) {
  try {
    await fetch(`${FAUCETURL}get-faucet?token=eth&testnet=goerli&addr=${addr}`)
    await fetch(`${FAUCETURL}get-faucet?token=usdc&testnet=goerli&addr=${addr}`)
    await fetch(`${FAUCETURL}get-faucet?token=dai&testnet=goerli&addr=${addr}`)
    await fetch(`${FAUCETURL}get-faucet?token=usdt&testnet=goerli&addr=${addr}`)
    await fetch(`${FAUCETURL}stake-token?testnet=goerli&addr=${addr}`)

    setTimeout(() => {
      return;
    }, 1500)
  } catch (e: any) {
    return e.toString();
  }
}