
import { handleFundWallet } from '@/utils/fundService';
import type { NextApiRequest, NextApiResponse } from 'next';
 
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(401).json({ error: "Method not POST" });
  }
  try {
    await handleFundWallet()
    res.status(200).json(null);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export default handler;