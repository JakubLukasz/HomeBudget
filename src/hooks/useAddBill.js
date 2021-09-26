import { useContext } from 'react';
import { InputDataContext } from '../contexts/InputDataContext';

export const useAddBill = () => {
  return useContext(InputDataContext);
};
