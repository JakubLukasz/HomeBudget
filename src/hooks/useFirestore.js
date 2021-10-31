import { useContext } from 'react';
import { FirestoreContext } from '@Contexts/FirestoreContext';

export const useFirestore = () => {
  return useContext(FirestoreContext);
};
