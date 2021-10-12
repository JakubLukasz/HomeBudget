import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { devices } from '../assets/styles/devices';
import Expense from '../components/Expense';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from '../components/LoadingScreen';
import { useFirestore } from '../hooks/useFirestore';
import NoExpenses from '../components/NoExpenses';

const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.color.lightPrimary};
  flex: 1;
  overflow: auto;
`;

const Expenses = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Header = styled.header`
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px -10px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${devices.laptop} {
    display: none;
  }
`;

const Heading = styled.h2`
  font-size: 1.7rem;
`;

const Content = styled.main`
  padding: 15px 10px;

  @media ${devices.mobileM} {
    padding: 15px 15px;
  }

  @media ${devices.mobileL} {
    padding: 15px 20px;
  }
`;

const FixedExpenses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getExpensesSize } = useFirestore();
  const [expensesLength, setExpensesLength] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    const expensesRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('expenses');
    const unsubscribe = expensesRef.onSnapshot((snapshot) => {
      getExpensesSize().then((size) => setExpensesLength(size));
      const tmp = [];
      snapshot.forEach((doc) => tmp.push(doc.data()));
      setExpenses(tmp);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (expenses.length === expensesLength) setIsLoading(false);
  }, [expenses, expensesLength]);

  if (isLoading)
    return (
      <Container>
        <LoadingScreen />
      </Container>
    );
  else
    return (
      <Container>
        <Header>
          <Heading>Fixed expenses</Heading>
        </Header>
        <Content>
          {expenses.length === 0 && (
            <NoExpenses text={'Currently You have no expenses'} />
          )}
          <Expenses>
            {expenses.map((expenseVal) => (
              <Expense key={expenseVal.id} {...expenseVal} />
            ))}
          </Expenses>
        </Content>
      </Container>
    );
};

export default FixedExpenses;
