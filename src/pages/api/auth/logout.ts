import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // TODO: Replace with Firebase Auth logout
  res.status(501).json({ success: true, message: 'Logout not implemented yet. Please use Firebase Auth.' });
} 