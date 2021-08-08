import styled from "styled-components";
import { useEffect } from "react";
import Transaction from "./Transaction";
import { useFirestore } from "../../contexts/FirestoreContext";

const Container = styled.div`
  min-height: 350px;
`;

const EmptyMessage = styled.p`
  width: 100%;
  margin: auto auto;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
`;

const TransactionsWrapper = () => {
  const { getTransactions, transactions } = useFirestore();

  useEffect(() => {
    const unsubscribe = getTransactions();
    return () => unsubscribe();
  }, []);

  return (
    <Container>
      {!transactions.length && <EmptyMessage>Empty...</EmptyMessage>}
      {transactions.map((transactionInfo) => (
        <Transaction
          key={`${transactionInfo.title} ${transactionInfo.date}`}
          {...transactionInfo}
        />
      ))}
    </Container>
  );
};

export default TransactionsWrapper;
