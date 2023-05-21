
import { getWalletInfo } from '@/utils/backend/funService';
import type { NextApiRequest, NextApiResponse } from 'next';
 
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(401).json({ error: "Method not POST" });
  }
  try {
    const returnInfo = await getWalletInfo();
    console.log("return_info", returnInfo);
    res.status(200).json(returnInfo);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export default handler;