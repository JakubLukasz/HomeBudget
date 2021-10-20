import styled from 'styled-components';
import Card from '../components/Card';
import React, { useEffect } from 'react';
import { devices } from '../assets/styles/devices';
import { Doughnut } from 'react-chartjs-2';
import NoData from '../components/NoData';
import SectionHeader from '../components/SectionHeader';
import { Grid, useMediaQuery } from '@mui/material';
import { getGridMediaQuery } from '../hooks/useMuiMediaQuery';
import { useGraph } from '../hooks/useGraph';

const Container = styled.div`
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

const DoughnutGraph = styled(Doughnut)`
  padding: 20px;
`;

const Statistics = () => {
  const tablet = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const gridMediaQuery = getGridMediaQuery();
  const {
    initGraph,
    transactions,
    spentTransactions,
    earnedTransactions,
    spentMonthTransactions,
    earnedMonthTransactions,
    earnedCategoryData,
    spentCategoryData,
    spentMonthCategoryData,
    earnedMonthCategoryData,
  } = useGraph();

  useEffect(() => {
    initGraph();
  }, []);

  return (
    <Container>
      <SectionHeader title="Statistics" />
      <Content>
        {transactions.length === 0 && (
          <NoData text="To display the stats you need to add either an account orexpense" />
        )}
        <Grid container columnSpacing={tablet ? 2 : 0} rowSpacing={2}>
          {spentTransactions.length !== 0 && (
            <Grid item xs={gridMediaQuery}>
              <Card title="SPENT GRAPH (ALL TIME)">
                <DoughnutGraph data={spentCategoryData} />
              </Card>
            </Grid>
          )}
          {earnedTransactions.length !== 0 && (
            <Grid item xs={gridMediaQuery}>
              <Card title="EARNED GRAPH (ALL TIME)">
                <DoughnutGraph data={earnedCategoryData} />
              </Card>
            </Grid>
          )}
          {spentMonthTransactions.length !== 0 && (
            <Grid item xs={gridMediaQuery}>
              <Card title="SPENT GRAPH (THIS MONTH)">
                <DoughnutGraph data={spentMonthCategoryData} />
              </Card>
            </Grid>
          )}
          {earnedMonthTransactions.length !== 0 && (
            <Grid item xs={gridMediaQuery}>
              <Card title="EARNED GRAPH (THIS MONTH)">
                <DoughnutGraph data={earnedMonthCategoryData} />
              </Card>
            </Grid>
          )}
        </Grid>
      </Content>
    </Container>
  );
};

export default Statistics;
