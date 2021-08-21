import styled from "styled-components";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import { devices } from "../../assets/devices";
import { Doughnut } from "react-chartjs-2";
import { useFirestore } from "../../contexts/FirestoreContext";

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

const DoughnutGraph = styled(Doughnut)`
  padding: 20px;
`;

const Statistics = () => {
  const { getTransactions } = useFirestore();
  const [transactions, setTransactions] = useState([]);
  const [earnedData, setEarnedData] = useState();
  const [spentData, setSpentData] = useState();

  const generateRandomColor = () => {
    let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const colors = [
    "#58A9CC",
    "#e87a13",
    "#66e028",
    "#b71cd6",
    "#5c47e6",
    "#e0e332",
    "#e32f29",
    "#21de6a",
  ].concat(generateRandomColor);

  const cos = async () => {
    const docs = await getTransactions();
    let tmp = [];
    docs.forEach((doc) => {
      tmp.push(doc.data());
    });
    setTransactions(tmp);
  };

  useEffect(() => {
    let earnedTransactions = transactions.filter(
      ({ isSpent }) => isSpent !== true
    );
    let spentTransactions = transactions.filter(
      ({ isSpent }) => isSpent === true
    );
    let spentLabels = spentTransactions.map((data) => data.title);
    let earnedLabels = earnedTransactions.map((data) => data.title);
    let spentDataset = spentTransactions.map((data) => data.amount);
    let earnedDataset = earnedTransactions.map((data) => data.amount);
    setEarnedData({
      labels: earnedLabels,
      datasets: [
        {
          data: earnedDataset,
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    });
    setSpentData({
      labels: spentLabels,
      datasets: [
        {
          data: spentDataset,
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    });
  }, [transactions]);

  useEffect(() => {
    cos();
  }, []);

  return (
    <Container>
      <StyledCard title="SPENT GRAPH">
        {spentData && <DoughnutGraph data={spentData} />}
      </StyledCard>
      <StyledCard title="EARNED GRAPH">
        {earnedData && <DoughnutGraph data={earnedData} />}
      </StyledCard>
    </Container>
  );
};

export default Statistics;
