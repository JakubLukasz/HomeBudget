import styled from "styled-components";
import { useState, useEffect } from "react";
import AddExpensesPopup from "./AddExpensesPopup";
import { devices } from "../../assets/devices";
import Expense from "./Expense";
import { useFirestore } from "../../contexts/FirestoreContext";
import { useLoading } from "../../contexts/LoadingContext";
import { db } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";

const Container = styled.main`
  background-color: ${({ theme }) => theme.color.white};
  min-height: 100vh;
  font-size: 1rem;
  padding: 10px 20px 10vh;

  @media ${devices.laptop} {
    margin-left: 80px;
  }
`;

const Title = styled.span`
  color: ${({ theme }) => theme.color.secondary};
  padding: 10px 0;
  font-weight: 800;
`;

const AddNewFixedExpense = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 15px;
  display: flex;
  font-size: 1.7rem;
  color: white;
  padding: 10px 15px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  margin: 10px 0;

  @media ${devices.tabletVerL} {
    max-width: 400px;
  }

  @media ${devices.laptop} {
    max-width: 400px;
  }
`;

const Expenses = styled.div`
  @media ${devices.tabletVerL} {
    max-width: 400px;
  }

  @media ${devices.laptop} {
    max-width: 400px;
  }
`;

const FixedExpenses = () => {
  const [isExpensesPopupOpen, setIsExpensesPopupOpen] = useState(false);
  const { getExpenses } = useFirestore();
  const [expenses, setExpenses] = useState([]);
  const { setIsLoading } = useLoading();
  const { currentUser } = useAuth();

  const init = async () => {
    const respExpenses = await getExpenses();
    setExpenses(respExpenses);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    init();
  }, []);

  useEffect(() => {
    const expensesRef = db
      .collection("users")
      .doc(currentUser.uid)
      .collection("expenses");
    const unsubscribe = expensesRef.onSnapshot((snapshot) => {
      const tmp = [];
      if (snapshot.size) {
        snapshot.forEach((doc) => tmp.push(doc.data()));
        setExpenses(tmp);
      }
    });
    return () => unsubscribe();
  }, []);

  const addNewFixedExpenseHandler = () => setIsExpensesPopupOpen(true);

  return (
    <Container>
      {isExpensesPopupOpen && (
        <AddExpensesPopup setIsExpensesPopupOpen={setIsExpensesPopupOpen} />
      )}
      <Title>FIXED EXPENSES</Title>
      <Expenses>
        {expenses.map((expenseVal) => (
          <Expense key={expenseVal.id} {...expenseVal} />
        ))}
      </Expenses>
      <AddNewFixedExpense onClick={addNewFixedExpenseHandler}>
        ADD EXPENSE
      </AddNewFixedExpense>
    </Container>
  );
};

export default FixedExpenses;
