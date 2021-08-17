import styled from "styled-components";
import Transaction from "./Transaction";

const Container = styled.div`
  min-height: 50px;
`;

const TransactionsWrapper = ({ transactions, total }) => {
  return (
    <Container>
      {transactions.map((transactionInfo) => (
        <Transaction
          {...total}
          key={`${transactionInfo.title} ${transactionInfo.date}`}
          {...transactionInfo}
        />
      ))}
    </Container>
  );
};

export default TransactionsWrapper;
