
import { CoinTickerType } from '@/const/coins';
import { getWalletInfo, initFunWallet, swapTokens } from '@/utils/funService';
import type { NextApiRequest, NextApiResponse } from 'next';
 
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(401).json({ error: "Method not POST" });
  }
  try {
    const funAddress = await swapTokens();
    res.status(200).json(funAddress);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export default handler;