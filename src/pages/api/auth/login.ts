import { NextApiRequest, NextApiResponse } from 'next';


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

  // TODO: Replace with Firebase Auth
  res.status(501).json({ message: 'Authentication not implemented yet. Please use Firebase Auth.' });
} 