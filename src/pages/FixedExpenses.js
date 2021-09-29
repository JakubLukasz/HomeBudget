import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import AddExpensesModal from '../components/modals/AddExpensesModal';
import { devices } from '../assets/styles/devices';
import Expense from '../components/Expense';
import { useFirestore } from '../hooks/useFirestore';
import { useLoading } from '../hooks/useLoading';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { Page } from '../assets/styles/reusableStyles';

const Container = styled(Page)`
  background-color: ${({ theme }) => theme.color.white};
`;

const Title = styled.span`
  color: ${({ theme }) => theme.color.secondary};
  padding: 10px 0;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const AddNewFixedExpense = styled.button`
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 15px;
  display: flex;
  font-size: 1.7rem;
  color: white;
  padding: 20px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  margin: 10px 0 20px;
  width: 100%;

  @media ${devices.laptop} {
    width: auto;
  }
`;

const Expenses = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FixedExpenses = () => {
  const [isExpensesModalOpen, setIsExpensesModalOpen] = useState(false);
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
      .collection('users')
      .doc(currentUser.uid)
      .collection('expenses');
    const unsubscribe = expensesRef.onSnapshot((snapshot) => {
      const tmp = [];
      snapshot.forEach((doc) => tmp.push(doc.data()));
      setExpenses(tmp);
    });
    return () => unsubscribe();
  }, []);

  const addNewFixedExpenseHandler = () => setIsExpensesModalOpen(true);

  return (
    <Container>
      {isExpensesModalOpen && (
        <AddExpensesModal setIsExpensesModalOpen={setIsExpensesModalOpen} />
      )}
      <Title>FIXED EXPENSES</Title>
      <AddNewFixedExpense onClick={addNewFixedExpenseHandler}>
        ADD EXPENSE
      </AddNewFixedExpense>
      <Expenses>
        {expenses.map((expenseVal) => (
          <Expense key={expenseVal.id} {...expenseVal} />
        ))}
      </Expenses>
    </Container>
  );
};

export default FixedExpenses;
