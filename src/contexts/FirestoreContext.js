import { createContext, useContext, useState } from "react";
import { db } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";

const FirestoreContext = createContext({});

export const useFirestore = () => {
  return useContext(FirestoreContext);
};

export const FirestoreContextProvider = ({ children }) => {
  const [isConfigured, setIsConfigured] = useState(true);
  const [transactions, setTransactions] = useState([]);
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

  const checkIsUserConfigured = async () => {
    const userRef = db.collection("users").doc(currentUser.uid);
    const doc = await userRef.get();
    const data = doc.data().isConfigured;
    setIsConfigured(data);
  };

  const getTransactions = () => {
    const transactionsRef = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("transactions");
    const unsubscribe = transactionsRef.onSnapshot((snapshot) => {
      if (snapshot.size) {
        const tmp = [];
        snapshot.forEach((doc) => tmp.push(doc.data()));
        tmp.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        setTransactions(tmp);
      }
    });
    return unsubscribe;
  };

  const ctx = {
    createUserData,
    isConfigured,
    setIsConfigured,
    setupUserData,
    checkIsUserConfigured,
    transactions,
    getTransactions,
  };

  return (
    <FirestoreContext.Provider value={ctx}>
      {children}
    </FirestoreContext.Provider>
  );
};
