import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.setPersistence("local").then(() => {
      return auth.signInWithEmailAndPassword(email, password);
    });
  };

  const logout = () => auth.signOut();

  const resetPassword = (email) => auth.sendPasswordResetEmail(email);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setCurrentUser(user));

    return () => unsubscribe();
  }, []);

  const authCtx = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
  );
};
