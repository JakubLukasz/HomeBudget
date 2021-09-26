import styled from 'styled-components';
import Card from '../components/Card';
import React, { useEffect, useState } from 'react';
import { devices } from '../assets/styles/devices';
import { Doughnut } from 'react-chartjs-2';
import { useFirestore } from '../hooks/useFirestore';

const Container = styled.main`
  background-color: ${({ theme }) => theme.color.lightPrimary};
  font-size: 1rem;
  flex: 1;
  overflow: auto;
`;

const StyledCard = styled(Card)`
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  border-radius: 15px;
  padding: 10px;
`;

const DoughnutGraph = styled(Doughnut)`
  padding: 20px;
`;

const CardContainer = styled.div`
  margin: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  row-gap: 20px;

  @media ${devices.tablet} {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-columns: minmax(auto, 1fr);
    gap: 20px;
  }
`;

const Statistics = () => {
  const { getTransactions } = useFirestore();
  const [transactions, setTransactions] = useState([]);
  const [earnedCategoryData, setEarnedCategoryData] = useState(null);
  const [spentCategoryData, setSpentCategoryData] = useState(null);

  const generateRandomColor = () => {
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
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

  const loadTransactions = async () => {
    const docs = await getTransactions();
    setTransactions(docs);
  };

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

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    const spentTransactions = transactions.filter(({ isSpent }) => isSpent);
    const earnedTransactions = transactions.filter(({ isSpent }) => !isSpent);
    const spentCategoryObject = groupArrayByCategory(spentTransactions);
    const earnedCategoryObject = groupArrayByCategory(earnedTransactions);
    setSpentCategoryData({
      labels: spentCategoryObject.map(({ categoryTitle }) => categoryTitle),
      datasets: [
        {
          data: spentCategoryObject.map(({ amount }) => amount),
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    });
    setEarnedCategoryData({
      labels: earnedCategoryObject.map(({ categoryTitle }) => categoryTitle),
      datasets: [
        {
          data: earnedCategoryObject.map(({ amount }) => amount),
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    });
  }, [transactions]);

  return (
    <Container>
      <CardContainer>
        {spentCategoryData && (
          <StyledCard title="SPENT GRAPH">
            <DoughnutGraph data={spentCategoryData} />
          </StyledCard>
        )}
        {earnedCategoryData && (
          <StyledCard title="EARNED GRAPH">
            <DoughnutGraph data={earnedCategoryData} />
          </StyledCard>
        )}
        {earnedCategoryData && (
          <StyledCard title="EARNED GRAPH">
            <DoughnutGraph data={earnedCategoryData} />
          </StyledCard>
        )}
        {earnedCategoryData && (
          <StyledCard title="EARNED GRAPH">
            <DoughnutGraph data={earnedCategoryData} />
          </StyledCard>
        )}
        {earnedCategoryData && (
          <StyledCard title="EARNED GRAPH">
            <DoughnutGraph data={earnedCategoryData} />
          </StyledCard>
        )}
      </CardContainer>
    </Container>
  );
};

export default Statistics;
