import { useContext } from 'react';
import { InputDataContext } from '../contexts/InputDataContext';

export const useInputData = () => {
  return useContext(InputDataContext);
};
