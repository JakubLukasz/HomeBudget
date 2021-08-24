import { createContext, useContext, useState } from "react";
import { db } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";

const FirestoreContext = createContext({});

export const useFirestore = () => {
  return useContext(FirestoreContext);
};

export const FirestoreContextProvider = ({ children }) => {
  const [isConfigured, setIsConfigured] = useState(true);
  const { currentUser } = useAuth();

  const createUserData = ({ email, uid }) => {
    const userDoc = db.collection("users").doc(uid);
    const userData = {
      uid,
      email,
      isConfigured: false,
    };
    userDoc.set(userData);
  };

  const setupUserData = (setupData) => {
    const userRef = db.collection("users").doc(currentUser.uid);
    userRef.update(setupData);
  };

  const getExpenses = async () => {
    const tmp = [];
    const expensesRef = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("expenses");
    const docs = await expensesRef.get();
    docs.forEach((doc) => tmp.push(doc.data()));
    return tmp;
  };

  const getTransactions = async () => {
    const tmp = [];
    const transactionsRef = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("transactions");
    const docs = await transactionsRef.get();
    docs.forEach((doc) => tmp.push(doc.data()));
    return tmp;
  };

  const getUserData = async () => {
    const userRef = db.collection("users").doc(currentUser.uid);
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

  const executePayday = (value, todaysPayment) => {
    const userRef = db.collection("users").doc(currentUser.uid);
    userRef.update({
      moneyLeft: value,
      lastPayday: todaysPayment,
    });
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
    executePayday,
  };

  return (
    <FirestoreContext.Provider value={ctx}>
      {children}
    </FirestoreContext.Provider>
  );
};
