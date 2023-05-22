import axios from 'axios'

const COINGECKO_SIMPLE_ENDPOINT = "https://api.coingecko.com/api/v3/simple";

export async function getEthPriceInUSD(): Promise<any> {
  const response = await axios.get(`${COINGECKO_SIMPLE_ENDPOINT}/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true`);
  const ethPriceUSD: number = response.data.ethereum.usd;
  const usdDelta: number = response.data.ethereum.usd_24h_change;
  return { ethPriceUSD, usdDelta };
}

export async function getTokenPriceInUSD(tokenId: string): Promise<number> {
  const response = await axios.get(`${COINGECKO_SIMPLE_ENDPOINT}/token_price/ethereum?contract_addresses=${tokenId}&vs_currencies=usd`);
  const tokenPriceUSD: number = response.data[tokenId.toLowerCase()].usd;
  return tokenPriceUSD;
}
