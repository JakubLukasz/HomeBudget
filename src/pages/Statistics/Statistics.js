import styled from "styled-components";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import { devices } from "../../assets/devices";
import Graph from "./Graph";
import { useFirestore } from "../../contexts/FirestoreContext";
import { useGraph } from "../../contexts/GraphContext";

const Container = styled.main`
  background-color: ${({ theme }) => theme.color.lightPrimary};
  min-height: 100vh;
  font-size: 1rem;
  padding: 10px 20px 10vh;
  display: flex;
  flex-direction: column;

  @media ${devices.tabletVerL} {
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: space-between;
  }

  @media ${devices.laptop} {
    margin-left: 80px;
    flex-direction: row;
    align-items: flex-start;
  }
`;

const StyledCard = styled(Card)`
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  border-radius: 15px;
  padding: 10px;
  margin: 10px;

  @media ${devices.mobileM} {
    padding: 10px 15px;
  }

  @media ${devices.tabletL} {
    width: 30%;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
  }

  @media ${devices.tabletVerL} {
    width: 49%;
    margin: 2% 0 0 0;

    &:nth-child(odd) {
      margin: 2% 1% 0 0;
    }
  }

  @media ${devices.laptopL} {
    width: 20%;
  }
`;

const Statistics = () => {
  const { transactionsListener } = useFirestore();
  const { setTransactions, earnedDoughnutData, spendDoughnutData } = useGraph();

  useEffect(() => {
    const { unsubscribe, tmp } = transactionsListener();
    setTransactions(tmp);
    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <StyledCard title="SPENT GRAPH">
        {spendDoughnutData && <Graph data={spendDoughnutData} />}
      </StyledCard>
      <StyledCard title="EARNED GRAPH">
        {earnedDoughnutData && <Graph data={earnedDoughnutData} />}
      </StyledCard>
    </Container>
  );
};

export default Statistics;
