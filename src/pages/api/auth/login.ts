import { NextApiRequest, NextApiResponse } from 'next';
import { loginUser, getCurrentUserData } from '../../../utils/firebaseAuth';

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
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: 'Invalid input' });
  }

  try {
    // Login user with Firebase Auth
    const firebaseUser = await loginUser(email, password);
    
    // Get user data from Firestore
    const userData = await getCurrentUserData(firebaseUser.uid);
    
    if (!userData) {
      return res.status(404).json({ 
        success: false,
        message: 'User data not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Logged in successfully',
      user: userData
    });
  } catch (error: any) {
    console.error('LOGIN ERROR:', error);
    res.status(401).json({ 
      success: false,
      message: error.message || 'Invalid credentials' 
    });
  }
} 