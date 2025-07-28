import { useState, useEffect } from 'react';
import { subscribeToMembers, getMembers, addMember, updateMember, deleteMember } from '../utils/firestore';
import { Member } from '../utils/firestore';

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initial load
    const loadMembers = async () => {
      try {
        const initialMembers = await getMembers();
        setMembers(initialMembers);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadMembers();

    // Real-time subscription
    const unsubscribe = subscribeToMembers((updatedMembers) => {
      setMembers(updatedMembers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addNewMember = async (memberData: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      await addMember(memberData);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateExistingMember = async (id: string, memberData: Partial<Omit<Member, 'id' | 'createdAt'>>) => {
    try {
      setError(null);
      await updateMember(id, memberData);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteExistingMember = async (id: string) => {
    try {
      setError(null);
      await deleteMember(id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    members,
    loading,
    error,
    addMember: addNewMember,
    updateMember: updateExistingMember,
    deleteMember: deleteExistingMember,
  };
}; 