import styled from "styled-components";
import { useState, useEffect } from "react";
import AddExpensesPopup from "./AddExpensesPopup";
import { devices } from "../../assets/devices";
import Expense from "./Expense";
import { useFirestore } from "../../contexts/FirestoreContext";

const Container = styled.main`
  background-color: ${({ theme }) => theme.color.white};
  min-height: 200vh;
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
`;

const FixedExpenses = () => {
  const [isExpensesPopupOpen, setIsExpensesPopupOpen] = useState(false);
  const { expensesListener } = useFirestore();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const { unsubscribe, tmp } = expensesListener();
    setExpenses(tmp);
    return () => unsubscribe();
  }, []);

  const addNewFixedExpenseHandler = () => setIsExpensesPopupOpen(true);

  return (
    <Container>
      {isExpensesPopupOpen && (
        <AddExpensesPopup setIsExpensesPopupOpen={setIsExpensesPopupOpen} />
      )}
      <Title>FIXED EXPENSES</Title>
      {expenses.map((expenseVal) => (
        <Expense {...expenseVal} />
      ))}
      <AddNewFixedExpense onClick={addNewFixedExpenseHandler}>
        ADD EXPENSE
      </AddNewFixedExpense>
    </Container>
  );
};

export default FixedExpenses;
