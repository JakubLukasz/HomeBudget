import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const InputDataContext = createContext({});

export const InputDataContextProvider = ({ children }) => {
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isExpensesModalOpen, setIsExpensesModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const ctx = {
    isBillModalOpen,
    setIsBillModalOpen,
    isExpensesModalOpen,
    setIsExpensesModalOpen,
    selectedCategory,
    setSelectedCategory,
  };

  InputDataContextProvider.propTypes = {
    children: PropTypes.node,
  };

  return (
    <InputDataContext.Provider value={ctx}>
      {children}
    </InputDataContext.Provider>
  );
};
