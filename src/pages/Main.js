import styled from 'styled-components';
import Card from '../components/Card';
import TotalWrapper from '../components/TotalWrapper';
import TransactionsWrapper from '../components/TransactionsWrapper';
import React, { useEffect, useState } from 'react';
import { devices } from '../assets/styles/devices';
import { useFirestore } from '../hooks/useFirestore';
import { useLoading } from '../hooks/useLoading';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

const Container = styled.main`
  background-color: ${({ theme }) => theme.color.lightPrimary};
  flex: 1;
  font-size: 1rem;
  padding: 5px 10px 0;
  overflow: auto;
  display: flex;
  flex-direction: column;

  @media ${devices.mobileM} {
    padding: 10px 15px 10vh;
  }

  @media ${devices.mobileL} {
    padding: 15px 20px 10vh;
  }

  @media ${devices.laptop} {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const StyledCard = styled(Card)`
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  border-radius: 15px;
  padding: 10px;
  margin: 10px 0;

  @media ${devices.mobileM} {
    padding: 10px 15px;
  }

  @media ${devices.tablet} {
    flex: ${({ stretch }) => (stretch ? '1' : '0 1 auto')};
    width: ${({ width }) => (width ? width : 'auto')};
    &:first-child {
      margin-right: 15px;
    }
  }

  @media ${devices.laptop} {
    flex: ${({ stretch }) => (stretch ? '1' : '0 1 auto')};
    width: ${({ width }) => (width ? width : 'auto')};
    &:first-child {
      margin-right: 15px;
    }
  }
`;

const Main = () => {
  const [total, setTotal] = useState(null);
  const [transactions, setTransactions] = useState([]);
  // const [expenses, setExpenses] = useState([]);
  const { setIsLoading } = useLoading();
  const {
    checkIsUserConfigured,
    getUserData,
    /*getExpenses,*/
    isConfigured,
    executePayday,
  } = useFirestore();
  const { currentUser } = useAuth();

  const fillUser = async () => {
    const data = await getUserData();
    setTotal(data);
    setIsLoading(false);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const currentDay = String(today.getDate()).padStart(2, '0');
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
    const currentYear = String(today.getFullYear());
    return { currentDay, currentMonth, currentYear };
  };

  // const handleExpense = ({ amount, months, isSpent, dayOfCollection }) => {
  //   const expenseDay = String(dayOfCollection);
  //   const cleanMonths = tmp.filter((element) => element !== undefined);
  //   // not finished
  // };

  // const checkExpenses = async () => {
  //   const respExpenses = await getExpenses();
  //   respExpenses.forEach((expense) => handleExpense(expense));
  // };

  const initPayday = async () => {
    const { lastPayday, earnings, moneyLeft, payday } = await getUserData();
    const { currentDay, currentMonth, currentYear } = getCurrentDate();
    const todaysPayment = `${currentMonth}-${currentYear}`;
    if (currentDay >= payday && lastPayday !== todaysPayment) {
      executePayday(moneyLeft + earnings, todaysPayment);
    }
  };

  useEffect(() => {
    const transactionsRef = db
      .collection('users')
      .doc(currentUser.uid)
      .collection('transactions');
    const unsubscribe = transactionsRef.onSnapshot((snapshot) => {
      const tmp = [];
      if (snapshot.size) {
        snapshot.forEach((doc) => tmp.push(doc.data()));
        tmp.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(tmp);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const userRef = db.collection('users').doc(currentUser.uid);
    const unsubscribe = userRef.onSnapshot((doc) => setTotal(doc.data()));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    checkIsUserConfigured();
  }, []);

  useEffect(() => {
    if (isConfigured) fillUser();
  }, [isConfigured]);

  useEffect(() => {
    initPayday();
  }, []);

  // useEffect(() => {
  //   checkExpenses();
  // }, []);

  return (
    <Container>
      <StyledCard title="MONEY LEFT">
        <TotalWrapper transactions={transactions} {...total} />
      </StyledCard>
      <StyledCard width={'600px'} title="TRANSACTIONS">
        <TransactionsWrapper total={total} transactions={transactions} />
      </StyledCard>
    </Container>
  );
};

export default Main;
