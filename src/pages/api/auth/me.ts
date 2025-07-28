import { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentUserData } from '../../../utils/firebaseAuth';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Get user ID from request headers (set by client)
  const userId = req.headers['x-user-id'] as string;
  
  if (!userId) {
    return res.status(401).json({ 
      success: false,
      message: 'User ID not provided' 
    });
  }

  try {
    const userData = await getCurrentUserData(userId);
    
    if (!userData) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      user: userData 
    });
  } catch (error: any) {
    console.error('GET USER ERROR:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Error fetching user data' 
    });
  }
} 