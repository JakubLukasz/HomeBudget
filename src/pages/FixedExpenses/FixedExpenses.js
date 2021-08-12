import styled from "styled-components";
import { useState, useEffect } from "react";
import AddExpensesPopup from "./AddExpensesPopup";

const Container = styled.main`
  background-color: ${({ theme }) => theme.color.white};
  min-height: 200vh;
  font-size: 1rem;
  padding: 10px 20px 0;
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
  border: none;
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
  const addNewFixedExpenseHandler = () => {
    setIsExpensesPopupOpen(true);
  };
  return (
    <Container>
      {isExpensesPopupOpen && (
        <AddExpensesPopup setIsExpensesPopupOpen={setIsExpensesPopupOpen} />
      )}
      <Title>FIXED EXPENSES</Title>
      <AddNewFixedExpense onClick={addNewFixedExpenseHandler}>
        ADD PLAN
      </AddNewFixedExpense>
    </Container>
  );
};

export default FixedExpenses;
