import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

export interface Member {
  id: string;
  name: string;
  studentId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Get all members
export const getMembers = async (): Promise<Member[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'members'));
    const members: Member[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      members.push({
        id: doc.id,
        name: data.name,
        studentId: data.studentId,
        email: data.email,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      });
    });
    
    return members;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Add new member
export const addMember = async (memberData: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'members'), {
      ...memberData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Update member
export const updateMember = async (id: string, memberData: Partial<Omit<Member, 'id' | 'createdAt'>>): Promise<void> => {
  try {
    const memberRef = doc(db, 'members', id);
    await updateDoc(memberRef, {
      ...memberData,
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Delete member
export const deleteMember = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'members', id));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Real-time members listener
export const subscribeToMembers = (callback: (members: Member[]) => void) => {
  const q = query(collection(db, 'members'), orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const members: Member[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      members.push({
        id: doc.id,
        name: data.name,
        studentId: data.studentId,
        email: data.email,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      });
    });
    callback(members);
  });
}; 