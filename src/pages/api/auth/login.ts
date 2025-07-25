import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../utils/db';
import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// This is the same IUser and User model from the register endpoint.
// In a real app, you would move this to a separate models directory.
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  passwordHash: string;
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    // This should ideally not happen in production if environment variables are set correctly.
    console.error('JWT_SECRET not defined');
    return res.status(500).json({ message: 'Server configuration error.'});
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await connect();

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: 'Invalid input' });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: '1h',
  });

  const cookie = serialize('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict',
    maxAge: 3600, // 1 hour
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);

  res.status(200).json({ success: true, message: 'Logged in successfully' });
} 