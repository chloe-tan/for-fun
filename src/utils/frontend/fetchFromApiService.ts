import axios from 'axios';

export async function getWalletInfo() {
  try {
    console.log("GET_WALLET_INFO")
    const resp = await axios.post(`/api/wallet/get_user_info`, {});
    return resp?.data;
  } catch (err) {
    console.error("error");
    return null;
  }
}