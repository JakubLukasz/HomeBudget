import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UiContext = createContext({});

export const UiContextProvider = ({ children }) => {
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
  const [isExpensesModalOpen, setIsExpensesModalOpen] = useState(false);

  const ctx = {
    isBillModalOpen,
    setIsBillModalOpen,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    isSubCategoryModalOpen,
    setIsSubCategoryModalOpen,
    isExpensesModalOpen,
    setIsExpensesModalOpen,
  };

  return <UiContext.Provider value={ctx}>{children}</UiContext.Provider>;
};

UiContextProvider.propTypes = {
  children: PropTypes.node,
};
