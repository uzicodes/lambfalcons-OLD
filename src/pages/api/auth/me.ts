import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import connect from '../../../utils/db';
import mongoose, { Document, Model, Schema } from 'mongoose';

// Ideally, this User model would be in its own file (e.g., src/models/User.ts)
// to avoid re-definition. For now, we'll redefine it here.
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  passwordHash: string; // This will be excluded from the response
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

let User: Model<IUser>;
try {
  User = mongoose.model<IUser>('User');
} catch {
  User = mongoose.model<IUser>('User', userSchema, 'members');
}

interface JwtPayload {
  userId: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    await connect();

    const user = await User.findById(decoded.userId).select('-passwordHash'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ success: true, user });

  } catch (error) {
    res.status(401).json({ message: 'Not authenticated', error: 'Invalid token' });
  }
} 