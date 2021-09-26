import React, { createContext, useState } from 'react';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
import PropTypes from 'prop-types';

export const InputDataContext = createContext({});

export const InputDataContextProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { getUserData } = useFirestore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const addNewBill = (bill) => {
    const transactionsRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('transactions');
    transactionsRef.add(bill);
    updateTotal(bill);
  };

  const addNewExpense = (expense) => {
    const { id } = expense;
    const expensesRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('expenses')
      .doc(id);
    expensesRef.set(expense);
  };

  const updateTotal = async ({ amount, isSpent }) => {
    const { moneyLeft } = await getUserData();
    const userRef = db.collection('users').doc(currentUser.uid);
    const value = isSpent ? moneyLeft - amount : moneyLeft + amount;
    userRef.update({
      moneyLeft: value,
    });
  };

  const ctx = {
    isModalOpen,
    setIsModalOpen,
    addNewBill,
    selectedCategory,
    setSelectedCategory,
    addNewExpense,
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
