import { useContext } from 'react';
import { InputDataContext } from '@Contexts/InputDataContext';

export const useInputData = () => {
  return useContext(InputDataContext);
};
