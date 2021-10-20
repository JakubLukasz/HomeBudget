import { useContext } from 'react';
import { GraphContext } from '../contexts/GraphContext';

export const useGraph = () => {
  return useContext(GraphContext);
};
