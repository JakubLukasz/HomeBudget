import styled from 'styled-components';
import TotalWrapper from '@Components/organisms/TotalWrapper';
import TransactionsWrapper from '@Components/organisms/TransactionsWrapper';
import React, { useEffect, useState } from 'react';
import { devices } from '@Assets/styles/devices';
import { useFirestore } from '@Hooks/useFirestore';
import { db } from '@Services/firebase';
import { useAuth } from '@Hooks/useAuth';
import LoadingScreen from '@Components/organisms/LoadingScreen';
import PageHeader from '@Components/organisms/PageHeader';
import Card from '@Components/atoms/Card';
import { Grid } from '@mui/material';

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.lightPrimary};
  position: relative;
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

const Main = () => {
  const [total, setTotal] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionsLength, setTransactionsLength] = useState(null);
  const {
    getTransactionsSize,
    getExpenses,
    checkPayday,
    checkExpense,
    checkIsUserConfigured,
  } = useFirestore();
  const { currentUser } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    const transactionsRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('transactions');
    const unsubscribe = transactionsRef.onSnapshot((snapshot) => {
      const tmp = [];
      getTransactionsSize().then((size) => setTransactionsLength(size));
      snapshot.forEach((doc) => tmp.push(doc.data()));
      tmp.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(tmp);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const userRef = db.collection('users').doc(currentUser.uid);
    const unsubscribe = userRef.onSnapshot((doc) => setTotal(doc.data()));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (transactionsLength === transactions.length) setIsLoading(false);
  }, [transactionsLength, transactions]);

  useEffect(() => {
    checkPayday();
    getExpenses().then((resp) =>
      resp.forEach((expense) => checkExpense(expense))
    );
    checkIsUserConfigured();
  }, []);

  if (isLoading)
    return (
      <Container>
        <LoadingScreen />
      </Container>
    );
  else
    return (
      <Container>
        <PageHeader title="Dashboard" />
        <Content>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card title="TOTAL">
                <TotalWrapper transactions={transactions} {...total} />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Card title="TRANSACTIONS">
                <TransactionsWrapper
                  total={total}
                  transactions={transactions}
                />
              </Card>
            </Grid>
          </Grid>
        </Content>
      </Container>
    );
};

export default Main;
