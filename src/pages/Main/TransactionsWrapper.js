import styled from "styled-components";
import { useEffect } from "react";
import Transaction from "./Transaction";
import { useFirestore } from "../../contexts/FirestoreContext";

const Container = styled.div`
  min-height: 50px;
`;

const TransactionsWrapper = () => {
  const { getTransactions, transactions } = useFirestore();

  useEffect(() => {
    const unsubscribe = getTransactions();
    return () => unsubscribe();
  }, []);

  return (
    <Container>
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
