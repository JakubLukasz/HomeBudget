import { useContext } from 'react';
import { FirestoreContext } from '../contexts/FirestoreContext';

export const useFirestore = () => {
  return useContext(FirestoreContext);
};
