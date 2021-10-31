import { useContext } from 'react';
import { UiContext } from '@Contexts/UiContext';

export const useUi = () => {
  return useContext(UiContext);
};
