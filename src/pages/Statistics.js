import styled from 'styled-components';
import Card from '../components/Card';
import React, { useEffect, useState } from 'react';
import { devices } from '../assets/styles/devices';
import { Doughnut } from 'react-chartjs-2';
import { useFirestore } from '../hooks/useFirestore';
import { currentDate } from '../helpers/currentDate';
import NoTransactions from '../components/NoTransactions';

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.lightPrimary};
  flex: 1;
  overflow: auto;
`;

const Header = styled.header`
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px -10px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media ${devices.laptop} {
    display: none;
  }
`;

const Heading = styled.h2`
  font-size: 1.7rem;
`;

const Content = styled.main`
  padding: 15px 10px 0;

  @media ${devices.mobileM} {
    padding: 15px 15px 0;
  }

  @media ${devices.mobileL} {
    padding: 15px 20px 0;
  }
`;

const GraphCard = styled(Card)`
  @media ${devices.tablet} {
    width: 49%;
    margin: 0 2% 2% 0;

    &:first-child {
      margin: 0 2% 2% 0;
    }

    &:nth-child(2n) {
      margin: 0 0 2% 0;
    }
  }

  @media ${devices.laptop} {
    width: 32%;
    margin: 0 2% 2% 0;

    &:first-child {
      margin: 0 2% 2% 0;
    }

    &:nth-child(2n) {
      margin: 0 2% 2% 0;
    }

    &:nth-child(3n) {
      margin: 0 0 2% 0;
    }
  }

  @media ${devices.desktop} {
    width: 19%;
    margin: 0 1.25% 1.25% 0;

    &:first-child {
      margin: 0 1.25% 1.25% 0;
    }

    &:nth-child(2n) {
      margin: 0 1.25% 1.25% 0;
    }

    &:nth-child(3n) {
      margin: 0 1.25% 1.25% 0;
    }

    &:nth-child(5n) {
      margin: 0 0 1.25% 0;
    }
  }
`;

const DoughnutGraph = styled(Doughnut)`
  padding: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media ${devices.tablet} {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const Statistics = () => {
  const { getTransactions } = useFirestore();
  const [transactions, setTransactions] = useState([]);
  const [spentTransactions, setSpentTransactions] = useState([]);
  const [earnedTransactions, setEarnedTransactions] = useState([]);
  const [spentMonthTransactions, setSpentMonthTransactions] = useState([]);
  const [earnedMonthTransactions, setEarnedMonthTransactions] = useState([]);
  const [earnedCategoryData, setEarnedCategoryData] = useState(null);
  const [spentCategoryData, setSpentCategoryData] = useState(null);
  const [spentMonthCategoryData, setSpentMonthCategoryData] = useState(null);
  const [earnedMonthCategoryData, setEarnedMonthCategoryData] = useState(null);

  const generateRandomColor = () => {
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const createDoughnut = (labels, data) => {
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    };
  };

  const colors = [
    '#011627',
    '#2a3f63',
    '#58A9CC',
    '#e87a13',
    '#66e028',
    '#b71cd6',
    '#5c47e6',
    '#e0e332',
    '#e32f29',
    '#21de6a',
  ].concat(generateRandomColor);

  const groupArrayByCategory = (rawArray) => {
    const array = [];
    rawArray.forEach(({ categoryTitle, amount }) =>
      array.push({ categoryTitle, amount })
    );
    const result = [];
    array.reduce((res, value) => {
      if (!res[value.categoryTitle]) {
        res[value.categoryTitle] = {
          categoryTitle: value.categoryTitle,
          amount: 0,
        };
        result.push(res[value.categoryTitle]);
      }
      res[value.categoryTitle].amount += value.amount;
      return res;
    }, {});

    return result;
  };

  const setupDoughnut = (dataArray, func) => {
    const labels = dataArray.map(({ categoryTitle }) => categoryTitle);
    const data = dataArray.map(({ amount }) => amount);
    func(createDoughnut(labels, data));
  };

  const setupMonthStatistics = (spentData, earnedData) => {
    const { currentMonth } = currentDate();
    const spentMonthData = spentData.filter(
      ({ date }) => date.split('.')[1] === currentMonth
    );
    setSpentMonthTransactions(spentMonthData);
    const earnedMonthData = earnedData.filter(
      ({ date }) => date.split('.')[1] === currentMonth
    );
    setEarnedMonthTransactions(earnedMonthData);
    const spentMonthArray = groupArrayByCategory(spentMonthData);
    const earnedMonthArray = groupArrayByCategory(earnedMonthData);
    return { spentMonthArray, earnedMonthArray };
  };

  const handleTransactions = (transactions) => {
    setTransactions(transactions);
    const spentTransactionsData = transactions.filter(({ isSpent }) => isSpent);
    setSpentTransactions(spentTransactionsData);
    const earnedTransactionsData = transactions.filter(
      ({ isSpent }) => !isSpent
    );
    setEarnedTransactions(earnedTransactionsData);
    const spentCategoryArray = groupArrayByCategory(spentTransactionsData);
    const earnedCategoryArray = groupArrayByCategory(earnedTransactionsData);
    const { spentMonthArray, earnedMonthArray } = setupMonthStatistics(
      spentTransactionsData,
      earnedTransactionsData
    );
    setupDoughnut(spentCategoryArray, setSpentCategoryData);
    setupDoughnut(earnedCategoryArray, setEarnedCategoryData);
    setupDoughnut(spentMonthArray, setSpentMonthCategoryData);
    setupDoughnut(earnedMonthArray, setEarnedMonthCategoryData);
  };

  useEffect(() => {
    getTransactions().then((transactions) => handleTransactions(transactions));
  }, []);

  return (
    <Container>
      <Header>
        <Heading>Statistics</Heading>
      </Header>
      <Content>
        {transactions.length === 0 && (
          <NoTransactions
            text={
              'To display the stats you need to add either an account orexpense'
            }
          />
        )}
        <CardContainer>
          {spentTransactions.length !== 0 && (
            <GraphCard title="SPENT GRAPH (ALL TIME)">
              <DoughnutGraph data={spentCategoryData} />
            </GraphCard>
          )}
          {earnedTransactions.length !== 0 && (
            <GraphCard title="EARNED GRAPH (ALL TIME)">
              <DoughnutGraph data={earnedCategoryData} />
            </GraphCard>
          )}
          {spentMonthTransactions.length !== 0 && (
            <GraphCard title="SPENT GRAPH (THIS MONTH)">
              <DoughnutGraph data={spentMonthCategoryData} />
            </GraphCard>
          )}
          {earnedMonthTransactions.length !== 0 && (
            <GraphCard title="EARNED GRAPH (THIS MONTH)">
              <DoughnutGraph data={earnedMonthCategoryData} />
            </GraphCard>
          )}
        </CardContainer>
      </Content>
    </Container>
  );
};

export default Statistics;
