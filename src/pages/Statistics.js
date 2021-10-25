import styled from 'styled-components';
import Card from '../components/atoms/Card';
import React, { useEffect } from 'react';
import { devices } from '../assets/styles/devices';
import { Doughnut } from 'react-chartjs-2';
import NoData from '../components/molecules/NoData';
import PageHeader from '../components/organisms/PageHeader';
import { useGraph } from '../hooks/useGraph';
import { Grid } from '@mui/material';

const Container = styled.div`
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

const DoughnutGraph = styled(Doughnut)`
  padding: 20px;
`;

const GridCard = styled(Card)`
  margin: 0.5rem;
`;

const Statistics = () => {
  const { initGraphs, graphs, transactions } = useGraph();

  useEffect(() => {
    initGraphs();
  }, []);

  return (
    <Container>
      <PageHeader title="Statistics" />
      <Content>
        {transactions.length === 0 && (
          <NoData text="To display the stats you need to add either an account orexpense" />
        )}
        <Grid container>
          {graphs.map(
            ({ title, data, dataLength }) =>
              dataLength > 0 && (
                <Grid xs={12} sm={6} md={4} lg={3} item key={title}>
                  <GridCard title={title}>
                    <DoughnutGraph data={data} />
                  </GridCard>
                </Grid>
              )
          )}
        </Grid>
      </Content>
    </Container>
  );
};

export default Statistics;
