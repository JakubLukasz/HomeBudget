import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import AddExpensesModal from '../components/modals/AddExpensesModal';
import { devices } from '../assets/styles/devices';
import Expense from '../components/Expense';
import { useFirestore } from '../hooks/useFirestore';
import { useLoading } from '../hooks/useLoading';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

const Container = styled.main`
  background-color: ${({ theme }) => theme.color.white};
  flex: 1;
  overflow: auto;
  font-size: 1rem;
  padding: 10px 20px 0;

  /* @media ${devices.laptop} {
    height: var(--app-height);
  } */
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
  margin: 10px 0;

  @media ${devices.laptop} {
    max-width: 400px;
  }
`;

const Expenses = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-columns: minmax(auto, 1fr);
  grid-gap: 15px;
  margin-top: 15px;

  @media ${devices.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${devices.laptop} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${devices.laptopL} {
    grid-template-columns: repeat(5, 1fr);
  }
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
