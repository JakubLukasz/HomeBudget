import styled from "styled-components";
import Transaction from "./Transaction";

const Container = styled.div`
  min-height: 50px;
`;

const TransactionsWrapper = ({ transactions }) => {
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
