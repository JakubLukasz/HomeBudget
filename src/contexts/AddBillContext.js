import { createContext, useState, useContext, useEffect } from "react";
import { db } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";

const AddBillContext = createContext({});

export const useAddBill = () => {
  return useContext(AddBillContext);
};

export const AddBillContextProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bill, setBill] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);

  const addNewBill = (bill) => {
    const transactionsRef = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("transactions");
    transactionsRef.add(bill);
  };

  useEffect(() => {
    if (isSubmited) addNewBill(bill);
  }, [bill]);

  const ctx = {
    isPopupOpen,
    setIsPopupOpen,
    setBill,
    setIsSubmited,
  };

  return (
    <AddBillContext.Provider value={ctx}>{children}</AddBillContext.Provider>
  );
};
