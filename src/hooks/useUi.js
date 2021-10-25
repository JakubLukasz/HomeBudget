import { useContext } from 'react';
import { UiContext } from '../contexts/UiContext';

export const useUi = () => {
  return useContext(UiContext);
};
