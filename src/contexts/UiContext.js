import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UiContext = createContext({});

export const UiContextProvider = ({ children }) => {
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isExpensesModalOpen, setIsExpensesModalOpen] = useState(false);
  const [isEarningsModalOpen, setIsEarningsModalOpen] = useState(false);

  const ctx = {
    isBillModalOpen,
    setIsBillModalOpen,
    isExpensesModalOpen,
    setIsExpensesModalOpen,
    isEarningsModalOpen,
    setIsEarningsModalOpen,
  };

  return <UiContext.Provider value={ctx}>{children}</UiContext.Provider>;
};

UiContextProvider.propTypes = {
  children: PropTypes.node,
};
