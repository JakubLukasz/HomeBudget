import { createContext, useContext } from "react";
import { db } from "../services/firebase";

const FirestoreContext = createContext({});

export const useFirestore = () => {
  return useContext(FirestoreContext);
};

export const FirestoreContextProvider = ({ children }) => {
  const createUserData = async ({ email, uid }) => {
    const userData = {
      uid,
      email,
      plans: {},
      transactions: {},
      settings: {},
    };

    db.collection("users").doc(uid).set(userData);
  };

  const ctx = {
    createUserData,
  };

  return (
    <FirestoreContext.Provider value={ctx}>
      {children}
    </FirestoreContext.Provider>
  );
};
