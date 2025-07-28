import { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '../../../utils/firebaseAuth';

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

  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const contactNumber = phoneNumber;

  if (!firstName || !lastName || !email || !contactNumber || !password) {
    return res.status(422).json({ message: 'Missing required fields' });
  }

  try {
    // Register user with Firebase Auth
    const userData = await registerUser(email, password, firstName, lastName, contactNumber);
    
    // TODO: Add Firebase Email Extension for welcome emails
    console.log(`Welcome email would be sent to: ${email}`);

    res.status(201).json({ 
      success: true,
      message: 'User created successfully!', 
      user: userData 
    });
  } catch (error: any) {
    console.error('REGISTRATION ERROR:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Something went wrong creating the user.' 
    });
  }
} 