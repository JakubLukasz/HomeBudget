import styled from 'styled-components';
import TotalWrapper from '../components/TotalWrapper';
import TransactionsWrapper from '../components/TransactionsWrapper';
import React, { useEffect, useState } from 'react';
import { devices } from '../assets/styles/devices';
import { useFirestore } from '../hooks/useFirestore';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from '../components/LoadingScreen';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.lightPrimary};
  position: relative;
  flex: 1;
  overflow: auto;
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  padding: 15px 10px;

  @media ${devices.mobileM} {
    padding: 15px 15px;
  }

  @media ${devices.mobileL} {
    padding: 15px 20px;
  }
  @media ${devices.laptop} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const TransactionCard = styled(Card)`
  @media ${devices.mobileM} {
    padding: 10px 15px;
  }

  @media ${devices.laptop} {
    flex: 3;
  }
`;

const TotalCard = styled(Card)`
  @media ${devices.mobileM} {
    padding: 10px 15px;
  }

  @media ${devices.laptop} {
    flex: 1;
    margin-right: 15px;
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
        <SectionHeader title="Dashboard" />
        <Content>
          <TotalCard title="TOTAL">
            <TotalWrapper transactions={transactions} {...total} />
          </TotalCard>
          <TransactionCard title="TRANSACTIONS">
            <TransactionsWrapper total={total} transactions={transactions} />
          </TransactionCard>
        </Content>
      </Container>
    );
};

export default Main;
