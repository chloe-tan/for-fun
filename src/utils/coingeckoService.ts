import axios from 'axios'

const COINGECKO_SIMPLE_ENDPOINT = "https://api.coingecko.com/api/v3/simple";

export async function getCoinPricesInUSD() {
  try {
    const response = await axios.get(`${COINGECKO_SIMPLE_ENDPOINT}/price?ids=ethereum,dai,usd-coin&vs_currencies=usd&include_24hr_change=true`, {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
    return response.data;
  } catch (err: any) {
    console.error("error_in_getCoinPricesInUSD", err.message);
    return null;
  }
}