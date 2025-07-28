import { NextApiRequest, NextApiResponse } from 'next';

// TODO: Replace with Firebase Auth
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

  // TODO: Replace with Firebase Auth
  res.status(501).json({ message: 'User authentication not implemented yet. Please use Firebase Auth.' });
} 