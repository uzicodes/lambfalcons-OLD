import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../utils/db';
import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Re-using the Member schema, but we'll need to add a password field to it for auth.
// Let's define a User schema instead.

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
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await connect();

  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const contactNumber = phoneNumber;

  if (!firstName || !lastName || !email || !contactNumber || !password) {
    return res.status(422).json({ message: 'Missing required fields' });
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(422).json({ message: 'User with this email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const newUser = new User({
    firstName,
    lastName,
    email,
    contactNumber,
    passwordHash,
  });

  try {
    const savedUser = await newUser.save();
    
    // Send the welcome email
    try {
      await resend.emails.send({
        from: 'welcome@uzicodes.me',
        to: email,
        subject: 'Welcome to LAMB FALCONS!',
        html: `<h1>Welcome, ${firstName}!</h1><p>Thank you for joining the LAMB FALCONS community. We are excited to have you with us.</p>`
      });
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // We don't block the registration if the email fails,
      // but we log the error.
    }

    res.status(201).json({ message: 'User created successfully!', userId: savedUser._id });
  } catch (error) {
    console.error('REGISTRATION ERROR:', error);
    res.status(500).json({ message: 'Something went wrong creating the user.' });
  }
} 