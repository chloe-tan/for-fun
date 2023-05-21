import axios from 'axios';

export async function getWalletInfo() {
  try {
    const resp = await axios.post(`/api/wallet/get_user_wallet_info`);
    return resp?.data;
  } catch (err) {
    console.error("error");
    return null;
  }
}