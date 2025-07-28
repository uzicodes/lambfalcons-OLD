import { NextApiRequest, NextApiResponse } from 'next';
import { getMembers, addMember, updateMember, deleteMember } from '../../utils/firestore';

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
  try {
    switch (req.method) {
      case 'GET':
        const members = await getMembers();
        res.status(200).json({ success: true, data: members });
        break;
        
      case 'POST':
        const { name, studentId, email } = req.body;
        if (!name || !studentId || !email) {
          return res.status(422).json({ success: false, error: 'Missing required fields' });
        }
        const memberId = await addMember({ name, studentId, email });
        res.status(201).json({ success: true, data: { id: memberId, name, studentId, email } });
        break;
        
      case 'PUT':
        const { id, ...updateData } = req.body;
        if (!id) {
          return res.status(422).json({ success: false, error: 'Member ID is required' });
        }
        await updateMember(id, updateData);
        res.status(200).json({ success: true, message: 'Member updated successfully' });
        break;
        
      case 'DELETE':
        const { id: deleteId } = req.body;
        if (!deleteId) {
          return res.status(422).json({ success: false, error: 'Member ID is required' });
        }
        await deleteMember(deleteId);
        res.status(200).json({ success: true, message: 'Member deleted successfully' });
        break;
        
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('MEMBERS API ERROR:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Error processing request' 
    });
  }
}
