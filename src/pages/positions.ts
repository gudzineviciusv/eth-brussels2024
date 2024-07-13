
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { walletAddress } = req.query;

  if (!walletAddress || typeof walletAddress !== 'string') {
    return res.status(400).json({ error: 'Invalid wallet address' });
  }

  try {
    const response = await fetch(`https://api.zerion.io/v1/wallets/${walletAddress}/positions`, {
      headers: {
        'Authorization': 'Basic ' + btoa('example'), // Use your actual credentials
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch positions from Zerion API' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching positions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
