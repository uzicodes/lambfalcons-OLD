import { NextApiRequest, NextApiResponse } from 'next';
import { logoutUser } from '../../../utils/firebaseAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await logoutUser();
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error: any) {
    console.error('LOGOUT ERROR:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Error during logout' 
    });
  }
} 