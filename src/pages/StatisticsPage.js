import React, { useEffect, useState } from 'react';
import { styled } from '@mui/styles';

import { Grid } from '@mui/material';

import Graph from '@Components/atoms/Graph';
import NoData from '@Components/molecules/NoData';
import PageHeader from '@Components/atoms/PageHeader';

import { currentDate } from '@Helpers/currentDate';
import { useFirestore } from '@Hooks/useFirestore';

const Container = styled('div')({
  backgroundColor: '#F0F5F7',
  flex: 1,
  overflow: 'auto',
})

const Content = styled('div')({
  padding: '5px',

  '@media screen and (min-width:768px)': {
    padding: '10px',
  }
})

const StatisticsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [graphs, setGraphs] = useState(null);

  const { currentMonth } = currentDate();
  const { getCollectionData } = useFirestore();

  const generateRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

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

  const getMonthTransactions = array => array.filter(({ date }) => (date.split('-')[1] == currentMonth))

  const reduceArrayElements = array => array.map(({ category, amount }) => ({ category, amount }))

  const doughnutRecipe = (labels, data) => ({
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        hoverOffset: 4,
      },
    ],
  })

  // grouping all values with the same category
  const groupArrayByCategory = (array) => {
    const arr = reduceArrayElements(array);
    const result = [];
    arr.reduce((res, value) => {
      if (!res[value.category]) {
        res[value.category] = {
          category: value.category,
          amount: 0,
        };
        result.push(res[value.category]);
      }
      res[value.category].amount += value.amount;
      return res;
    }, {});

    return result;
  };

  const handleCreateGraph = (graphData) => {
    const labels = graphData.map(({ category }) => category);
    const data = graphData.map(({ amount }) => amount);
    return doughnutRecipe(labels, data);
  }

  useEffect(() => {
    const initGraphs = async () => {
      const transactions = await getCollectionData('transactions');
      setTransactions(transactions);
    };

    initGraphs();
  }, []);

  useEffect(() => {
    if (transactions.length === 0) return;
    const spentArray = transactions.filter(({ isSpent }) => isSpent);
    const earnedArray = transactions.filter(({ isSpent }) => !isSpent);
    const spentMonthlyArray = getMonthTransactions(spentArray);
    const earnedMonthlyArray = getMonthTransactions(earnedArray);

    const graphArrays = [spentArray, earnedArray, spentMonthlyArray, earnedMonthlyArray];

    const graphTitles = [
      'SPENT GRAPH (ALL TIME)',
      'EARNED GRAPH (ALL TIME)',
      'SPENT GRAPH (THIS MONTH)',
      'EARNED GRAPH (THIS MONTH)'
    ]

    const groupedGraphArrays = graphArrays.map((arr) => groupArrayByCategory(arr));
    const createdGraphs = groupedGraphArrays.map((arr) => handleCreateGraph(arr));
    const graphsWithTitles = createdGraphs.map((data, index) => ({ title: graphTitles[index], data }))

    setGraphs(graphsWithTitles);
  }, [transactions])

  return (
    <Container>
      <PageHeader title="Statistics" />
      <Content>
        {transactions.length === 0 ?
          <NoData text="To display the stats you need to add either an account orexpense" icon="Transaction" /> : <Grid container>
            {graphs && graphs.map(
              ({ title, data }) => data.datasets[0].data.length !== 0 &&
                (<Grid xs={12} sm={6} md={4} lg={3} item key={title}>
                  <Graph title={title} data={data} />
                </Grid>)
            )}
          </Grid>}
      </Content>
    </Container>
  );
};

export default StatisticsPage;
