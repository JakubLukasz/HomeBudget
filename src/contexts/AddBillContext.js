import { createContext, useState, useContext, useEffect } from "react";
import { db } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";
import { useFirestore } from "./FirestoreContext";

const AddBillContext = createContext({});

export const useAddBill = () => {
  return useContext(AddBillContext);
};

export const AddBillContextProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { getUserData } = useFirestore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bill, setBill] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const addNewBill = (bill) => {
    const transactionsRef = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("transactions");
    transactionsRef.add(bill);
    updateTotal(bill);
  };

  const updateTotal = async ({ amount, isSpent }) => {
    const { moneyLeft } = await getUserData();
    const userRef = db.collection("users").doc(currentUser.uid);
    const value = isSpent ? moneyLeft - amount : moneyLeft + amount;
    userRef.update({
      moneyLeft: value,
    });
  };

  useEffect(() => {
    if (isSubmited) addNewBill(bill);
  }, [bill]);

  const ctx = {
    isPopupOpen,
    setIsPopupOpen,
    setBill,
    setIsSubmited,
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <AddBillContext.Provider value={ctx}>{children}</AddBillContext.Provider>
  );
};
