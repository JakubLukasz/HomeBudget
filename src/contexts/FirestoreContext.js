import React, { useState, useEffect, createContext } from 'react';
import { db } from '@Services/firebase';
import { useAuth } from '@Hooks/useAuth';
import PropTypes from 'prop-types';
import { currentDate } from '@Helpers/currentDate';
import { uniqueKey } from '@Helpers/uniqueKey';
import dayjs from 'dayjs';

export const FirestoreContext = createContext({});

export const FirestoreContextProvider = ({ children }) => {
  const [isConfigured, setIsConfigured] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      checkIsUserConfigured().then((isConf) => setIsConfigured(isConf))
    }
    else setIsConfigured(true);
  }, [currentUser])

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

  const getCollectionData = async (collectionName) => {
    const ref = db.collection("users").doc(currentUser.uid).collection(collectionName);
    const tmp = [];
    const docs = await ref.get();
    docs.forEach(doc => tmp.push(doc.data()))
    return tmp;
  }

  const getCollectionId = async (collectionName) => {
    const collection = await getCollectionData(collectionName);
    const randomId = getRandomId(collection);
    return randomId;
  }

  const getRandomId = (array) => {
    const randomId = uniqueKey();
    array.forEach(({ id }) => {
      if (id === randomId) {
        return getRandomId(array);
      }
    });
    return randomId;
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
    return isConfigured;
  };

  const executePayday = async (data, paydayCollectionDate) => {
    const userRef = db.collection('users').doc(currentUser.uid);
    const id = await getCollectionId("transactions");
    const currency = await getCurrency();
    const { earnings, paydayData } = data;
    paydayData.push(paydayCollectionDate);
    userRef.update({
      paydayData,
    });
    addNewBill({
      id,
      title: 'Payday',
      category: 'Payday',
      categoryGroup: 'Payday',
      date: dayjs().format('YYYY-MM-DD'),
      amount: parseFloat(earnings),
      isSpent: false,
      currency,
    });
  };

  const updateEarnings = (earnings) => {
    const userRef = db.collection('users').doc(currentUser.uid);
    userRef.update({ earnings })
  }

  const checkPayday = async () => {
    const { currentDay, currentMonth, currentYear } = currentDate();
    const data = await getUserData();
    const { paydayData, payday } = data;
    const paydayCollectionDate = `${currentYear}-${currentMonth}-${payday}`;
    const isPaydayCollected = paydayData.includes(paydayCollectionDate);
    if (currentDay >= payday && !isPaydayCollected) executePayday(data, paydayCollectionDate);
  };

  const executeExpense = async (expense, expenseCollectionDate) => {
    const { title, amount, isSpent, id, expenseCollection } = expense;
    const userRef = db.collection('users').doc(currentUser.uid);
    const expenseRef = userRef.collection('expenses').doc(id);
    expenseCollection.push(expenseCollectionDate);
    expenseRef.update({
      expenseCollection,
    });
    const ID = await getCollectionId("transactions");
    const currency = await getCurrency();
    addNewBill({
      id: ID,
      title,
      category: title,
      categoryGroup: 'Expense',
      date: dayjs(expenseCollectionDate).format('YYYY-MM-DD'),
      amount: parseFloat(amount),
      isSpent,
      currency,
    });
  };

  const checkExpense = (expense) => {
    const { currentDay, currentMonth, currentYear } = currentDate();
    const { dayOfCollection, months, expenseCollection } = expense;
    const expenseCollectionDate = `${currentYear}-${currentMonth}-${dayOfCollection}`;
    const isMonthIncluded = months.includes(currentMonth);
    const isMonthCollected = expenseCollection.includes(expenseCollectionDate)
    if (currentDay >= dayOfCollection && isMonthIncluded && !isMonthCollected) executeExpense(expense, expenseCollectionDate);
  };

  const removeFromCollection = (collectionName, id) => {
    const ref = db
      .collection('users')
      .doc(currentUser.uid)
      .collection(collectionName);
    ref.doc(id).delete();
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
    checkIsUserConfigured,
    getUserData,
    getCurrency,
    checkPayday,
    isConfigured,
    setIsConfigured,
    checkExpense,
    addNewExpense,
    updateEarnings,
    addNewBill,
    removeFromCollection,
    getCollectionId,
    getCollectionData,
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
