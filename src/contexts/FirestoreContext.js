import React, { createContext, useState } from 'react';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';
import { currentDate } from '../helpers/currentDate';

export const FirestoreContext = createContext({});

export const FirestoreContextProvider = ({ children }) => {
  const [isConfigured, setIsConfigured] = useState(true);
  const { currentUser } = useAuth();

  const createUserData = ({ email, uid }) => {
    const userDoc = db.collection('users').doc(uid);
    const userData = {
      uid,
      email,
      isConfigured: false,
    };
    userDoc.set(userData);
  };

  const setupUserData = (setupData) => {
    const userRef = db.collection('users').doc(currentUser.uid);
    userRef.update(setupData);
  };

  const getExpenses = async () => {
    const tmp = [];
    const expensesRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('expenses');
    const docs = await expensesRef.get();
    docs.forEach((doc) => tmp.push(doc.data()));
    return tmp;
  };

  const getTransactions = async () => {
    const tmp = [];
    const transactionsRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('transactions');
    const docs = await transactionsRef.get();
    docs.forEach((doc) => tmp.push(doc.data()));
    return tmp;
  };

  const getUserData = async () => {
    const userRef = db.collection('users').doc(currentUser.uid);
    const doc = await userRef.get();
    return doc.data();
  };

  const getCurrency = async () => {
    const { currency } = await getUserData();
    return currency;
  };

  const checkIsUserConfigured = async () => {
    const data = await getUserData();
    const { isConfigured } = data;
    setIsConfigured(isConfigured);
  };

  const isDateIncluded = (data, date) => {
    return data.includes(date);
  };

  const executePayday = (paydayData, paydayDate, value) => {
    const userRef = db.collection('users').doc(currentUser.uid);
    paydayData.push(paydayDate);
    userRef.update({
      moneyLeft: value,
      paydayData,
    });
  };

  const setupPayday = (data, paydayDate) => {
    const { paydayData, moneyLeft, earnings } = data;
    const paydayResp = isDateIncluded(paydayData, paydayDate);
    const value = moneyLeft + earnings;
    if (!paydayResp) executePayday(paydayData, paydayDate, value);
  };

  const checkPayday = async () => {
    const { currentDay, currentMonth, currentYear } = currentDate();
    const userRef = db.collection('users').doc(currentUser.uid);
    const resp = await userRef.get();
    const data = resp.data();
    const { payday } = data;
    const paydayDate = `${payday}.${currentMonth}.${currentYear}`;
    if (currentDay >= payday) setupPayday(data, paydayDate);
  };

  const executeExpense = (id, expenseCollection, expenseDate, value) => {
    const userRef = db.collection('users').doc(currentUser.uid);
    const expenseRef = userRef.collection('expenses').doc(id);
    expenseCollection.push(expenseDate);
    expenseRef.update({
      expenseCollection,
    });
    userRef.update({
      moneyLeft: value,
    });
  };

  const setupExpense = async (expense, expenseDate) => {
    const { moneyLeft } = await getUserData();
    const { expenseCollection, amount, isSpent, id } = expense;
    const expenseResp = isDateIncluded(expenseCollection, expenseDate);
    const value = isSpent ? moneyLeft - amount : moneyLeft + amount;
    if (!expenseResp) executeExpense(id, expenseCollection, expenseDate, value);
  };

  const checkExpense = (expense) => {
    const { currentDay, currentMonth, currentYear } = currentDate();
    const { dayOfCollection } = expense;
    const expenseDate = `${dayOfCollection}.${currentMonth}.${currentYear}`;
    if (currentDay >= dayOfCollection) setupExpense(expense, expenseDate);
    console.log(expense);
  };

  const removeExpense = (id) => {
    const expensesRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('expenses');
    expensesRef.doc(id).delete();
  };

  const ctx = {
    createUserData,
    isConfigured,
    setIsConfigured,
    setupUserData,
    checkIsUserConfigured,
    getUserData,
    getCurrency,
    getTransactions,
    getExpenses,
    checkPayday,
    removeExpense,
    checkExpense,
  };

  return (
    <FirestoreContext.Provider value={ctx}>
      {children}
    </FirestoreContext.Provider>
  );
};

FirestoreContextProvider.propTypes = {
  children: PropTypes.node,
};
