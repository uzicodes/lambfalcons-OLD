import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { registerUser } from '../../../utils/firebaseAuth';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    }

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