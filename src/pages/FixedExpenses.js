import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { devices } from '../assets/styles/devices';
import Expense from '../components/Expense';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from '../components/LoadingScreen';
import { useFirestore } from '../hooks/useFirestore';
import NoData from '../components/NoData';
import SectionHeader from '../components/SectionHeader';
import { Grid, useMediaQuery } from '@mui/material';
import { getGridMediaQuery } from '../hooks/useMuiMediaQuery';

const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.color.lightPrimary};
  flex: 1;
  overflow: auto;
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
  const tablet = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const gridMediaQuery = getGridMediaQuery();
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
        <SectionHeader title="Fixed expenses" />
        <Content>
          {expenses.length === 0 && (
            <NoData text="Currently You have no expenses" expense />
          )}
          <Grid container columnSpacing={tablet ? 2 : 0} rowSpacing={2}>
            {expenses.map((expenseVal) => (
              <Grid item key={expenseVal.id} xs={gridMediaQuery}>
                <Expense {...expenseVal} />
              </Grid>
            ))}
          </Grid>
        </Content>
      </Container>
    );
};

export default FixedExpenses;
