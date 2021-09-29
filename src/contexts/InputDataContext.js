import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const InputDataContext = createContext({});

export const InputDataContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const ctx = {
    isModalOpen,
    setIsModalOpen,
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
