import styled from "styled-components";
import Card from "../../components/Card";
import TotalWrapper from "./TotalWrapper";
import TransactionsWrapper from "./TransactionsWrapper";
import { useEffect } from "react";
import { useFirestore } from "../../contexts/FirestoreContext";

const Container = styled.main`
  background-color: ${({ theme }) => theme.color.lightPrimary};
  min-height: 100vh;
  font-size: 1rem;
  margin-top: 10vh;
  padding: 0 20px;
`;

const Main = () => {
  const { checkIsUserConfigured } = useFirestore();
  useEffect(() => {
    checkIsUserConfigured();
  }, []);

  return (
    <Container>
      <Card title="TOTAL">
        <TotalWrapper />
      </Card>
      <Card title="TRANSACTIONS">
        <TransactionsWrapper />
      </Card>
    </Container>
  );
};

export default Main;
