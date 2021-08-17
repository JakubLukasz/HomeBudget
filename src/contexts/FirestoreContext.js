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

  const transactionsListener = () => {
    const transactionsRef = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("transactions");
    const tmp = [];
    const unsubscribe = transactionsRef.onSnapshot((snapshot) => {
      if (snapshot.size) {
        snapshot.forEach((doc) => tmp.push(doc.data()));
        tmp.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      }
    });
    return { unsubscribe, tmp };
  };

  const expensesListener = () => {
    const expensesRef = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("expenses");
    const tmp = [];
    const unsubscribe = expensesRef.onSnapshot((snapshot) => {
      if (snapshot.size) {
        snapshot.forEach((doc) => tmp.push(doc.data()));
      }
    });
    return { unsubscribe, tmp };
  };

  const userListener = () => {
    const userRef = db.collection("users").doc(currentUser.uid);
    let data;
    const unsubscribe = userRef.onSnapshot((doc) => {
      data = doc.data();
    });
    return { unsubscribe, data };
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

  const ctx = {
    createUserData,
    isConfigured,
    setIsConfigured,
    setupUserData,
    checkIsUserConfigured,
    getUserData,
    transactionsListener,
    userListener,
    expensesListener,
    getCurrency,
  };

  return (
    <FirestoreContext.Provider value={ctx}>
      {children}
    </FirestoreContext.Provider>
  );
};
