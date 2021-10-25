import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { devices } from '../assets/styles/devices';
import Expense from '../components/molecules/Expense';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from '../components/organisms/LoadingScreen';
import { useFirestore } from '../hooks/useFirestore';
import NoData from '../components/molecules/NoData';
import PageHeader from '../components/organisms/PageHeader';
import { Grid } from '@mui/material';
import Card from '../components/atoms/Card';

const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.color.lightPrimary};
  flex: 1;
  overflow: auto;
`;

const Content = styled.main`
  padding: 5px;

  @media ${devices.tablet} {
    padding: 10px;
  }
`;

const GridCard = styled(Card)`
  margin: 0.5rem;
  height: calc(100% - 1rem);
`;

const Expenses = () => {
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
        <PageHeader title="Fixed Expenses" />
        <Content>
          {expenses.length === 0 && (
            <NoData text="Currently You have no expenses" expense />
          )}
          <Grid container>
            {expenses.map((expenseVal) => (
              <Grid item key={expenseVal.id} xs={12} sm={6} md={4} lg={3}>
                <GridCard>
                  <Expense {...expenseVal} />
                </GridCard>
              </Grid>
            ))}
          </Grid>
        </Content>
      </Container>
    );
};

export default Expenses;
