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
  const [selectedCategory, setSelectedCategory] = useState("");

  const addNewBill = (bill) => {
    const transactionsRef = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("transactions");
    transactionsRef.add(bill);
    updateTotal(bill);
  };

  const addNewExpense = (expense) => {
    const expensesRef = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("expenses");
    expensesRef.add(expense);
  };

  const updateTotal = async ({ amount, isSpent }) => {
    const { moneyLeft } = await getUserData();
    const userRef = db.collection("users").doc(currentUser.uid);
    const value = isSpent ? moneyLeft - amount : moneyLeft + amount;
    userRef.update({
      moneyLeft: value,
    });
  };

  const ctx = {
    isPopupOpen,
    setIsPopupOpen,
    addNewBill,
    selectedCategory,
    setSelectedCategory,
    addNewExpense,
  };

  return (
    <AddBillContext.Provider value={ctx}>{children}</AddBillContext.Provider>
  );
};
