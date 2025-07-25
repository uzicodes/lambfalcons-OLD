import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/db';
import mongoose, { Document, Model, Schema } from 'mongoose';

// 1. Define the Member Schema
export interface IMember extends Document {
  name: string;
  studentId: string;
  email: string;
}

const memberSchema = new Schema<IMember>({
  name: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

// 2. Create the Member Model
// Avoid recompiling the model every time in development
let Member: Model<IMember>;
try {
  Member = mongoose.model<IMember>('Member');
} catch {
  Member = mongoose.model<IMember>('Member', memberSchema);
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 3. Connect to the database
  await connect();

  if (req.method === 'GET') {
    try {
      // 4. Fetch members from the database
      const members = await Member.find({});
      res.status(200).json({ success: true, data: members });
    } catch (error) {
      res.status(400).json({ success: false, error: 'Error fetching members' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
