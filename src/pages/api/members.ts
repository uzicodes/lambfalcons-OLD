import { NextApiRequest, NextApiResponse } from 'next';

// TODO: Replace with Firebase Firestore
export interface IMember {
  id: string;
  name: string;
  studentId: string;
  email: string;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // TODO: Replace with Firebase Firestore
      res.status(501).json({ success: false, error: 'Members API not implemented yet. Please use Firebase Firestore.' });
    } catch (error) {
      res.status(400).json({ success: false, error: 'Error fetching members' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
