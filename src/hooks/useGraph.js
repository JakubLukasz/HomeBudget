import { useContext } from 'react';
import { GraphContext } from '@Contexts/GraphContext';

export const useGraph = () => {
  return useContext(GraphContext);
};
