import React, { useState, createContext } from 'react';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import PropTypes from 'prop-types';
import { currentDate } from '../helpers/currentDate';
import { uniqueKey } from '../helpers/uniqueKey';
import dayjs from 'dayjs';

export const FirestoreContext = createContext({
  // @TODO default value
});

export const FirestoreContextProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [isConfigured, setIsConfigured] = useState(true);

  const createUserData = async ({ email, uid }) => {
    const userDoc = db.collection('users').doc(uid);
    const userData = {
      uid,
      email,
      isConfigured: false,
    };
    await userDoc.set(userData);
  };

  const createGuestData = async ({ email, uid }, username) => {
    const userDoc = db.collection('users').doc(uid);
    const userData = {
      uid,
      email,
      isConfigured: true,
      payday: '01',
      firstname: username,
      earnings: 3000,
      moneyLeft: 0,
      paydayData: [],
      currency: 'zł',
    };
    await userDoc.set(userData);
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

  const executePayday = async (paydayData, paydayDate, earnings) => {
    const userRef = db.collection('users').doc(currentUser.uid);
    const ID = await generateTransactionsID();
    const currency = await getCurrency();
    paydayData.push(paydayDate);
    userRef.update({
      paydayData,
    });
    addNewBill({
      id: ID,
      title: 'Payday',
      category: 'Payday',
      categoryGroup: 'Payday',
      date: dayjs().format('YYYY-MM-DD'),
      amount: parseFloat(earnings),
      isSpent: false,
      currency,
    });
  };

  const setupPayday = (data, payday) => {
    const { currentMonth, currentYear } = currentDate();
    const { paydayData, earnings } = data;
    const paydayDate = `${currentYear}-${currentMonth}-${payday}`;
    const paydayResp = isDateIncluded(paydayData, paydayDate);
    if (!paydayResp) executePayday(paydayData, paydayDate, earnings);
  };

  const checkPayday = async () => {
    const { currentDay } = currentDate();
    const userRef = db.collection('users').doc(currentUser.uid);
    const resp = await userRef.get();
    const data = resp.data();
    const { payday } = data;
    if (currentDay >= payday) setupPayday(data, payday);
  };

  const executeExpense = async (
    expenseCollection,
    dayOfCollection,
    expense
  ) => {
    const { currentMonth, currentYear } = currentDate();
    const { title, amount, isSpent, id } = expense;
    const userRef = db.collection('users').doc(currentUser.uid);
    const expenseRef = userRef.collection('expenses').doc(id);
    const expenseDate = `${currentYear}-${currentMonth}-${dayOfCollection}`;
    expenseCollection.push(expenseDate);
    expenseRef.update({
      expenseCollection,
    });
    const ID = await generateTransactionsID();
    const currency = await getCurrency();
    addNewBill({
      id: ID,
      title,
      category: title,
      categoryGroup: 'Expense',
      date: dayjs().format('YYYY-MM-DD'),
      amount: parseFloat(amount),
      isSpent,
      currency,
    });
  };

  const setupExpense = async (expense) => {
    const { currentMonth, currentYear } = currentDate();
    const { expenseCollection, dayOfCollection } = expense;
    const expenseDate = `${currentYear}-${currentMonth}-${dayOfCollection}`;
    const expenseResp = isDateIncluded(expenseCollection, expenseDate);
    if (!expenseResp)
      executeExpense(expenseCollection, dayOfCollection, expense);
  };

  const checkExpense = (expense) => {
    const { currentMonth, currentDay } = currentDate();
    const { dayOfCollection, months } = expense;
    const monthResp = isDateIncluded(months, currentMonth);
    if (currentDay >= dayOfCollection && monthResp) setupExpense(expense);
  };

  const removeExpense = (id) => {
    const expensesRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('expenses');
    expensesRef.doc(id).delete();
  };

  const checkId = (array) => {
    const randomId = uniqueKey();
    array.forEach(({ id }) => {
      if (id === randomId) {
        return checkId(array);
      }
    });
    return randomId;
  };

  const generateExpensesID = async () => {
    const expenses = await getExpenses();
    const generatedID = checkId(expenses);
    return generatedID;
  };

  const generateTransactionsID = async () => {
    const transactions = await getTransactions();
    const generatedID = checkId(transactions);
    return generatedID;
  };

  const getExpensesSize = async () => {
    const expensesRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('expenses');
    const snapshot = await expensesRef.get();
    const count = snapshot.size;
    return count;
  };

  const getTransactionsSize = async () => {
    const transactionsRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('transactions');
    const snapshot = await transactionsRef.get();
    const count = snapshot.size;
    return count;
  };

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
    createUserData,
    setupUserData,
    isConfigured,
    setIsConfigured,
    checkIsUserConfigured,
    getUserData,
    getCurrency,
    getTransactions,
    getExpenses,
    checkPayday,
    removeExpense,
    checkExpense,
    addNewExpense,
    addNewBill,
    generateTransactionsID,
    generateExpensesID,
    getExpensesSize,
    getTransactionsSize,
    createGuestData,
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
